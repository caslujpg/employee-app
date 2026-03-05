import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { formatCPF, formatCEP } from "@/lib/validations";
import { EmployeeFormData } from "@/features/employees/hooks/useEmployeeForm";

function RequiredLabel({ children }: { children: React.ReactNode }) {
  return (
    <FormLabel className="text-sm font-medium">
      {children}
      <span className="text-red-500">*</span>
    </FormLabel>
  );
}

function FieldWrapper({ children }: { children: React.ReactNode }) {
  return <FormItem className="relative pb-5">{children}</FormItem>;
}

interface EmployeeFormProps {
  form: UseFormReturn<EmployeeFormData>;
  cepLoading: boolean;
  onSubmit: (data: EmployeeFormData) => void;
  onFetchCEP: (cep: string) => void;
}

export function EmployeeForm({
  form,
  cepLoading,
  onSubmit,
  onFetchCEP,
}: EmployeeFormProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
            Dados Pessoais
          </p>
          <div className="space-y-1">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FieldWrapper>
                  <RequiredLabel>Nome completo</RequiredLabel>
                  <FormControl>
                    <Input placeholder="Hélio delfino" {...field} />
                  </FormControl>
                  <FormMessage className="absolute -bottom-0 left-0 text-xs" />
                </FieldWrapper>
              )}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
              <FormField
                control={form.control}
                name="cpf"
                render={({ field }) => (
                  <FieldWrapper>
                    <RequiredLabel>CPF</RequiredLabel>
                    <FormControl>
                      <Input
                        placeholder="000.000.000-00"
                        {...field}
                        onChange={(e) =>
                          field.onChange(formatCPF(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage className="absolute -bottom-0 left-0 text-xs" />
                  </FieldWrapper>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FieldWrapper>
                    <RequiredLabel>Cargo</RequiredLabel>
                    <FormControl>
                      <Input placeholder="Desenvolvedor" {...field} />
                    </FormControl>
                    <FormMessage className="absolute -bottom-0 left-0 text-xs" />
                  </FieldWrapper>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FieldWrapper>
                  <RequiredLabel>E-mail</RequiredLabel>
                  <FormControl>
                    <Input placeholder="helio@puntu.com" {...field} />
                  </FormControl>
                  <FormMessage className="absolute -bottom-0 left-0 text-xs" />
                </FieldWrapper>
              )}
            />
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
            Endereço
          </p>
          <div className="space-y-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
              <FormField
                control={form.control}
                name="cep"
                render={({ field }) => (
                  <FieldWrapper>
                    <RequiredLabel>CEP</RequiredLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          placeholder="00000-000"
                          {...field}
                          onChange={(e) => {
                            const formatted = formatCEP(e.target.value);
                            field.onChange(formatted);
                            if (formatted.length === 9) {
                              onFetchCEP(formatted);
                            }
                          }}
                        />
                      </FormControl>
                      {cepLoading && (
                        <Loader2 className="absolute right-3 top-2.5 h-4 w-4 animate-spin text-muted-foreground" />
                      )}
                    </div>
                    <FormMessage className="absolute -bottom-0 left-0 text-xs" />
                  </FieldWrapper>
                )}
              />
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FieldWrapper>
                    <RequiredLabel>Estado</RequiredLabel>
                    <FormControl>
                      <Input placeholder="SP" {...field} />
                    </FormControl>
                    <FormMessage className="absolute -bottom-0 left-0 text-xs" />
                  </FieldWrapper>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <FieldWrapper>
                  <RequiredLabel>Rua</RequiredLabel>
                  <FormControl>
                    <Input placeholder="Rua das Flores" {...field} />
                  </FormControl>
                  <FormMessage className="absolute -bottom-0 left-0 text-xs" />
                </FieldWrapper>
              )}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
              <FormField
                control={form.control}
                name="neighborhood"
                render={({ field }) => (
                  <FieldWrapper>
                    <RequiredLabel>Bairro</RequiredLabel>
                    <FormControl>
                      <Input placeholder="Centro" {...field} />
                    </FormControl>
                    <FormMessage className="absolute -bottom-0 left-0 text-xs" />
                  </FieldWrapper>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FieldWrapper>
                    <RequiredLabel>Cidade</RequiredLabel>
                    <FormControl>
                      <Input placeholder="São Paulo" {...field} />
                    </FormControl>
                    <FormMessage className="absolute -bottom-0 left-0 text-xs" />
                  </FieldWrapper>
                )}
              />
            </div>
          </div>
        </div>

        <Button type="submit" className="w-full" size="lg">
          Cadastrar Funcionário
        </Button>
      </form>
    </Form>
  );
}
