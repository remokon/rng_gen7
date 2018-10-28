export const calcPSV = pid => {
  const [pidh, pidl] = Uint16Array.from([pid >> 16, pid & 0xFFFF]);
  return (pidh ^ pidl) >>> 4;
};