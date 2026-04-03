export const roundNumber = (value: number, precision = 2) => {
  if (!value) {
    return "0.00";
  }
  return value.toFixed(precision);
};
