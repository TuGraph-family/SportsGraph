import queryString from "query-string";
export const parseSearch = (search: string) =>
  queryString.parse(search?.trim().replace(/^[?]+/g, ""));
export const searchFy = <P extends object>(params: P) =>
  `?${queryString.stringify(params)}`;
