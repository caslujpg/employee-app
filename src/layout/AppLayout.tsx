import { useState, ReactNode, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { LogOut, Users, UserPlus, Menu, X, Building2 } from "lucide-react";
import { Logo } from "@/components/ui/logo";

interface AppLayoutProps {
  children: ReactNode;
  currentPage: "list" | "create" | "details";
  onNavigate: (page: "list" | "create") => void;
  onLogout: () => void;
}

function LogoutButton({
  className,
  onLogout,
}: {
  className?: string;
  onLogout: () => void;
}) {
  return (
    <Button
      variant="ghost"
      size="sm"
      className={`text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 ${className}`}
      onClick={onLogout}
    >
      <LogOut className="h-4 w-4" />
      Sair
    </Button>
  );
}

export function AppLayout({
  children,
  currentPage,
  onNavigate,
  onLogout,
}: AppLayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  function navigate(page: "list" | "create") {
    onNavigate(page);
    setMenuOpen(false);
  }

  function handleLogout() {
    onLogout();
    setMenuOpen(false);
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b shadow-sm sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Logo />
            <span className="font-bold text-foreground text-sm sm:text-base">
              Quadro
            </span>
          </div>

          <nav className="hidden sm:flex items-center gap-2">
            <Button
              variant={currentPage === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => navigate("list")}
            >
              <Users className="h-4 w-4" />
              Funcionários
            </Button>
            <Button
              variant={currentPage === "create" ? "default" : "ghost"}
              size="sm"
              onClick={() => navigate("create")}
            >
              <UserPlus className="h-4 w-4" />
              Cadastrar
            </Button>
            <LogoutButton onLogout={handleLogout} />
          </nav>

          <Button
            variant="ghost"
            size="icon"
            className="sm:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
          >
            {menuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </header>

      <div
        className={`
          fixed inset-0 z-30 bg-black/40 backdrop-blur-sm transition-opacity duration-300 sm:hidden
          ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
        onClick={() => setMenuOpen(false)}
      />

      <aside
        className={`
          fixed top-0 right-0 z-40 h-full w-64 bg-card shadow-2xl flex flex-col
          transition-transform duration-300 ease-in-out sm:hidden
          ${menuOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="flex items-center justify-between px-5 h-14 border-b">
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-primary" />
            <span className="font-bold text-sm text-foreground">Menu</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMenuOpen(false)}
            aria-label="Fechar menu"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <nav className="flex flex-col gap-1 p-4 flex-1">
          <Button
            variant={currentPage === "list" ? "default" : "ghost"}
            className="w-full justify-start gap-3"
            onClick={() => navigate("list")}
          >
            <Users className="h-4 w-4" />
            Funcionários
          </Button>
          <Button
            variant={currentPage === "create" ? "default" : "ghost"}
            className="w-full justify-start gap-3"
            onClick={() => navigate("create")}
          >
            <UserPlus className="h-4 w-4" />
            Cadastrar
          </Button>
        </nav>

        <div className="p-4 border-t">
          <LogoutButton
            onLogout={handleLogout}
            className="w-full justify-start gap-3"
          />
        </div>
      </aside>

      <main className="max-w-5xl mx-auto px-4 py-6">{children}</main>
    </div>
  );
}