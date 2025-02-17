export const calculatePaginationData = (count, Page, PerPage) => {
  const totalPages = Math.ceil(count / PerPage);
  const hasPreviousPage = Page !== 1 && Page <= totalPages + 1;
  const hasNextPage = Page < totalPages;

  return {
    Page,
    PerPage,
    totalItems: count,
    totalPages,
    hasNextPage,
    hasPreviousPage,
  };
};
