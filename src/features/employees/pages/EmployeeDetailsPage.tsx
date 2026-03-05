import { Employee } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  ArrowLeft,
  Mail,
  User,
  Briefcase,
  Hash,
  Home,
  Building2,
  Map,
  Flag,
} from "lucide-react";
import { getInitials } from "@/lib/getInitials";

interface EmployeeDetailsPageProps {
  employee: Employee;
  onBack: () => void;
}

function Detail({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium text-foreground">{value}</p>
      </div>
    </div>
  );
}

export function EmployeeDetailsPage({
  employee,
  onBack,
}: EmployeeDetailsPageProps) {
  const formattedDate = new Date(employee.createdAt).toLocaleDateString(
    "pt-BR",
    { day: "2-digit", month: "long", year: "numeric" }
  );

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Button variant="ghost" onClick={onBack} className="-ml-2">
        <ArrowLeft className="mr-1 h-4 w-4" />
        Voltar
      </Button>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="text-xl bg-blue-100 text-blue-700 font-bold">
                {getInitials(employee.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-xl">{employee.name}</CardTitle>
              <p className="text-muted-foreground">{employee.role}</p>
              <p className="text-xs text-muted-foreground/70 mt-1">
                Cadastrado em {formattedDate}
              </p>
            </div>
          </div>
        </CardHeader>

        <Separator />

        <CardContent className="pt-6 space-y-6">
          <div>
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              Dados Pessoais
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <Detail icon={User} label="CPF" value={employee.cpf} />
              <Detail icon={Mail} label="E-mail" value={employee.email} />
              <Detail icon={Briefcase} label="Cargo" value={employee.role} />
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              Endereço
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <Detail icon={Hash} label="CEP" value={employee.address.cep} />
              <Detail icon={Home} label="Rua" value={employee.address.street} />
              <Detail
                icon={Building2}
                label="Bairro"
                value={employee.address.neighborhood}
              />
              <Detail icon={Map} label="Cidade" value={employee.address.city} />
              <Detail
                icon={Flag}
                label="Estado"
                value={employee.address.state}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
