// Career start (LTIMindtree, Jun 2023); keeps "years of experience" current.
const CAREER_START = new Date(2023, 5, 1);

export function yearsOfExperience(now: Date = new Date()): number {
  const months =
    (now.getFullYear() - CAREER_START.getFullYear()) * 12 +
    (now.getMonth() - CAREER_START.getMonth());
  return Math.max(0, Math.floor(months / 12));
}
