import { forEach } from "./array_like";

const row_toggle = function () {
  forEach(
    document.querySelectorAll(".team > .record"),
    (record_element) => {
      record_element.classList.toggle("record_with_row");
    },
  );
};

export { row_toggle as default };
