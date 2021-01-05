import {
  BRONZE_TITLE,
  DIAMOND_TITLE,
  GOLD_TITLE,
  GRAND_MASTER_TITLE,
  MASTER_TITLE,
  PLATINUM_TITLE,
	SILVER_TITLE,
	SILVER_POINT,
	GOLD_POINT,
	PLATINUM_POINT,
	DIAMOND_POINT,
	MASTER_POINT,
	GRAND_MASTER_POINT,
} from 'constants/rank';

const getTitleRank = (elo) => {
  let title;

  if (elo < SILVER_POINT) {
    title = BRONZE_TITLE;
  }

  if (elo >= SILVER_POINT && elo < GOLD_POINT) {
    title = SILVER_TITLE;
  }

  if (elo >= GOLD_POINT && elo < PLATINUM_POINT) {
    title = GOLD_TITLE;
  }

  if (elo >= PLATINUM_POINT && elo < DIAMOND_POINT) {
    title = PLATINUM_TITLE;
  }

  if (elo >= DIAMOND_POINT && elo < MASTER_POINT) {
    title = DIAMOND_TITLE;
  }

  if (elo >= MASTER_POINT && elo < GRAND_MASTER_POINT) {
    title = MASTER_TITLE;
  }

  if (elo >= GRAND_MASTER_POINT) {
    title = GRAND_MASTER_TITLE;
  }

  return title;
};

export { getTitleRank };
