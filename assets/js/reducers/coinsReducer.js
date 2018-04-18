/*
coins: map {"BTC" : {CoinName: ..., ...}, ...}
*/
export default function(state = null, action) {
	switch (action.type) {
		case 'GET_COINS':
			return action.payload;
		default:
			return state;
	}
}
