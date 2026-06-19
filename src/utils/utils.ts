export const getSearchParamString = (searchParamsObject = {}) => {
  const searchParams = new URLSearchParams();

  for (const key of Object.keys(searchParamsObject)) {
    const value = searchParamsObject[key];
    if (!value) continue;
    searchParams.set(key, encodeURIComponent(value));
  }

  return searchParams.toString();
};
