const getEstablishedYears = () => {
  const currentYear = new Date().getFullYear();
  const years = [];

  for (let i = currentYear; i >= 1900; i--) {
    years.push(i);
  }

  return years;
};

export default getEstablishedYears;
