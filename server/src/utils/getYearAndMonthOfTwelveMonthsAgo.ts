export default function getYearAndMonthOfTwelveMonthsAgo(): {
  year: number;
  month: number;
} {
  const d = new Date();

  const currentYear = d.getFullYear();

  const monthIndex = new Date().getMonth();
  const currentMonth = monthIndex === 0 ? 1 : monthIndex + 1;

  return {
    year: currentYear - 1,
    month: currentMonth,
  };
}
