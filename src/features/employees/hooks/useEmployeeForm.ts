import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { validateCPF, formatCPF, formatCEP } from "@/lib/validations";
import { storage } from "@/lib/storage";
import { Employee } from "@/types";

export const employeeSchema = z.object({
  name: z.string().min(3, "Nome deve ter ao menos 3 caracteres"),
  cpf: z
    .string()
    .min(1, "CPF obrigatório")
    .refine((v) => validateCPF(v), "CPF inválido"),
  email: z.email("E-mail inválido"),
  role: z.string().min(2, "Cargo obrigatório"),
  cep: z
    .string()
    .min(9, "CEP inválido")
    .regex(/^\d{5}-\d{3}$/, "Formato: 00000-000"),
  street: z.string().min(1, "Rua obrigatória"),
  neighborhood: z.string().min(1, "Bairro obrigatório"),
  city: z.string().min(1, "Cidade obrigatória"),
  state: z.string().min(1, "Estado obrigatório"),
});

export type EmployeeFormData = z.infer<typeof employeeSchema>;

export function useEmployeeForm(
  onSave: (data: Omit<Employee, "id" | "createdAt">) => void
) {
  const [cepLoading, setCepLoading] = useState(false);

  const form = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      name: "",
      cpf: "",
      email: "",
      role: "",
      cep: "",
      street: "",
      neighborhood: "",
      city: "",
      state: "",
    },
  });

  async function fetchCEP(cep: string) {
    const cleaned = cep.replace(/\D/g, "");
    if (cleaned.length !== 8) return;

    setCepLoading(true);
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cleaned}/json/`);
      if (!res.ok) throw new Error();
      const data = await res.json();

      if (data.erro) {
        form.setError("cep", { message: "CEP não encontrado." });
        return;
      }

      form.clearErrors("cep");
      form.setValue("street", data.logradouro || "", { shouldValidate: true });
      form.setValue("neighborhood", data.bairro || "", {
        shouldValidate: true,
      });
      form.setValue("city", data.localidade || "", { shouldValidate: true });
      form.setValue("state", data.uf || "", { shouldValidate: true });
    } catch {
      form.setError("cep", {
        message: "Erro ao buscar CEP. Tente novamente.",
      });
    } finally {
      setCepLoading(false);
    }
  }

  function onSubmit(data: EmployeeFormData) {
    if (storage.isCPFTaken(data.cpf)) {
      form.setError("cpf", { message: "CPF já cadastrado." });
      return;
    }
    if (storage.isEmailTaken(data.email)) {
      form.setError("email", { message: "E-mail já cadastrado." });
      return;
    }

    onSave({
      name: data.name,
      cpf: data.cpf,
      email: data.email,
      role: data.role,
      address: {
        cep: data.cep,
        street: data.street,
        neighborhood: data.neighborhood,
        city: data.city,
        state: data.state,
      },
    });

    form.reset();
    toast.success("Funcionário cadastrado com sucesso!");
  }

  return { form, cepLoading, fetchCEP, onSubmit, formatCPF, formatCEP };
}