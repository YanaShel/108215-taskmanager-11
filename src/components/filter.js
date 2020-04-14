const createFilterMarkup = ({title, count}, selected) => {
  return `<input
             type="radio"
             id="filter__${title}"
             class="filter__input visually-hidden"
             name="filter"
             ${selected ? `checked` : ``}
           />
           <label for="filter__${title}" class="filter__label"
            >${title} <span class="filter__${title}-count">${count}</span></label
          >`;
};

export const createFilterTemplate = (filters) => {
  const filtersMarkup = filters.map((name, i) =>
    createFilterMarkup(name, i === 0))
    .join(`\n`);
  return `<section class="main__filter filter container">
            ${filtersMarkup}
          </section>`;
};
