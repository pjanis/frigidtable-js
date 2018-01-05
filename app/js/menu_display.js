import { forEach } from "./array_like";
import { getSiblings, hasClassList } from "./dom_manipulation";
import { apply_last_n_window, last_n_toggle } from "./last_n_display";
import {
  home_toggle as partial_home_toggle,
  away_toggle as partial_away_toggle,
} from "./home_away_display";
import row_display_toggle from "./row_display";
import { add_resort_element, remove_resort_element } from "./team_sort";
import {
  todays_games_toggle,
  yesterdays_games_toggle,
  tomorrows_games_toggle,
} from "./day_display";
import {
  update_all_team_details,
  top_3_toggle as top_3_display_toggle,
  playoffs_toggle as playoffs_display_toggle,
} from "./team_display";
import {
  league_toggle as league_display_toggle,
  conferences_toggle as conferences_display_toggle,
} from "./league_display";
import {
  show_games_behind,
  remove_games_behind,
  games_behind_possible,
} from "./games_behind_display";

const update_games_behind = function () {
  const games_behind_menu_element = document.getElementById("games_behind_select");
  if (games_behind_possible()) {
    games_behind_menu_element.classList.remove("hidden");
  } else {
    games_behind_menu_element.classList.remove("selected");
    remove_games_behind();
    games_behind_menu_element.classList.add("hidden");
  }
};

const update_resort = function () {
  const league_level_select = document.getElementById("league_level_select");
  remove_resort_element(league_level_select);
  add_resort_element(league_level_select);
};

const was_not_previously_selected = function (menu_element) {
  return !(menu_element.classList.contains("selected"));
};

const clear_sibling_selections = function (menu_element) {
  forEach(getSiblings(menu_element, hasClassList), (sibling) => {
    sibling.classList.remove("selected");
  });
};

const mark_selected = function (menu_element) {
  menu_element.classList.add("selected");
};

export const menu_display_toggle = function (menu_element) {
  forEach(getSiblings(menu_element, hasClassList), (sibling) => {
    if (menu_element !== sibling) {
      sibling.classList.toggle("hidden");
    }
  });
  menu_element.classList.toggle("selected");
};

const simple_toggle = function (menu_element, toggle_function) {
  toggle_function();
  menu_element.classList.toggle("selected");
  update_games_behind();
};

const update_toggle = function (menu_element, toggle_function) {
  toggle_function();
  menu_element.classList.toggle("selected");
  update_all_team_details();
  update_games_behind();
};

const exclusive_menu_toggle = function (menu_element, toggle_function) {
  const turn_on_toggle = was_not_previously_selected(menu_element);
  clear_sibling_selections(menu_element);

  toggle_function(turn_on_toggle);
  if (turn_on_toggle) { mark_selected(menu_element); }

  update_all_team_details();
  update_games_behind();
  update_resort();
};

export const last_5_toggle = function (menu_element) {
  exclusive_menu_toggle(
    menu_element,
    (turn_on_toggle) => { last_n_toggle(5, turn_on_toggle); },
  );
};

export const last_10_toggle = function (menu_element) {
  exclusive_menu_toggle(
    menu_element,
    (turn_on_toggle) => { last_n_toggle(10, turn_on_toggle); },
  );
};

export const home_toggle = function (menu_element) {
  exclusive_menu_toggle(
    menu_element,
    (turn_on_toggle) => {
      partial_home_toggle(turn_on_toggle);
      apply_last_n_window();
    },
  );
};

export const away_toggle = function (menu_element) {
  exclusive_menu_toggle(
    menu_element,
    (turn_on_toggle) => {
      partial_away_toggle(turn_on_toggle);
      apply_last_n_window();
    },
  );
};

export const row_toggle = function (menu_element) {
  update_toggle(menu_element, row_display_toggle);
};

export const today_toggle = function (menu_element) {
  simple_toggle(menu_element, todays_games_toggle);
};

export const yesterday_toggle = function (menu_element) {
  simple_toggle(menu_element, yesterdays_games_toggle);
};

export const tomorrow_toggle = function (menu_element) {
  simple_toggle(menu_element, tomorrows_games_toggle);
};
export const top_3_toggle = top_3_display_toggle;
export const playoffs_toggle = playoffs_display_toggle;

export const league_toggle = function (menu_element) {
  exclusive_menu_toggle(
    menu_element,
    (turn_on_toggle) => {
      league_display_toggle(turn_on_toggle);
      apply_last_n_window();
    },
  );
};

export const conferences_toggle = function (menu_element) {
  exclusive_menu_toggle(
    menu_element,
    (turn_on_toggle) => {
      conferences_display_toggle(turn_on_toggle);
      apply_last_n_window();
    },
  );
};

export const games_behind_toggle = function (menu_element) {
  if (menu_element.classList.contains("selected")) {
    remove_games_behind();
    menu_element.classList.remove("selected");
  } else {
    show_games_behind();
    menu_element.classList.add("selected");
  }
};
