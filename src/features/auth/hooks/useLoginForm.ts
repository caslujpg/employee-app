import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("E-mail inválido"),
  password: z.string().min(1, "Senha obrigatória"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export function useLoginForm(
  onLogin: (email: string, password: string) => boolean
) {
  const [error, setError] = useState("");

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  function onSubmit(data: LoginFormData) {
    const ok = onLogin(data.email, data.password);
    if (!ok) setError("E-mail ou senha incorretos.");
    else setError("");
  }

  return { form, error, onSubmit };
}