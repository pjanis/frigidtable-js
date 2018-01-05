import { forEach } from "./array_like";
import {
  toggle_class_on_classes,
} from "./dom_manipulation";
import { get_game_data } from "./games";

const format_date = function (date) {
  let day = date.getDate();
  let month = date.getMonth() + 1;
  const year = date.getFullYear();

  if (day < 10) { day = `0${day}`; }
  if (month < 10) { month = `0${month}`; }

  return [year, month, day].join("-");
};

const toggle_days_games = function (toggle_class, day = new Date()) {
  const day_str = format_date(day);
  const league_scope = document.getElementById("league");
  forEach(get_game_data(), (game_datum) => {
    if (game_datum["game-date"] === day_str) {
      toggle_class_on_classes(toggle_class, [`game_${game_datum["game-id"]}`], league_scope);
    }
  });
};

export const todays_games_toggle = function () {
  toggle_days_games("todays_game", new Date());
};
export const yesterdays_games_toggle = function () {
  toggle_days_games("yesterdays_game", (d => new Date(d.setDate(d.getDate() - 1)))(new Date()));
};
export const tomorrows_games_toggle = function () {
  toggle_days_games("tomorrows_game", (d => new Date(d.setDate(d.getDate() + 1)))(new Date()));
};
