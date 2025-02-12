export function formatUnit(n: number, unit: string) {
  if (unit.length > 3) {
    return `${n} ${unit}`;
  }
  return `${n}${unit}`;
}
