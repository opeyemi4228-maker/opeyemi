// Read-side queries for the dashboard. Server only; every caller has already
// passed requireAdmin().

import "server-only";
import { db } from "@/lib/db";

export const PAGE_SIZE = 20;
const DAY = 86_400_000;

/** The last `days` UTC calendar days, oldest first, as "YYYY-MM-DD". */
function dayKeys(days) {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  return Array.from({ length: days }, (_, i) =>
    new Date(today.getTime() - (days - 1 - i) * DAY).toISOString().slice(0, 10)
  );
}

async function dailyCounts(table, days) {
  const keys = dayKeys(days);
  const since = new Date(`${keys[0]}T00:00:00Z`);
  // Table names cannot be parameters; both callers pass a constant.
  const rows =
    table === "Message"
      ? await db().$queryRaw`
          SELECT to_char(date_trunc('day', "createdAt" AT TIME ZONE 'UTC'), 'YYYY-MM-DD') AS day, COUNT(*)::int AS n
          FROM "Message" WHERE "createdAt" >= ${since} GROUP BY 1`
      : await db().$queryRaw`
          SELECT to_char(date_trunc('day', "createdAt" AT TIME ZONE 'UTC'), 'YYYY-MM-DD') AS day, COUNT(*)::int AS n
          FROM "Subscriber" WHERE "createdAt" >= ${since} GROUP BY 1`;
  const byDay = new Map(rows.map((r) => [r.day, Number(r.n)]));
  return keys.map((day) => ({ day, value: byDay.get(day) ?? 0 }));
}

export async function getOverview() {
  const since30 = new Date(Date.now() - 30 * DAY);
  const since60 = new Date(Date.now() - 60 * DAY);
  const m = db().message;
  const s = db().subscriber;

  const [
    newMessages,
    openMessages,
    totalMessages,
    messages30,
    messagesPrev30,
    activeSubscribers,
    subscribers30,
    subscribersPrev30,
    recent,
    topics,
    messageSeries,
    subscriberSeries,
  ] = await Promise.all([
    m.count({ where: { status: "NEW" } }),
    m.count({ where: { status: { in: ["NEW", "READ"] } } }),
    m.count(),
    m.count({ where: { createdAt: { gte: since30 } } }),
    m.count({ where: { createdAt: { gte: since60, lt: since30 } } }),
    s.count({ where: { status: "ACTIVE" } }),
    s.count({ where: { createdAt: { gte: since30 } } }),
    s.count({ where: { createdAt: { gte: since60, lt: since30 } } }),
    m.findMany({
      where: { status: { not: "ARCHIVED" } },
      orderBy: { createdAt: "desc" },
      take: 6,
      select: { id: true, name: true, email: true, topic: true, body: true, status: true, createdAt: true },
    }),
    m.groupBy({ by: ["topic"], _count: { _all: true }, orderBy: { _count: { topic: "desc" } } }),
    dailyCounts("Message", 30),
    dailyCounts("Subscriber", 30),
  ]);

  return {
    newMessages,
    openMessages,
    totalMessages,
    messages30,
    messagesPrev30,
    activeSubscribers,
    subscribers30,
    subscribersPrev30,
    recent,
    topics: topics.map((t) => ({ topic: t.topic, count: t._count._all })),
    messageSeries,
    subscriberSeries,
  };
}

export const MESSAGE_FILTERS = {
  inbox: { label: "Inbox", where: { status: { in: ["NEW", "READ"] } } },
  new: { label: "Unread", where: { status: "NEW" } },
  replied: { label: "Replied", where: { status: "REPLIED" } },
  archived: { label: "Archived", where: { status: "ARCHIVED" } },
  all: { label: "All", where: {} },
};

function searchWhere(q, fields) {
  if (!q) return {};
  return { OR: fields.map((f) => ({ [f]: { contains: q, mode: "insensitive" } })) };
}

export async function listMessages({ filter = "inbox", q = "", page = 1 }) {
  const base = MESSAGE_FILTERS[filter] ?? MESSAGE_FILTERS.inbox;
  const where = { ...base.where, ...searchWhere(q, ["name", "email", "body", "topic"]) };

  const [total, items, counts] = await Promise.all([
    db().message.count({ where }),
    db().message.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      select: { id: true, name: true, email: true, topic: true, body: true, status: true, createdAt: true },
    }),
    db().message.groupBy({ by: ["status"], _count: { _all: true } }),
  ]);

  const c = Object.fromEntries(counts.map((r) => [r.status, r._count._all]));
  const tabCounts = {
    inbox: (c.NEW ?? 0) + (c.READ ?? 0),
    new: c.NEW ?? 0,
    replied: c.REPLIED ?? 0,
    archived: c.ARCHIVED ?? 0,
    all: Object.values(c).reduce((a, b) => a + b, 0),
  };

  return { total, items, tabCounts, pages: Math.max(1, Math.ceil(total / PAGE_SIZE)) };
}

export function getMessage(id) {
  return db().message.findUnique({ where: { id } });
}

export const SUBSCRIBER_FILTERS = {
  active: { label: "Active", where: { status: "ACTIVE" } },
  unsubscribed: { label: "Unsubscribed", where: { status: "UNSUBSCRIBED" } },
  all: { label: "All", where: {} },
};

export async function listSubscribers({ filter = "active", q = "", page = 1 }) {
  const base = SUBSCRIBER_FILTERS[filter] ?? SUBSCRIBER_FILTERS.active;
  const where = { ...base.where, ...searchWhere(q, ["email"]) };

  const [total, items, counts] = await Promise.all([
    db().subscriber.count({ where }),
    db().subscriber.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    db().subscriber.groupBy({ by: ["status"], _count: { _all: true } }),
  ]);

  const c = Object.fromEntries(counts.map((r) => [r.status, r._count._all]));
  const tabCounts = {
    active: c.ACTIVE ?? 0,
    unsubscribed: c.UNSUBSCRIBED ?? 0,
    all: (c.ACTIVE ?? 0) + (c.UNSUBSCRIBED ?? 0),
  };

  return { total, items, tabCounts, pages: Math.max(1, Math.ceil(total / PAGE_SIZE)) };
}

export function listSessions(userId) {
  return db().adminSession.findMany({
    where: { userId, expiresAt: { gt: new Date() } },
    orderBy: { lastSeenAt: "desc" },
    select: { id: true, userAgent: true, createdAt: true, lastSeenAt: true },
  });
}

export function countAdmins() {
  return db().adminUser.count();
}
