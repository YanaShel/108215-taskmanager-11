const FilterNames = [
  `all`,
  `overdue`,
  `today`,
  `favorites`,
  `repeating`,
  `archive`
];

export const generateFilters = () => {
  return FilterNames.map((name) => {
    return {
      title: name,
      count: Math.floor(Math.random() * 10),
    };
  });
};
