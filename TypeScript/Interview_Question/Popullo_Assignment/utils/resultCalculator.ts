export const CalculateResult = (line: number[]): number => {
  const [a, b, c] = line;
  if (a + b + c === 2) return 10;
  if (a === b && b === c) return 10;
  if (b !== a && c !== a) return 1;

  return 0;
};
