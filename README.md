# Quadro — Gerenciador de funcionários

Sistema web para gerenciamento de funcionários, com autenticação, cadastro, listagem e visualização de perfis.

## 🖥️ Preview

<p align="center">
  <img src="./docs/preview.png" width="800" />
</p>

---

## 🚀 Tecnologias

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Lucide Icons](https://lucide.dev/)

---

## ⚙️ Como rodar localmente

```bash
# Clone o repositório
git clone https://github.com/caslujpg/employee-app.git

# Entre na pasta
cd employee-app

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev

```
Acesse [http://localhost:5173](http://localhost:5173) no navegador.

---

## 📁 Estrutura do projeto

```
src/
├── assets/                   # Imagens e arquivos estáticos
│   └── logo.svg
│
├── components/
│   └── ui/                   # Componentes reutilizáveis (shadcn + customizados)
│
├── features/
│   ├── auth/
│   │   ├── components/
│   │   │   ├── Hero.tsx
│   │   │   └── LoginForm.tsx
│   │   ├── hooks/
│   │   │   ├── useAuth.ts
│   │   │   └── useLoginForm.ts
│   │   └── pages/
│   │       └── LoginPage.tsx
│   │
│   └── employees/
│       ├── components/
│       │   └── EmployeeForm.tsx
│       ├── hooks/
│       │   ├── useEmployeeForm.ts
│       │   └── useEmployees.ts
│       └── pages/
│           ├── CreateEmployeePage.tsx
│           ├── EmployeeDetailsPage.tsx
│           └── EmployeesPage.tsx
│
├── layout/
│   └── AppLayout.tsx         # Layout principal da aplicação
│
├── lib/                      # Funções utilitárias
├── types/                    # Tipagens globais
│
├── App.tsx
├── main.tsx
├── index.css
└── vite-env.d.ts
```
---

## 🧠 Decisões técnicas

- **Arquitetura Feature-Based**  
  A aplicação foi estruturada por domínio (`auth`, `employees`) ao invés de por tipo de arquivo.  
  Isso melhora a escalabilidade, reduz acoplamento entre módulos e facilita manutenção e evolução independente de cada feature.

- **Separation of Responsibilities (SoR)**  
  Cada feature é dividida em:
  - `components/` → responsabilidade puramente visual  
  - `hooks/` → lógica e regras de negócio  
  - `pages/` → composição da interface  
  Essa separação mantém componentes mais previsíveis, reutilizáveis e fáceis de testar.

- **React Hook Form**  
  Utilizado para gerenciamento de formulários com validação performática e mínimo de re-renderizações, mantendo inputs desacoplados da lógica de estado.

- **shadcn/ui como base de Design System**  
  Escolhido por fornecer componentes acessíveis e desacoplados, permitindo total controle de estilo sem dependência rígida de biblioteca visual.

- **Tailwind CSS**  
  Utilizado para estilização utilitária e consistente com o ecossistema do shadcn, permitindo rapidez no desenvolvimento sem sacrificar padronização visual.

- **Confirmação dupla de exclusão sem modal**  
  Implementada via estado local (`confirmId`) e controle por `onBlur`, reduzindo complexidade de UI e evitando dependência de modais globais.

- **Split Screen no Login**  
  Separação visual entre branding e formulário, criando identidade forte e melhorando percepção de produto, além de manter layout adaptável para responsividade.


---

## 🔮 O que poderia ser melhorado com mais tempo

- Persistência de dados com backend real (ex: Node.js + PostgreSQL)
- Autenticação com JWT e refresh token
- Paginação ou busca/filtro na listagem de funcionários
- Testes unitários e de integração (Vitest + Testing Library)
- Dark mode
- Upload de foto de perfil para o avatar
- Feedback de loading nos botões durante ações assíncronas
- Internacionalização (i18n)

---

## 💻 Desenvolvido por

**Caslu Software** — [Fale comigo](https://wa.me/5527997925255)