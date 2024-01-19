export function currentDateFormated() {
  const fechaActual = new Date();
  const formatoFecha = fechaActual.toISOString().slice(0, 19).replace("T", " ") + getTimeZone();

  return formatoFecha;
}

function getTimeZone() {
  const offsetMinutos = -new Date().getTimezoneOffset();
  const offsetHoras = ('0' + Math.abs(offsetMinutos / 60)).slice(-2);
  const offsetSigno = offsetMinutos >= 0 ? '+' : '-';
  return offsetSigno + offsetHoras;
}