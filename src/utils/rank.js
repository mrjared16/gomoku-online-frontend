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

const getRankSymbol = (elo) => {
	let title;
	let color;

  if (elo < SILVER_POINT) {
		title = BRONZE_TITLE;
		color = '#e27802';
  }

  if (elo >= SILVER_POINT && elo < GOLD_POINT) {
		title = SILVER_TITLE;
		color = '#cdd0cb';
  }

  if (elo >= GOLD_POINT && elo < PLATINUM_POINT) {
		title = GOLD_TITLE;
		color = '#fddb3a';
  }

  if (elo >= PLATINUM_POINT && elo < DIAMOND_POINT) {
    title = PLATINUM_TITLE;
		color = '#70af85';
  }

  if (elo >= DIAMOND_POINT && elo < MASTER_POINT) {
    title = DIAMOND_TITLE;
		color = '#a5ecd7';
  }

  if (elo >= MASTER_POINT && elo < GRAND_MASTER_POINT) {
    title = MASTER_TITLE;
		color = '#6a097d';
  }

  if (elo >= GRAND_MASTER_POINT) {
    title = GRAND_MASTER_TITLE;
		color = '#ec0101';
  }

  return {
		title,
		color,
	};
};

export { getRankSymbol };
