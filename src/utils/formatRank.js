import { Icon } from '@material-ui/core';

const SILVER = 200;
const GOLD = 300;
const PLATINUM = 400;
const DIAMOND = 500;
const MASTER = 600;
const GRAND_MASTER = 700;

const formatRank = (elo) => {
	let rank;

	if (elo < SILVER) {
		rank = (
			<>
				<span style={{fontSize: '0.875rem'}}>Bronze</span>
				<Icon
					className="fas fa-gem"
					style={{ fontSize: 15, marginLeft: 10, color: '#13B0E2' }}
				/>
			</>
		)
	}

	if (elo >= SILVER && elo < GOLD) {
		rank = (
			<>
				<span style={{fontSize: '0.875rem'}}>Silver</span>
				<Icon
					className="fas fa-gem"
					style={{ fontSize: 15, marginLeft: 10, color: '#13B0E2' }}
				/>
			</>
		)
	}

	if (elo >= GOLD && elo < PLATINUM) {
		rank = (
			<>
				<span style={{fontSize: '0.875rem'}}>Gold</span>
				<Icon
					className="fas fa-gem"
					style={{ fontSize: 15, marginLeft: 10, color: '#13B0E2' }}
				/>
			</>
		)
	}

	if (elo >= PLATINUM && elo < DIAMOND) {
		rank = (
			<>
				<span style={{fontSize: '0.875rem'}}>Platinum</span>
				<Icon
					className="fas fa-gem"
					style={{ fontSize: 15, marginLeft: 10, color: '#13B0E2' }}
				/>
			</>
		)
	}

	if (elo >= DIAMOND && elo < MASTER) {
		rank = (
			<>
				<span style={{fontSize: '0.875rem'}}>Diamond</span>
				<Icon
					className="fas fa-gem"
					style={{ fontSize: 15, marginLeft: 10, color: '#13B0E2' }}
				/>
			</>
		)
	}

	if (elo >= MASTER && elo < GRAND_MASTER) {
		rank = (
			<>
				<span style={{fontSize: '0.875rem'}}>Master</span>
				<Icon
					className="fas fa-gem"
					style={{ fontSize: 15, marginLeft: 10, color: '#13B0E2' }}
				/>
			</>
		)
	}

	if (elo >= GRAND_MASTER) {
		rank = (
			<>
				<span style={{fontSize: '0.875rem'}}>Grand Master</span>
				<Icon
					className="fas fa-gem"
					style={{ fontSize: 15, marginLeft: 10, color: '#13B0E2' }}
				/>
			</>
		)
	}

	return rank;
}

export default formatRank;