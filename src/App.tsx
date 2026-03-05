import { useState } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useEmployees } from "@/features/employees/hooks/useEmployees";
import { LoginPage } from "@/features/auth/pages/LoginPage";
import { AppLayout } from "@/layout/AppLayout";
import { EmployeesPage } from "@/features/employees/pages/EmployeesPage";
import { CreateEmployeePage } from "@/features/employees/pages/CreateEmployeePage";
import { EmployeeDetailsPage } from "@/features/employees/pages/EmployeeDetailsPage";
import { storage } from "@/lib/storage";

type Page = "list" | "create" | "details";

export default function App() {
  const { isAuthenticated, login, logout } = useAuth();
  const { employees, addEmployee, removeEmployee } = useEmployees();
  const [page, setPage] = useState<Page>("list");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  if (!isAuthenticated) {
    return <LoginPage onLogin={login} />;
  }

  const selectedEmployee = selectedId
    ? storage.getEmployeeById(selectedId)
    : null;

  return (
    <AppLayout
      currentPage={page}
      onNavigate={(p) => setPage(p)}
      onLogout={logout}
    >
      {page === "list" && (
        <EmployeesPage
          employees={employees}
          onSelect={(id) => {
            setSelectedId(id);
            setPage("details");
          }}
          onDelete={removeEmployee}
        />
      )}
      {page === "create" && (
        <CreateEmployeePage
          onSave={(data) => {
            addEmployee(data);
            setPage("list");
          }}
        />
      )}
      {page === "details" && selectedEmployee && (
        <EmployeeDetailsPage
          employee={selectedEmployee}
          onBack={() => setPage("list")}
        />
      )}
    </AppLayout>
  );
}