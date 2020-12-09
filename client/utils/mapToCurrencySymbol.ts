export default function mapCurrencySymbol(code: string) {
  if (code === 'BRL') return 'R$';
  if (code === 'EUR') return '€';
  if (code === 'CAD') return '$';
};