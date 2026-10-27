export const OPEN_ANDRADE_REGISTRATION_DEADLINE = new Date("2026-11-12T00:00:00-03:00");

export function isOpenAndradeRegistrationClosed(now = new Date()) {
  return now >= OPEN_ANDRADE_REGISTRATION_DEADLINE;
}
