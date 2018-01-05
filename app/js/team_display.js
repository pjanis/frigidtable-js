import { concat, forEach, slice } from "./array_like";
import {
  displayed_team_record,
  displayed_team_record_with_row,
  displayed_team_pts,
} from "./team_stats";
import { create_div } from "./dom_manipulation";
import { get_conference_divisions } from "./league_display";
import { sorted_teams } from "./team_sort";

export const update_all_team_details = function () {
  let record_function;
  const teams = document.getElementsByClassName("team");
  if (teams[0].getElementsByClassName("record")[0].classList.contains("record_with_row")) {
    record_function = displayed_team_record_with_row;
  } else {
    record_function = displayed_team_record;
  }

  forEach(teams, (team) => {
    const record_element = team.getElementsByClassName("record")[0];
    record_element.innerHTML = record_function(team);

    const pts_element = team.getElementsByClassName("pts")[0];
    pts_element.innerHTML = displayed_team_pts(team);
  });
};

const add_mark = function (mark, teams) {
  forEach(teams, (team) => {
    team.getElementsByClassName("icon")[0].appendChild(create_div(["icon_mark"], mark));
  });
};

const remove_marks = function (marks) {
  const marks_regex = new RegExp(marks.join("|"));
  forEach(document.getElementsByClassName("team"), (team) => {
    const icon = team.getElementsByClassName("icon")[0];
    icon.innerHTML = icon.innerHTML.replace(marks_regex, "");
  });
};

const top_3_marks = ["\u25F9", "\u25FF", "\u25FA", "\u25F8"];
const playoff_marks = ["\u25BB", "\u25C5"];

const mark_top_3 = function (marks) {
  const conference_divisions = get_conference_divisions();
  forEach(concat(...(Object.values(conference_divisions))), (division, division_index) => {
    const teams = sorted_teams(document.getElementsByClassName(`team ${division}`));
    add_mark(marks[division_index], slice(teams, 0, 3));
  });
};

const mark_playoffs = function (marks, top_3_marked) {
  const conference_divisions = get_conference_divisions();
  forEach(Object.keys(conference_divisions), (conference, conference_index) => {
    const top_teams = [];
    const remaining_teams = [];
    forEach(conference_divisions[conference], (division) => {
      const division_teams = sorted_teams(document.getElementsByClassName(`team ${division}`));
      forEach(slice(division_teams, 0, 3), (team) => { top_teams.push(team); });
      forEach(slice(division_teams, 3), (team) => { remaining_teams.push(team); });
    });
    if (!(top_3_marked)) { add_mark(marks[conference_index], top_teams); }
    add_mark(marks[conference_index], slice(sorted_teams(remaining_teams), 0, 2));
  });
};

export const top_3_toggle = function (selector_element) {
  const playoffs_marked = document.getElementById("playoffs_select").classList.contains("selected");
  if (selector_element.classList.contains("selected")) {
    if (playoffs_marked) {
      remove_marks(top_3_marks);
      remove_marks(playoff_marks);
      mark_playoffs(playoff_marks);
    } else {
      remove_marks(top_3_marks);
    }
  } else if (playoffs_marked) {
    remove_marks(playoff_marks);
    mark_top_3(top_3_marks);
    mark_playoffs(playoff_marks, true);
  } else {
    mark_top_3(top_3_marks);
  }
  selector_element.classList.toggle("selected");
};

export const playoffs_toggle = function (selector_element) {
  const top_3_marked = document.getElementById("top_3_select").classList.contains("selected");
  if (selector_element.classList.contains("selected")) {
    remove_marks(playoff_marks);
  } else {
    mark_playoffs(playoff_marks, top_3_marked);
  }
  selector_element.classList.toggle("selected");
};
