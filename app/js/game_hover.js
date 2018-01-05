import { forEach } from "./array_like";
import { create_div, clear_div } from "./dom_manipulation";
import {
  get_game_data,
  create_index,
  all_games,
  displayed_games,
} from "./games";

// Used for game_detail manipulation. Populated when listeners are added.
// TODO remove and replace with explicit function pass
let game_data;
let game_data_index;

const add_game_detail = function (game_detail_data, base_element) {
  const node = create_div(["game_detail_2"], "");
  node.appendChild(create_div(["detail_date"], game_detail_data["game-date"]));
  node.appendChild(
    create_div(
      ["detail_headline"],
      create_div(["result_type"], game_detail_data["game-state"]),
    ),
  );
  node.appendChild(create_div(["detail"],
    [create_div(["detail_home"], game_detail_data["home-team-name"]),
      create_div(["detail_score"],
        [game_detail_data["home-team-score"],
          "-",
          game_detail_data["away-team-score"]]),
      create_div(["detail_away"], game_detail_data["away-team-name"])]));
  base_element.appendChild(node);
};

const bout_toggle = function (game) {
  const element_index = Array.prototype.indexOf.call(displayed_games(game.parentNode), game);
  const all_results = document.getElementsByClassName("results");
  forEach(all_results, (team_results) => {
    const team_games = displayed_games(team_results);
    team_games[element_index].classList.toggle("hovered_bout");
  });
};

let game_toggle_timer = null;

const game_toggle = function (game) {
  const classes = game.getAttribute("class").split(" ");
  const game_class = classes.find(el => el.indexOf("game_") >= 0);
  const game_id = game_class.split("_")[1];
  const game_instances = document.getElementsByClassName(game_class);
  forEach(game_instances, (game_instance) => { game_instance.classList.toggle("hovered_game"); });
  return game_id;
};

const update_game_detail = function (game_id) {
  const game_details = document.getElementById("game_details");
  window.clearTimeout(game_toggle_timer);
  game_toggle_timer = window.setTimeout(() => {
    clear_div(game_details);
    add_game_detail(game_data[game_data_index[game_id]], game_details);
  }, 75);
};

const remove_game_detail = function () {
  const game_details = document.getElementById("game_details");
  window.clearTimeout(game_toggle_timer);
  game_toggle_timer = window.setTimeout(() => {
    clear_div(game_details);
  }, 75);
};

const add_game_listeners = function (game) {
  game.addEventListener("mouseenter", () => bout_toggle(game), false);
  game.addEventListener("mouseleave", () => bout_toggle(game), false);
  game.addEventListener(
    "mouseenter",
    () => {
      const game_id = game_toggle(game);
      update_game_detail(game_id);
    },
    false,
  );
  game.addEventListener(
    "mouseleave",
    () => {
      game_toggle(game);
      remove_game_detail();
    },
    false,
  );
};

const add_listeners_to_games = function () {
  game_data = get_game_data();
  game_data_index = create_index(game_data, "game-id");
  forEach(all_games(), (game) => { add_game_listeners(game); });
};

export { add_listeners_to_games as default };
