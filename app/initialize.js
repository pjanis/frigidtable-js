import add_listeners_to_games from "./js/game_hover";
import add_menu_listeners from "./js/menu_listeners";
import { populate_conference_divisions } from "./js/league_display";

document.addEventListener("DOMContentLoaded", () => {
  populate_conference_divisions();
  add_listeners_to_games();
  add_menu_listeners();
});
