export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  if (newElement.children.length >= 2) {
    return newElement.children;
  } else {
    return newElement.firstChild;
  }
};

export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      if (element.length > 1) {
        Array.from(element).forEach((it) => {
          container.prepend(it);
        });
      } else {
        container.prepend(element);
      }
      break;
    case RenderPosition.BEFOREEND:
      if (element.length > 1) {
        Array.from(element).forEach((it) => {
          container.append(it);
        });
      } else {
        container.append(element);
      }
      break;
  }
};
