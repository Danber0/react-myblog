export const stringToDate = (created: string) => {
  const createdAt = new Date(created);
  const options: any = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const normalDate = createdAt
    .toLocaleDateString("ru-RU", options)
    .split("г.,")
    .join("в");

  return normalDate;
};

export const checkValueObj = (obj: Object) => {
  const res = Object.values(obj).map((elem: string) => {
    return elem.length > 4;
  });

  return !res.includes(false);
};

export function debounce(fn, ms) {
  let timeout;
  return function () {
    const fnCall = () => {
      // @ts-ignore
      fn.apply(this, arguments);
    };
    clearTimeout(timeout);
    timeout = setTimeout(fnCall, ms);
  };
}
