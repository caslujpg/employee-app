export function validateCPF(cpf: string): boolean {
  const cleaned = cpf.replace(/\D/g, "");

  if (cleaned.length !== 11) return false;
  if (/^(\d)\1+$/.test(cleaned)) return false;

  const calcDigit = (slice: string, factor: number) => {
    const sum = slice
      .split("")
      .reduce((acc, digit, i) => acc + parseInt(digit) * (factor - i), 0);
    const remainder = (sum * 10) % 11;
    return remainder >= 10 ? 0 : remainder;
  };

  const first = calcDigit(cleaned.slice(0, 9), 10);
  const second = calcDigit(cleaned.slice(0, 10), 11);

  return (
    first === parseInt(cleaned[9]) && second === parseInt(cleaned[10])
  );
}

export function formatCPF(value: string): string {
  return value
    .replace(/\D/g, "")
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

export function formatCEP(value: string): string {
  return value
    .replace(/\D/g, "")
    .slice(0, 8)
    .replace(/(\d{5})(\d)/, "$1-$2");
}