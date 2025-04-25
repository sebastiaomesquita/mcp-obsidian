export function sanitizeAndEncodePath(path: string): string {
  return encodeURIComponent(path.replace(/^\/|\/$/g, ""));
}
