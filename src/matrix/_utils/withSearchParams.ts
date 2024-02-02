export const withSearchParams = (
  path: string,
  searchParams?: string,
): string => {
  if (searchParams) return `${path}?${searchParams}`;
  return path;
};
