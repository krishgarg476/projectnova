import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { GlobalModals } from "./GlobalModals";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#eaeded]">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <GlobalModals />
    </div>
  );
}
