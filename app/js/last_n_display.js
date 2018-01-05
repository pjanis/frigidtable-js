// Functions to window displayed games
import { concat, forEach, map, slice } from "./array_like";
import { add_class_to_classes } from "./dom_manipulation";
import { home_incomplete, away_incomplete, hidden } from "./game_classes";
import { sort_games } from "./games";

const show_last_n_hidden = function () {
  forEach(
    document.querySelectorAll(".results > svg"),
    (result_svg) => { result_svg.classList.remove("last_n_hidden"); },
  );
};

const show_only_last_n_games = function (n) {
  add_class_to_classes(
    "last_n_hidden",
    home_incomplete.concat(away_incomplete).concat(["game_divider"]),
    document.getElementById("league"),
  );
  forEach(document.getElementsByClassName("team"), (team) => {
    const team_games = sort_games(
      team.querySelectorAll(
        concat(
          [".results > svg[class*=game_]"],
          map(hidden, hidden_class => `:not(.${hidden_class})`),
        ).join(""),
      ),
    );
    forEach(slice(team_games, 0, (team_games.length - n)), (game) => {
      game.classList.add("last_n_hidden");
    });
  });
};

// stores the last_n window currently applied
let applied_n;

export const apply_last_n_window = function () {
  if (applied_n) {
    show_last_n_hidden();
    show_only_last_n_games(applied_n);
  }
};

export const last_n_toggle = function (n, apply_n_window) {
  show_last_n_hidden();
  if (apply_n_window) {
    show_only_last_n_games(n);
    applied_n = n;
  } else {
    applied_n = undefined;
  }
};
