const getYearAndMonthLabel = (year: number, month: number) => {
  const date = new Date(`${year}-${('0' + month).slice(-2)}-01`);

  return `${year} ${date.toLocaleString('default', { month: 'long' })}`;
}

export default getYearAndMonthLabel;
