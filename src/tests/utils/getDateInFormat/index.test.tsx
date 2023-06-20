import getDateInFormat from "@/utils/getDateInFormat";

describe('getDateInFormat function', () => {
  it('returns an array of length 2', () => {
    const result = getDateInFormat();
    expect(result).toHaveLength(2);
  });

  it('returns a date in the expected format', () => {
    const result = getDateInFormat();
    expect(result[0]).toMatch(/^\d{1,2}\/\d{1,2}\/\d{4}$/);
  });


  it('returns a time in the expected format', () => {
    const result = getDateInFormat();
    expect(result[1]).toMatch(/^\d{1,2}:\d{2} (AM|PM)$/);
  });
});