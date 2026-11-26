// Small, dependency-free input helpers shared by the public forms and the
// dashboard. Everything from a form is untrusted until it passes through here.

export const TOPICS = ["Partnership", "Finance", "Speaking", "Press", "Other"];

// Deliberately permissive — the real test of an address is a reply reaching it.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function text(formData, key, max) {
  const value = formData.get(key);
  if (typeof value !== "string") return "";
  return value.replace(/\r\n/g, "\n").trim().slice(0, max);
}

export function normaliseEmail(value) {
  return String(value ?? "").trim().toLowerCase();
}

export function isEmail(value) {
  return value.length <= 254 && EMAIL_RE.test(value);
}

/** Keeps a same-site path ("/contact"), drops anything else. */
export function safePath(value) {
  const v = String(value ?? "");
  return v.startsWith("/") && !v.startsWith("//") ? v.slice(0, 200) : null;
}
