import type { ReactNode } from "react";

export default function AdsStudioLayout({ children }: { children: ReactNode }) {
  return <div className="dark h-screen flex flex-col bg-surface-primary">{children}</div>;
}
