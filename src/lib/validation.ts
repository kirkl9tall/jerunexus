/**
 * ReDoS-safe email validation.
 *
 * The previous pattern `^[^\s@]+@[^\s@]+\.[^\s@]+$` had overlapping quantifiers:
 * the `.` separator is also matched by `[^\s@]`, so the two adjacent `+` groups
 * could backtrack on crafted input. Here the domain labels use `[^\s@.]` (dot
 * excluded), so the `\.` separator is unambiguous — matching is linear, with no
 * catastrophic backtracking. A length cap (RFC 5321 max is 254) bounds work as
 * defence-in-depth.
 */
const EMAIL_RE = /^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)+$/;

export function isValidEmail(email: string): boolean {
  return email.length <= 254 && EMAIL_RE.test(email);
}
