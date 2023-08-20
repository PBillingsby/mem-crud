export const formatAddress = (addr: string): string => {
  if (addr.length === 43 || addr.length === 42) {
    return `${addr.slice(0, 6)}...${addr.slice(addr.length - 6)}`;
  }
  return addr;
};