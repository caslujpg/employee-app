export interface Employee {
  id: string;
  name: string;
  cpf: string;
  email: string;
  role: string;
  address: {
    cep: string;
    street: string;
    neighborhood: string;
    city: string;
    state: string;
  };
  createdAt: string;
}

export interface User {
  email: string;
  password: string;
}