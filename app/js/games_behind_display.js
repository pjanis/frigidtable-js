import { forEach, slice } from "./array_like";
import { sorted_teams } from "./team_sort";
import { games_behind } from "./team_stats";
import { team_incomplete_games, hidden_games, all_incomplete_games } from "./games";

export const remove_games_behind = function () {
  forEach(document.querySelectorAll(".results > svg"), (result_svg) => {
    result_svg.classList.remove("game_behind_previous");
    result_svg.classList.remove("game_behind_previous_limited");
    result_svg.classList.remove("game_behind_first");
    result_svg.classList.remove("game_behind_first_limited");
  });
};

export const games_behind_possible = function () {
  return (all_incomplete_games().length > 0) && (hidden_games().length === 0);
};

export const show_games_behind = function () {
  forEach(document.getElementsByClassName("teams"), (teams_element) => {
    const ordered_teams = sorted_teams(teams_element.getElementsByClassName("team"));
    forEach(slice(ordered_teams, 1), (team, team_index) => {
      const games_behind_first = games_behind(team, ordered_teams[0]);
      // team_index is alread offset by 1
      const games_behind_previous = games_behind(team, ordered_teams[team_index]);
      const incomplete_games = team_incomplete_games(team);
      if (incomplete_games.length >= games_behind_previous) {
        let previous_endpoint;
        if (games_behind_previous > 0) {
          forEach(
            slice(incomplete_games, -1 * games_behind_previous),
            (incomplete_game) => { incomplete_game.classList.add("game_behind_previous"); },
          );
          previous_endpoint = -1 * games_behind_previous;
        }
        if (games_behind_first > 0) {
          if (incomplete_games.length >= games_behind_first) {
            forEach(
              slice(incomplete_games, -1 * games_behind_first, previous_endpoint),
              (incomplete_game) => { incomplete_game.classList.add("game_behind_first"); },
            );
          } else {
            forEach(
              slice(incomplete_games, 0, previous_endpoint),
              (incomplete_game) => { incomplete_game.classList.add("game_behind_first_limited"); },
            );
          }
        }
      } else {
        forEach(
          incomplete_games,
          (incomplete_game) => { incomplete_game.classList.add("game_behind_previous_limited"); },
        );
      }
    });
  });
};
