import { forEach } from "./array_like";
import {
  menu_display_toggle,
  last_5_toggle,
  last_10_toggle,
  home_toggle,
  away_toggle,
  row_toggle,
  today_toggle,
  yesterday_toggle,
  tomorrow_toggle,
  top_3_toggle,
  playoffs_toggle,
  league_toggle,
  conferences_toggle,
  games_behind_toggle,
} from "./menu_display";

const add_click_listener = function (menu_element, toggle_function) {
  menu_element.addEventListener(
    "click",
    () => { toggle_function(menu_element); },
    false,
  );
};

const add_menu_listeners = function () {
  const el_ids_and_functions = {
    display_options_toggle: menu_display_toggle,
    key_select: menu_display_toggle,
    last_5_select: last_5_toggle,
    last_10_select: last_10_toggle,
    home_select: home_toggle,
    away_select: away_toggle,
    row_select: row_toggle,
    today_select: today_toggle,
    yesterday_select: yesterday_toggle,
    tomorrow_select: tomorrow_toggle,
    top_3_select: top_3_toggle,
    playoffs_select: playoffs_toggle,
    league_select: league_toggle,
    conference_select: conferences_toggle,
    games_behind_select: games_behind_toggle,
  };
  forEach(Object.keys(el_ids_and_functions), (el_id) => {
    add_click_listener(
      document.getElementById(el_id),
      el_ids_and_functions[el_id],
    );
  });
};

export { add_menu_listeners as default };

/* eslint-disable max-len */
//  document.getElementById("conference_select").addEventListener("click", conferences_toggle, false);
//  document.getElementById("league_select").addEventListener("click", league_toggle, false);
//
//  document.getElementById("games_behind_select").addEventListener("click", games_behind_toggle, false);
//
