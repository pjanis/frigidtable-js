import { add_class_to_classes, remove_class_from_classes } from "./dom_manipulation";
import { home_classes, away_classes, all_classes } from "./game_classes";

// Used for both the home and the away toggle
const home_away_toggle = function (select_our_classes, our_classes, their_classes) {
  if (select_our_classes) {
    add_class_to_classes("hidden", their_classes);
    remove_class_from_classes("hidden", our_classes);
  } else {
    remove_class_from_classes("hidden", their_classes);
  }
};

export const home_toggle = function (turn_on_toggle) {
  home_away_toggle(turn_on_toggle, home_classes, away_classes.concat(all_classes));
};

export const away_toggle = function (turn_on_toggle) {
  home_away_toggle(turn_on_toggle, away_classes, home_classes.concat(all_classes));
};
