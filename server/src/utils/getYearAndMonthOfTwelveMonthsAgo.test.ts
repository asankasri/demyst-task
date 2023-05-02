import getYearAndMonthOfTwelveMonthsAgo from './getYearAndMonthOfTwelveMonthsAgo';

describe('utils/getYearAndMonthOfTwelveMonthsAgo', () => {
  beforeEach(() => {
    jest.spyOn(Date.prototype, 'getFullYear').mockReturnValue(2023);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should return correct values if current month is June', () => {
    jest.spyOn(Date.prototype, 'getMonth').mockReturnValue(5); // 5 is the index of June

    expect(getYearAndMonthOfTwelveMonthsAgo()).toEqual({
      year: 2022,
      month: 6,
    });
  });

  test('should return correct values if current month is January', () => {
    jest.spyOn(Date.prototype, 'getMonth').mockReturnValue(0); // 0 is the index of January

    expect(getYearAndMonthOfTwelveMonthsAgo()).toEqual({
      year: 2022,
      month: 1,
    });
  });
});
