import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Employee } from "@/types";
import { useEmployeeForm } from "@/features/employees/hooks/useEmployeeForm";
import { EmployeeForm } from "@/features/employees/components/EmployeeForm";

interface CreateEmployeePageProps {
  onSave: (data: Omit<Employee, "id" | "createdAt">) => void;
}

export function CreateEmployeePage({ onSave }: CreateEmployeePageProps) {
  const { form, cepLoading, fetchCEP, onSubmit } = useEmployeeForm(onSave);

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Cadastrar Funcionário</CardTitle>
        </CardHeader>
        <CardContent>
          <EmployeeForm
            form={form}
            cepLoading={cepLoading}
            onSubmit={onSubmit}
            onFetchCEP={fetchCEP}
          />
        </CardContent>
      </Card>
    </div>
  );
}