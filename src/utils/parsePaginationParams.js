const parseNumber = (number, defaultValue) => {
  const isString = typeof number === 'string';
  if (!isString) {
    return defaultValue;
  }
  const parsedNumber = parseInt(number);
  if (Number.isNaN(parseNumber)) {
    return defaultValue;
  }

  return parsedNumber;
};

export const parsePaginationParams = (query) => {
  const { Page, PerPage } = query;

  const parsedPage = parseNumber(Page, 1);
  const parsedPerPage = parseNumber(PerPage, 10);

  return {
    Page: parsedPage,
    PerPage: parsedPerPage,
  };
};
