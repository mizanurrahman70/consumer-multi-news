/** True for absolute http(s) links, which open in a new tab. */
export function isExternalUrl(href: string): boolean {
  return /^https?:\/\//i.test(href);
}
