import { Employee, User } from "@/types";

const EMPLOYEES_KEY = "app:employees";
const AUTH_KEY = "app:auth";

const DEFAULT_USER: User = {
  email: "admin@puntu.com",
  password: "admin123",
};

export const storage = {
  getUser(): User {
    return DEFAULT_USER;
  },

  setSession(email: string): void {
    localStorage.setItem(AUTH_KEY, email);
  },

  getSession(): string | null {
    return localStorage.getItem(AUTH_KEY);
  },

  clearSession(): void {
    localStorage.removeItem(AUTH_KEY);
  },

  getEmployees(): Employee[] {
    try {
      const data = localStorage.getItem(EMPLOYEES_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  isCPFTaken(cpf: string): boolean {
    return storage.getEmployees().some((e) => e.cpf === cpf);
  },

  isEmailTaken(email: string): boolean {
    return storage
      .getEmployees()
      .some((e) => e.email.toLowerCase() === email.toLowerCase());
  },

  saveEmployee(employee: Employee): void {
    const employees = storage.getEmployees();
    employees.push(employee);
    localStorage.setItem(EMPLOYEES_KEY, JSON.stringify(employees));
  },

  deleteEmployee(id: string): void {
    const employees = storage.getEmployees().filter((e) => e.id !== id);
    localStorage.setItem(EMPLOYEES_KEY, JSON.stringify(employees));
  },

  getEmployeeById(id: string): Employee | undefined {
    return storage.getEmployees().find((e) => e.id === id);
  },
};