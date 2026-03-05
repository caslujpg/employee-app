import { CardContent } from "@/components/ui/card";
import { useLoginForm } from "@/features/auth/hooks/useLoginForm";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { Logo } from "@/components/ui/logo";
import { Hero } from "../components/Hero";

interface LoginPageProps {
  onLogin: (email: string, password: string) => boolean;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const { form, error, onSubmit } = useLoginForm(onLogin);

  return (
    <div className="min-h-screen flex">
      <Hero />

      <div className="w-full lg:w-1/2 flex items-center justify-center bg-background min-h-screen px-6">
        <div className="w-full max-w-sm space-y-6">
          <div className="flex lg:hidden items-center justify-center gap-2 mb-2">
            <Logo className="w-8 h-8" />
            <span className="text-2xl font-bold">Quadro</span>
          </div>

          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">
              Bem-vindo de volta
            </h1>
            <p className="text-muted-foreground">
              Entre com sua conta para continuar
            </p>
          </div>

          <CardContent className="p-0">
            <LoginForm form={form} error={error} onSubmit={onSubmit} />
          </CardContent>

          <div className="flex flex-col items-center gap-2">
            <p className="text-center text-sm text-muted-foreground">
              Problemas para acessar?{" "}
              <a
                href="https://wa.me/5527997925255"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-medium hover:underline"
              >
                Fale com o suporte
              </a>
            </p>

            <span className="text-xs text-muted-foreground/50">
              Desenvolvido por{" "}
              <a
                href="https://github.com/caslujpg"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/80 hover:text-muted-foreground/80 transition-colors"
              >
                Caslu Software
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
