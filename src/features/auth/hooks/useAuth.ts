import { useState } from "react";
import { storage } from "@/lib/storage";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => !!storage.getSession()
  );

  function login(email: string, password: string): boolean {
    const user = storage.getUser();
    if (email === user.email && password === user.password) {
      storage.setSession(email);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  }

  function logout() {
    storage.clearSession();
    setIsAuthenticated(false);
  }

  return { isAuthenticated, login, logout };
}