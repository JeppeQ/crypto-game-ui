export function ellipseAddress(address, width) {
  return `${address.slice(0, width)}...${address.slice(-width)}`;
}