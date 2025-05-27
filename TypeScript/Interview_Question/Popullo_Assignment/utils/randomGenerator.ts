export const generateRandomLines = (n: number): number[][] => {
  return Array.from({ length: n }, () =>
    Array.from({ length: 3 }, () => Math.floor(Math.random() * 3))
  );
};
