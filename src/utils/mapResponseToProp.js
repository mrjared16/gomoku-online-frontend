const getWinRate = (numberOfMatches, numberOfWonMatches) => {
	if (numberOfMatches === 0) return null;
	const rate = (numberOfWonMatches / numberOfMatches) * 100;
	const formatRate = rate.toFixed(1);
	return formatRate;
}

function userDTOToProp(user) {
	if (!user)
		return null;
	const { id, username, name, gameProfile } = user;
	const { rank, numberOfMatches, numberOfWonMatches } = gameProfile;
	const winRate = getWinRate(numberOfMatches, numberOfWonMatches);
	return {
		id: id,
		online: true,
		name,
		photo: '',
		username,
		rank: rank,
		numberOfMatches: numberOfMatches,
		numberOfWonMatches: numberOfWonMatches,
		winRate: winRate,
		// time: null
	};
}

export {
	userDTOToProp
};