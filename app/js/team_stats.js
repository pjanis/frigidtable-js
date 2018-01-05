import { forEach } from "./array_like";
import { hasClassList } from "./dom_manipulation";
import {
  home_row,
  home_wins,
  home_otl,
  home_losses,
  away_row,
  away_wins,
  away_otl,
  away_losses,
  win_classes,
  row_wins,
  loss_classes,
  extra_time_loss_classes,
} from "./game_classes";
import { displayed_games, limit_games } from "./games";

const count_occurences_of_classes = function (el, classes) {
  let sum = 0;
  if (
    Array.isArray(el) ||
    (HTMLCollection.prototype.isPrototypeOf(el)) ||
    (NodeList.prototype.isPrototypeOf(el))
  ) {
    forEach(el, (sub_el) => { sum += count_occurences_of_classes(sub_el, classes); });
  } else if (hasClassList(el)) {
    forEach(classes, (html_class) => {
      if (el.classList.contains(html_class)) { sum += 1; }
      sum += el.getElementsByClassName(html_class).length;
    });
  }

  return sum;
};

const record = function (
  results,
  record_win_classes,
  record_loss_classes,
  record_extra_time_loss_classes,
) {
  return [
    count_occurences_of_classes(results, record_win_classes),
    count_occurences_of_classes(results, record_loss_classes),
    count_occurences_of_classes(results, record_extra_time_loss_classes),
  ].join("-");
};

const pts = function (results, pt_win_classes, pt_otl_classes) {
  let sum = 0;
  sum += 2 * count_occurences_of_classes(results, pt_win_classes);
  sum += count_occurences_of_classes(results, pt_otl_classes);
  return sum;
};

// not really needed but here to help clarity
const regulation_overtime_wins = function (results, row_classes) {
  return count_occurences_of_classes(results, row_classes);
};

const record_with_row = function (
  results,
  record_win_classes,
  record_loss_classes,
  record_extra_time_loss_classes,
  record_row_classes,
) {
  return [
    [
      `${count_occurences_of_classes(results, record_win_classes)}`,
      `(${regulation_overtime_wins(results, record_row_classes)})`,
    ].join(""),
    count_occurences_of_classes(results, record_loss_classes),
    count_occurences_of_classes(results, record_extra_time_loss_classes),
  ].join("-");
};

const team_results = function (team) {
  return team.getElementsByClassName("results")[0];
};

export const team_record = function (team) {
  return record(team_results(team), win_classes, loss_classes, extra_time_loss_classes);
};
export const team_home_record = function (team) {
  return record(team_results(team), home_wins, home_losses, home_otl);
};
export const team_away_record = function (team) {
  return record(team_results(team), away_wins, away_losses, away_otl);
};
export const team_record_with_row = function (team) {
  return record_with_row(
    team_results(team),
    win_classes,
    loss_classes,
    extra_time_loss_classes,
    row_wins,
  );
};
export const team_home_record_with_row = function (team) {
  return record_with_row(team_results(team), home_wins, home_losses, home_otl, home_row);
};
export const team_away_record_with_row = function (team) {
  return record_with_row(team_results(team), away_wins, away_losses, away_otl, away_row);
};
export const team_pts = function (team) {
  return pts(team_results(team), win_classes, extra_time_loss_classes);
};
export const team_home_pts = function (team) {
  return pts(team_results(team), home_wins, home_otl);
};
export const team_away_pts = function (team) {
  return pts(team_results(team), away_wins, away_otl);
};
export const team_row = function (team) {
  return regulation_overtime_wins(team_results(team), row_wins);
};
export const team_home_row = function (team) {
  return regulation_overtime_wins(team_results(team), home_row);
};
export const team_away_row = function (team) {
  return regulation_overtime_wins(team_results(team), away_row);
};
export const displayed_team_pts = function (team) {
  return pts(displayed_games(team), win_classes, extra_time_loss_classes);
};
export const displayed_team_row = function (team) {
  return regulation_overtime_wins(displayed_games(team), row_wins);
};
export const displayed_team_record = function (team) {
  return record(displayed_games(team), win_classes, loss_classes, extra_time_loss_classes);
};
export const displayed_team_record_with_row = function (team) {
  return record_with_row(
    displayed_games(team),
    win_classes,
    loss_classes,
    extra_time_loss_classes,
    row_wins,
  );
};
export const last_5_team_pts = function (team) {
  return pts(
    limit_games(
      team_results(team),
      win_classes.concat(loss_classes).concat(extra_time_loss_classes),
      5,
    ),
    win_classes,
    extra_time_loss_classes,
  );
};
export const last_5_team_home_pts = function (team) {
  return pts(
    limit_games(team_results(team), home_wins.concat(home_losses).concat(home_otl), 5),
    home_wins,
    home_otl,
  );
};
export const last_5_team_away_pts = function (team) {
  return pts(
    limit_games(team_results(team), away_wins.concat(away_losses).concat(away_otl), 5),
    away_wins,
    away_otl,
  );
};
export const last_5_team_row = function (team) {
  return regulation_overtime_wins(
    limit_games(
      team_results(team),
      win_classes.concat(loss_classes).concat(extra_time_loss_classes),
      5,
    ),
    win_classes,
    extra_time_loss_classes,
  );
};
export const last_5_team_home_row = function (team) {
  return regulation_overtime_wins(
    limit_games(team_results(team), home_wins.concat(home_losses).concat(home_otl), 5),
    home_wins,
    home_otl,
  );
};
export const last_5_team_away_row = function (team) {
  return regulation_overtime_wins(
    limit_games(team_results(team), away_wins.concat(away_losses).concat(away_otl), 5),
    away_wins,
    away_otl,
  );
};
export const last_10_team_pts = function (team) {
  return pts(
    limit_games(
      team_results(team),
      win_classes.concat(loss_classes).concat(extra_time_loss_classes),
      10,
    ),
    win_classes,
    extra_time_loss_classes,
  );
};
export const last_10_team_home_pts = function (team) {
  return pts(
    limit_games(team_results(team), home_wins.concat(home_losses).concat(home_otl), 10),
    home_wins,
    home_otl,
  );
};
export const last_10_team_away_pts = function (team) {
  return pts(
    limit_games(team_results(team), away_wins.concat(away_losses).concat(away_otl), 10),
    away_wins,
    away_otl,
  );
};
export const last_10_team_row = function (team) {
  return regulation_overtime_wins(
    limit_games(
      team_results(team),
      win_classes.concat(loss_classes).concat(extra_time_loss_classes),
      10,
    ),
    win_classes,
    extra_time_loss_classes,
  );
};
export const last_10_team_home_row = function (team) {
  return regulation_overtime_wins(
    limit_games(team_results(team), home_wins.concat(home_losses).concat(home_otl), 10),
    home_wins,
    home_otl,
  );
};
export const last_10_team_away_row = function (team) {
  return regulation_overtime_wins(
    limit_games(team_results(team), away_wins.concat(away_losses).concat(away_otl), 10),
    away_wins,
    away_otl,
  );
};

export const games_behind = function (team, better_team) {
  return Math.ceil((team_pts(better_team) - team_pts(team)) / 2);
};
