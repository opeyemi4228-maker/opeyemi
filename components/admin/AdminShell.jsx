"use client";

// Dashboard frame: a fixed ink sidebar on large screens; on phones and
// tablets a top bar whose menu button opens the same navigation as a drawer.

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ExternalLink, Inbox, LayoutDashboard, LogOut, Mail, Menu, ShieldCheck, X } from "lucide-react";
import { signOut } from "@/app/admin/actions";
import { LogoMark } from "@/components/shared/Logo";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/admin/messages", label: "Messages", icon: Inbox, badge: "unread" },
  { href: "/admin/subscribers", label: "Subscribers", icon: Mail },
  { href: "/admin/account", label: "Account & security", icon: ShieldCheck },
];

export default function AdminShell({ admin, unread, children }) {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  // Close the drawer on navigation (adjusting state during render).
  const [lastPath, setLastPath] = React.useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="min-h-dvh bg-alabaster">
      {/* ---- Top bar (below lg) ---- */}
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-hairline bg-ink px-4 text-porcelain lg:hidden">
        <Brand />
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-controls="admin-nav"
          aria-label="Open navigation"
          className="relative grid h-11 w-11 place-items-center rounded-full hover:bg-porcelain/10"
        >
          <Menu aria-hidden="true" className="h-6 w-6" />
          {unread > 0 && <span aria-hidden="true" className="absolute right-2 top-2 h-2 w-2 rounded-full bg-gold" />}
        </button>
      </header>

      {/* ---- Drawer scrim (below lg) ---- */}
      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={cn(
          "fixed inset-0 z-40 bg-ink/50 transition-opacity lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      />

      {/* ---- Sidebar / drawer ---- */}
      <aside
        id="admin-nav"
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-ink text-porcelain transition-transform duration-300 lg:w-64 lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between px-5 lg:h-20">
          <Brand />
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close navigation"
            className="grid h-10 w-10 place-items-center rounded-full hover:bg-porcelain/10 lg:hidden"
          >
            <X aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>

        <nav aria-label="Dashboard" className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-1">
            {NAV.map(({ href, label, icon: Icon, exact, badge }) => {
              const active = exact ? pathname === href : pathname.startsWith(href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium transition-colors",
                      active ? "bg-porcelain text-ink" : "text-porcelain/70 hover:bg-porcelain/10 hover:text-porcelain"
                    )}
                  >
                    <Icon aria-hidden="true" className="h-[18px] w-[18px] shrink-0" />
                    <span className="flex-1">{label}</span>
                    {badge === "unread" && unread > 0 && (
                      <span
                        className={cn(
                          "numeric rounded-full px-2 py-0.5 text-[11px] font-semibold",
                          active ? "bg-ink text-porcelain" : "bg-gold text-ink"
                        )}
                      >
                        {unread}
                        <span className="sr-only"> unread</span>
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-6 border-t border-porcelain/10 pt-6">
            <a
              href="/"
              target="_blank"
              rel="noopener"
              className="flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium text-porcelain/70 transition-colors hover:bg-porcelain/10 hover:text-porcelain"
            >
              <ExternalLink aria-hidden="true" className="h-[18px] w-[18px]" />
              View the website
            </a>
          </div>
        </nav>

        <div className="border-t border-porcelain/10 p-4">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gold text-sm font-semibold text-ink">
              {initials(admin.name)}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{admin.name}</p>
              <p className="truncate text-xs text-porcelain/55">{admin.email}</p>
            </div>
            <form action={signOut}>
              <button
                type="submit"
                aria-label="Sign out"
                title="Sign out"
                className="grid h-10 w-10 place-items-center rounded-full text-porcelain/70 hover:bg-porcelain/10 hover:text-porcelain"
              >
                <LogOut aria-hidden="true" className="h-[18px] w-[18px]" />
              </button>
            </form>
          </div>
        </div>
      </aside>

      <main id="main" className="lg:pl-64">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-10 lg:py-10">{children}</div>
      </main>
    </div>
  );
}

function Brand() {
  return (
    <Link href="/admin" className="flex items-center gap-3">
      <span style={{ "--logo-accent": "var(--color-gold)" }}>
        <LogoMark className="h-9 w-9" />
      </span>
      <span className="leading-tight">
        <span className="block font-display text-sm font-semibold uppercase tracking-[0.18em]">Opeyemi</span>
        <span className="block text-[11px] text-porcelain/55">Dashboard</span>
      </span>
    </Link>
  );
}

function initials(name = "") {
  return (
    name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0].toUpperCase())
      .join("") || "A"
  );
}
