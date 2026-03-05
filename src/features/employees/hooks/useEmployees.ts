import { useState } from "react";
import { Employee } from "@/types";
import { storage } from "@/lib/storage";

export function useEmployees() {
  const [employees, setEmployees] = useState<Employee[]>(
    () => storage.getEmployees()
  );

  function addEmployee(data: Omit<Employee, "id" | "createdAt">) {
    const employee: Employee = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    storage.saveEmployee(employee);
    setEmployees(storage.getEmployees());
    return employee;
  }

  function removeEmployee(id: string) {
    storage.deleteEmployee(id);
    setEmployees(storage.getEmployees());
  }

  return { employees, addEmployee, removeEmployee };
}