/**
 * changes type
 */
export type ChangesSearchParams = {
  from: string;
  to: string;
};
export type ChangesOK = {
  changed: string[];
  left: string[];
};
