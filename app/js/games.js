import { forEach, map, slice, sort } from "./array_like";
import {
  all_incomplete,
  hidden as default_hidden_classes,
} from "./game_classes";

export const all_games = function () {
  return document.querySelectorAll(".results > svg[class*=game_]:not(.game_divider)");
};

export const displayed_games = function (
  scoping_element = document,
  hidden_classes = default_hidden_classes,
) {
  let not_hidden_selector = "";
  forEach(hidden_classes, (hidden_class) => {
    not_hidden_selector += `:not(.${hidden_class})`;
  });
  return scoping_element.querySelectorAll(`.results > svg[class*=game_]:not(.game_divider)${not_hidden_selector}`);
};

export const hidden_games = function (
  scoping_element = document,
  hidden_classes = default_hidden_classes,
) {
  const hidden_selector = (
    map(
      hidden_classes,
      hidden_class => `.results > svg[class*=game_]:not(.game_divider).${hidden_class}`,
    )
  ).join(", ");
  return scoping_element.querySelectorAll(hidden_selector);
};

export const all_incomplete_games = function () {
  return document.querySelectorAll(map(all_incomplete, game_class => `.results > svg.${game_class}`).join(", "));
};

export const limit_games = function (games, game_classes, n = 0) {
  return slice(
    games.querySelectorAll(`.${game_classes.join(", .")}`),
    -1 * n,
  );
};

export const get_game_data = function () {
  return JSON.parse(document.getElementById("game_data").innerHTML);
};

export const create_index = function (data, index_key) {
  const index = {};
  forEach(data, (datum, i) => {
    index[datum[index_key]] = i;
  });
  return index;
};

export const sort_games = function (svg_games) {
  return sort(svg_games, (a, b) => {
    const bout_a = a.getAttribute("class").split(" ").find(el => el.indexOf("bout_") >= 0);
    const bout_b = b.getAttribute("class").split(" ").find(el => el.indexOf("bout_") >= 0);
    return parseInt(bout_a.slice(bout_a.indexOf("_") + 1), 10) -
      parseInt(bout_b.slice(bout_b.indexOf("_") + 1), 10);
  });
};

export const team_incomplete_games = function (team) {
  return sort_games(
    team.querySelectorAll(
      map(all_incomplete, game_class => `.results > svg.${game_class}`).join(", "),
    ),
  );
};
