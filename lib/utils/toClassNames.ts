export function toClassNames(...args: any[]) {
  return Array.from(args).filter(Boolean).join(' ');
}

export default toClassNames;