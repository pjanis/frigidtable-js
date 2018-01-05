import { forEach } from "./array_like";
import { repeat_last_resort_function as last_resort_function } from "./team_sort";
import {
  create_div,
} from "./dom_manipulation";

const conference_divisions = {};

export const populate_conference_divisions = function () {
  forEach(document.getElementsByClassName("conference"), (conference_element) => {
    const conference_name = conference_element.getElementsByClassName("name")[0].innerHTML;
    conference_divisions[conference_name] = [];
    forEach(conference_element.getElementsByClassName("division"), (division_element) => {
      conference_divisions[conference_name]
        .push(division_element.getElementsByClassName("name")[0].innerHTML);
    });
  });
};

export const get_conference_divisions = function () {
  if (Object.keys(conference_divisions).length === 0 &&
      conference_divisions.constructor === Object
  ) { populate_conference_divisions(); }
  return conference_divisions;
};

const remove_divisions = function () {
  forEach(document.getElementsByClassName("conference"), (conference_element) => {
    const conference_teams = [];
    forEach(conference_element.getElementsByClassName("division"), (division_element) => {
      forEach(division_element.getElementsByClassName("team"), (team_element) => {
        conference_teams.push(team_element);
      });
    });
    conference_element.removeChild(conference_element.getElementsByClassName("divisions")[0]);
    conference_element.appendChild(create_div(["teams"], conference_teams));
  });
  last_resort_function();
};

const add_divisions = function () {
  forEach(document.getElementsByClassName("conference"), (conference_element) => {
    const conference_name = conference_element.getElementsByClassName("name")[0].innerHTML;
    const conference_teams_element = conference_element.getElementsByClassName("teams")[0];
    const divisions_element = create_div(["divisions"]);
    forEach(get_conference_divisions()[conference_name], (division_name) => {
      const division_teams = conference_teams_element.getElementsByClassName(division_name);
      divisions_element.appendChild(
        create_div(["division"], [
          create_div(["name"], division_name),
          create_div(["teams"], division_teams),
        ]),
      );
    });
    conference_element.removeChild(conference_teams_element);
    conference_element.appendChild(divisions_element);
  });
  last_resort_function();
};

const add_conferences = function () {
  const league_element = document.getElementById("league");
  const conferences_element = document.createElement("div");
  conferences_element.id = "conferences";
  forEach(Object.keys(get_conference_divisions()), (conference_name) => {
    conferences_element.appendChild(
      create_div(["conference"], [
        create_div(["name"], conference_name),
        create_div(["teams"], league_element.getElementsByClassName(`team ${conference_name}`)),
      ]),
    );
  });
  league_element.removeChild(league_element.getElementsByClassName("name")[0]);
  league_element.removeChild(league_element.getElementsByClassName("teams")[0]);
  league_element.appendChild(conferences_element);
  last_resort_function();
};

const add_conferences_divisions = function () {
  const league_element = document.getElementById("league");
  const conferences_element = document.createElement("div");
  conferences_element.id = "conferences";
  forEach(Object.keys(get_conference_divisions()), (conference_name) => {
    const division_elements = [];
    forEach(get_conference_divisions()[conference_name], (division_name) => {
      division_elements.push(
        create_div(["division"], [
          create_div(["name"], division_name),
          create_div(
            ["teams"],
            league_element.getElementsByClassName(`team ${conference_name} ${division_name}`),
          ),
        ]),
      );
    });
    conferences_element.appendChild(
      create_div(["conference"], [
        create_div(["name"], conference_name),
        create_div(["divisions"], division_elements),
      ]),
    );
  });
  league_element.removeChild(league_element.getElementsByClassName("name")[0]);
  league_element.removeChild(league_element.getElementsByClassName("teams")[0]);
  league_element.appendChild(conferences_element);
  last_resort_function();
};

const remove_conferences_divisions = function () {
  const league_element = document.getElementById("league");
  const all_teams = document.getElementsByClassName("team");
  const conferences_element = document.getElementById("conferences");
  const new_teams = create_div(["teams"], all_teams);
  league_element.removeChild(conferences_element);
  league_element.appendChild(create_div(["name"], "League"));
  league_element.appendChild(new_teams);
  last_resort_function();
};

export const conferences_toggle = function (turn_on_toggle) {
  if (turn_on_toggle) {
    const division_elements = document.getElementsByClassName("divisions");
    if (division_elements.length > 0) {
      remove_divisions();
    } else {
      add_conferences();
    }
  } else {
    add_divisions();
  }
};

export const league_toggle = function (turn_on_toggle) {
  if (turn_on_toggle) {
    remove_conferences_divisions();
  } else {
    add_conferences_divisions();
  }
};
