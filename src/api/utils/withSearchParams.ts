import {
  MatrixEndpointSearchParams,
  SearchParamValue,
} from "../MatrixEndpoint";

export const withSearchParams = (
  path: string,
  searchParams?: MatrixEndpointSearchParams,
): string => {
  if (!searchParams) return path;

  const urlSearchParams = new URLSearchParams();

  const appendParam = (key: string, value: SearchParamValue) => {
    /**
     * Ignore undefined values so they are not serialized
     * as the string "undefined".
     */
    if (value === undefined) return;

    if (Array.isArray(value)) {
      value.forEach((item) => appendParam(key, item));
      return;
    }
    urlSearchParams.append(key, String(value));
  };

  Object.entries(searchParams).forEach(([keys, value]) =>
    appendParam(keys, value),
  );

  const query = urlSearchParams.toString();

  return query ? `${path}?${query}` : path;
};
