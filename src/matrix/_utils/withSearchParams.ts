import { MatrixEndpointSearchParams } from "../MatrixRequestStruct";

export const withSearchParams = (
  path: string,
  searchParams?: MatrixEndpointSearchParams,
): string => {
  if (!searchParams) return path;
  const urlSearchParams: URLSearchParams = new URLSearchParams();

  /**
   * As optional search params can be passed as undefined,
   * we are ignoring all value that are not string, so it
   * does not get parsed as it's <value>.toString() value
   * by URLSearchParams
   * */
  Object.keys(searchParams).forEach((name) => {
    const value = searchParams[name];
    if (typeof value === "string") {
      urlSearchParams.set(name, value);
    }
  });

  if (urlSearchParams.size === 0) return path;

  return `${path}?${urlSearchParams}`;
};
