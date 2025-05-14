import { useState } from "react";
import AuthDrawer from "../AuthDrawer/AuthDrawer";
import { Footer } from "../Footer/Footer";
import { Navbar } from "../Navbar/Navbar";

export function Layout({ children }: { children: React.ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [authView, setAuthView] = useState<"login" | "signup" | "reset">(
    "login"
  );

  return (
    <div className="relative flex flex-col min-h-screen">
      <Navbar onToggleLogin={() => setDrawerOpen((prev) => !prev)} />
      <main className="flex-1">{children}</main>
      <Footer />

      <AuthDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        view={authView}
        setView={setAuthView}
      />
    </div>
  );
}
