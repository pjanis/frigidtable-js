export const home_row = ["home_win", "home_ot_win"];
export const home_wins = ["home_so_win"].concat(home_row);
export const home_otl = ["home_ot_loss", "home_so_loss"];
export const home_losses = ["home_loss"];
export const away_row = ["away_win", "away_ot_win"];
export const away_wins = ["away_so_win"].concat(away_row);
export const away_otl = ["away_ot_loss", "away_so_loss"];
export const away_losses = ["away_loss"];
export const home_incomplete = ["home_incomplete", "home_upcoming", "home_ongoing"];
export const away_incomplete = ["away_incomplete", "away_upcoming", "away_ongoing"];
export const all_incomplete = home_incomplete.concat(away_incomplete);
export const home_classes = home_incomplete.concat(home_wins).concat(home_losses).concat(home_otl);
export const away_classes = away_incomplete.concat(away_wins).concat(away_losses).concat(away_otl);
export const win_classes = home_wins.concat(away_wins);
export const row_wins = home_row.concat(away_row);
export const loss_classes = ["home_loss", "away_loss"];
export const extra_time_loss_classes = ["home_ot_loss", "home_so_loss", "away_ot_loss", "away_so_loss"];

// classes that should be shown in the full display but aren't home or away
export const all_classes = [];

export const hidden = ["hidden", "last_n_hidden"];
