export const concat = function (...args) {
  return Array.prototype.concat.call(...args);
};

export const forEach = function (...args) {
  return Array.prototype.forEach.call(...args);
};

export const find = function (...args) {
  return Array.prototype.find.call(...args);
};

export const map = function (...args) {
  return Array.prototype.map.call(...args);
};

export const slice = function (...args) {
  return Array.prototype.slice.call(...args);
};

export const sort = function (...args) {
  return Array.prototype.sort.call(
    slice(args[0]),
    ...(slice(args, 1)),
  );
};
