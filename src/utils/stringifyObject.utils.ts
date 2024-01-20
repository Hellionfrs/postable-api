export function objStringify(object: Record<string, unknown>): string {
  let result = [];

  for (let key in object) {
    const value = object[key];
    const formattedValue = typeof value === 'string' ? `'${value}'` : value;
    result.push(`${key} = ${formattedValue}`);
  }

  return result.join(", ");
}