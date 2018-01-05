import { forEach, slice } from "./array_like";

export const hasClassList = function (el) {
  return (el !== null) && (el.tagName !== undefined);
};

// Includes the Element itself, if not filtered
export const getSiblings = function (el, filter) {
  const siblings = [];
  forEach(el.parentNode.childNodes, (sibling) => {
    if (!filter || filter(sibling)) siblings.push(sibling);
  });
  return siblings;
};


/* eslint-disable no-param-reassign */
const append_content = function (base_element, content) {
  if (content === undefined) {
    base_element.innerHTML += "";
  } else if (Array.isArray(content)) {
    forEach(content, (element) => { append_content(base_element, element); });
  } else if (
    (HTMLCollection.prototype.isPrototypeOf(content)) ||
    (NodeList.prototype.isPrototypeOf(content))
  ) {
    append_content(base_element, slice(content));
  } else if (hasClassList(content)) {
    base_element.appendChild(content);
  } else if ((typeof content) === "string") {
    base_element.innerHTML += content;
  } else if (content === null) {
    base_element.innerHTML += "";
  } else {
    base_element.innerHTML += String(content);
  }
  return base_element;
};
/* eslint-enable no-param-reassign */

export const create_div = function (classes, content) {
  const node = document.createElement("div");
  forEach(classes, (html_class) => { node.classList.add(html_class); });
  append_content(node, content);
  return node;
};

export const clear_div = function (div) {
  if (div.tagName === "DIV") {
    forEach(div.children, (child) => { div.removeChild(child); });
  }
};

export const add_class_to_classes = function (class_name, classes, scoping_element = document) {
  forEach(classes, (html_class) => {
    forEach(scoping_element.getElementsByClassName(html_class), (element) => {
      element.classList.add(class_name);
    });
  });
  return null;
};

export const remove_class_from_classes = function (
  class_name,
  classes,
  scoping_element = document,
) {
  forEach(classes, (html_class) => {
    forEach(scoping_element.getElementsByClassName(html_class), (element) => {
      element.classList.remove(class_name);
    });
  });
  return null;
};

export const toggle_class_on_classes = function (class_name, classes, scoping_element) {
  forEach(classes, (html_class) => {
    forEach(scoping_element.getElementsByClassName(html_class), (element) => {
      element.classList.toggle(class_name);
    });
  });
  return null;
};
