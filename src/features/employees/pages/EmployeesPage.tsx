import { useState } from "react";
import { Employee } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Eye, Trash2, Users } from "lucide-react";
import { getInitials } from "@/lib/getInitials";

interface EmployeesPageProps {
  employees: Employee[];
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
}

export function EmployeesPage({
  employees,
  onSelect,
  onDelete,
}: EmployeesPageProps) {
  const [confirmId, setConfirmId] = useState<string | null>(null);

  function handleDelete(id: string) {
    if (confirmId === id) {
      onDelete(id);
      setConfirmId(null);
    } else {
      setConfirmId(id);
    }
  }

  if (employees.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-5rem)] gap-3">
        <div className="bg-primary/20 rounded-full p-6">
          <Users className="h-10 w-10 text-foreground" />
        </div>
        <div className="text-center">
          <p className="text-base font-semibold text-foreground">
            Nenhum funcionário cadastrado
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Clique em "Cadastrar" para adicionar o primeiro.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Funcionários</h2>
          <p className="text-sm text-muted-foreground">
            Gerencie os funcionários cadastrados
          </p>
        </div>
        <Badge variant="secondary" className="text-sm px-3 py-1">
          {employees.length} cadastrado(s)
        </Badge>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {employees.map((employee) => (
          <Card
            key={employee.id}
            className={`transition-all hover:shadow-md ${
              confirmId === employee.id
                ? "border-destructive/50 bg-destructive/5"
                : ""
            }`}
          >
            <CardContent className="flex items-center gap-4 p-4">
              <Avatar className="h-11 w-11 shrink-0">
                <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
                  {getInitials(employee.name)}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground truncate">
                  {employee.name}
                </p>
                <p className="text-sm text-muted-foreground truncate">
                  {employee.role}
                </p>
                <p className="text-xs text-muted-foreground/70 truncate">
                  {employee.email}
                </p>
              </div>

              <div className="flex gap-1 shrink-0">
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 text-muted-foreground hover:text-foreground"
                  onClick={() => onSelect(employee.id)}
                  title="Ver detalhes"
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant={confirmId === employee.id ? "destructive" : "ghost"}
                  className="h-8 w-8"
                  onClick={() => handleDelete(employee.id)}
                  onBlur={() => setConfirmId(null)}
                  title={
                    confirmId === employee.id ? "Confirmar exclusão" : "Excluir"
                  }
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {confirmId && (
        <div className="flex items-center justify-center gap-2 text-sm text-destructive bg-destructive/5 border border-destructive/20 rounded-lg py-2.5 px-4">
          <Trash2 className="h-3.5 w-3.5" />
          Clique novamente na lixeira para confirmar a exclusão.
        </div>
      )}
    </div>
  );
}
