export const clima = (tem) => {
  return parseInt(((parseInt(tem - 237.15) - 32) * 5) / 9);
};
