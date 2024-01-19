export function currentDateFormated(): string {
  const fechaActual = new Date();
  return fechaActual.toISOString();
}
