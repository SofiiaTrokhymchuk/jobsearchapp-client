const handleQueryString = (selectedFilters) => {
  let queryString = Object.keys(selectedFilters).map((key) => {
    if (selectedFilters[key]) {
      return `${key}=${selectedFilters[key]}`;
    }
  });
  return queryString.filter((s) => s !== undefined).join("&");
};

export default handleQueryString;
