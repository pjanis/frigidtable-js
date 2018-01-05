import { forEach, find, sort } from "./array_like";
import { create_div } from "./dom_manipulation";
import {
  team_pts,
  team_row,
  team_home_pts,
  team_home_row,
  team_away_pts,
  team_away_row,
  last_5_team_pts,
  last_5_team_row,
  last_10_team_pts,
  last_10_team_row,
  last_5_team_home_pts,
  last_5_team_home_row,
  last_5_team_away_pts,
  last_5_team_away_row,
  last_10_team_home_pts,
  last_10_team_home_row,
  last_10_team_away_pts,
  last_10_team_away_row,
} from "./team_stats";

const default_sort_functions = [team_pts, team_row];

export const sorted_teams = function (teams, sort_functions = default_sort_functions) {
  return sort(teams, (a, b) => {
    let comparison = 0;
    find(sort_functions, (sort_function) => {
      const sort_res_a = sort_function(a);
      const sort_res_b = sort_function(b);
      if (sort_res_a === null && sort_res_b === null) { return false; }
      if (sort_res_a === null) { comparison = -1; return true; }
      if (sort_res_b === null) { comparison = 1; return true; }
      if (sort_res_a < sort_res_b) { comparison = 1; return true; }
      if (sort_res_a > sort_res_b) { comparison = -1; return true; }
      return false;
    });
    return comparison;
  });
};

const resort_teams = function (compare_functions) {
  forEach(document.getElementsByClassName("teams"), (team_group) => {
    const teams = team_group.getElementsByClassName("team");
    const ordered_teams = sorted_teams(teams, compare_functions);
    forEach(teams, (team) => { team_group.removeChild(team); });
    forEach(ordered_teams, (team) => { team_group.appendChild(team); });
  });
};

const home_resort = function () { resort_teams([team_home_pts, team_home_row]); };
const away_resort = function () { resort_teams([team_away_pts, team_away_row]); };
const last_5_resort = function () { resort_teams([last_5_team_pts, last_5_team_row]); };
const last_10_resort = function () { resort_teams([last_10_team_pts, last_10_team_row]); };
const last_5_home_resort = function () {
  resort_teams([last_5_team_home_pts, last_5_team_home_row]);
};
const last_5_away_resort = function () {
  resort_teams([last_5_team_away_pts, last_5_team_away_row]);
};
const last_10_home_resort = function () {
  resort_teams([last_10_team_home_pts, last_10_team_home_row]);
};
const last_10_away_resort = function () {
  resort_teams([last_10_team_away_pts, last_10_team_away_row]);
};
let last_resort_function = resort_teams;
export const repeat_last_resort_function = function () {
  last_resort_function();
};

const resort_function_from_string = function (sort_name) {
  return {
    "": resort_teams,
    home: home_resort,
    away: away_resort,
    last_5: last_5_resort,
    last_10: last_10_resort,
    last_5_home: last_5_home_resort,
    last_5_away: last_5_away_resort,
    last_10_home: last_10_home_resort,
    last_10_away: last_10_away_resort,
  }[sort_name];
};

const resort_listener_template = function (self, resort_function) {
  resort_function();
  last_resort_function = resort_function;
  document.getElementById("home_away_select").classList.remove("sort_selected");
  document.getElementById("home_select").classList.remove("sort_selected");
  document.getElementById("away_select").classList.remove("sort_selected");
  document.getElementById("last_5_select").classList.remove("sort_selected");
  document.getElementById("last_10_select").classList.remove("sort_selected");
  if ((resort_function === home_resort) ||
      (resort_function === last_5_home_resort) ||
      (resort_function === last_10_home_resort)) {
    document.getElementById("home_select").classList.add("sort_selected");
  } else if ((resort_function === away_resort) ||
             (resort_function === last_5_away_resort) ||
             (resort_function === last_10_away_resort)) {
    document.getElementById("away_select").classList.add("sort_selected");
  } else if ((resort_function === resort_teams) ||
             (resort_function === last_5_resort) ||
             (resort_function === last_10_resort)) {
    document.getElementById("home_away_select").classList.add("sort_selected");
  }
  if ((resort_function === last_5_resort) ||
      (resort_function === last_5_home_resort) ||
      (resort_function === last_5_away_resort)) {
    document.getElementById("last_5_select").classList.add("sort_selected");
  } else if ((resort_function === last_10_resort) ||
             (resort_function === last_10_home_resort) ||
             (resort_function === last_10_away_resort)) {
    document.getElementById("last_10_select").classList.add("sort_selected");
  }

  self.remove();
};

const current_resort_function = function () {
  const selected_elements = [];
  if (document.getElementById("last_5_select").classList.contains("selected")) {
    selected_elements.push("last_5");
  }
  if (document.getElementById("last_10_select").classList.contains("selected")) {
    selected_elements.push("last_10");
  }
  if (document.getElementById("home_select").classList.contains("selected")) {
    selected_elements.push("home");
  }
  if (document.getElementById("away_select").classList.contains("selected")) {
    selected_elements.push("away");
  }
  return resort_function_from_string(selected_elements.join("_"));
};

export const add_resort_element = function (container_el) {
  const current_func = current_resort_function();
  if (last_resort_function !== current_func) {
    const resort_div = create_div(["resort_select"], "Re-Sort");
    container_el.appendChild(resort_div);
    const resort_listener_function = function () {
      const self = this;
      resort_listener_template(self, current_func);
    };
    resort_div.addEventListener("click", resort_listener_function, false);
  }
};

export const remove_resort_element = function (scoping_element = document) {
  const resort_elements = scoping_element.getElementsByClassName("resort_select");
  forEach(resort_elements, (resort_element) => { resort_element.remove(); });
  return null;
};
