export function formatUnit(n: number, unit: string) {
  if (unit.length > 2) {
    return `${n} ${unit}`;
  }
  return `${n}${unit}`;
}
