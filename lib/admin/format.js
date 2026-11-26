// Display helpers for the dashboard. Times are shown in Abuja time
// (West Africa Time), where the site's owner reads them.

export const ADMIN_TIME_ZONE = "Africa/Lagos";

export function formatDateTime(date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: ADMIN_TIME_ZONE,
  }).format(new Date(date));
}

export function formatDay(date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: ADMIN_TIME_ZONE,
  }).format(new Date(date));
}

/** "just now", "5 min ago", "3 h ago", "yesterday", "4 days ago", then the date. */
export function timeAgo(date, now = Date.now()) {
  const seconds = Math.round((now - new Date(date).getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} h ago`;
  const days = Math.round(hours / 24);
  if (days === 1) return "yesterday";
  if (days < 7) return `${days} days ago`;
  return formatDay(date);
}

/** Percentage change, or null when there is no baseline to compare to. */
export function change(current, previous) {
  if (!previous) return null;
  return Math.round(((current - previous) / previous) * 100);
}

/** A readable device name from a user-agent string. */
export function describeDevice(ua) {
  if (!ua) return "Unknown device";
  const browser =
    /Edg\//.test(ua) ? "Edge"
    : /OPR\//.test(ua) ? "Opera"
    : /Chrome\//.test(ua) ? "Chrome"
    : /Firefox\//.test(ua) ? "Firefox"
    : /Safari\//.test(ua) ? "Safari"
    : "Browser";
  const os =
    /iPhone|iPad/.test(ua) ? "iOS"
    : /Android/.test(ua) ? "Android"
    : /Mac OS X/.test(ua) ? "macOS"
    : /Windows/.test(ua) ? "Windows"
    : /Linux/.test(ua) ? "Linux"
    : "";
  return os ? `${browser} on ${os}` : browser;
}
