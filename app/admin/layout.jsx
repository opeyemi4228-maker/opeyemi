// Everything under /admin: private, never indexed, never cached.

export const metadata = {
  title: { default: "Dashboard", template: "%s · Dashboard" },
  robots: { index: false, follow: false, nocache: true },
};

export const viewport = { themeColor: "#000000" };

export default function AdminRootLayout({ children }) {
  return children;
}
