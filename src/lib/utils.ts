export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

export function formatPrice(price: number | null, currency = 'USD') {
  if (price === null || price === undefined) return 'Consultar';
  const symbol = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : '$';
  return `${symbol}${price.toLocaleString('es', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

export function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}
