export default function(state = null, action) {
	switch (action.type) {
		case 'GET_COINS':
			console.log("-------- in get coin.");
			console.log("-------- resp.data:", action.payload);
			return action.payload;
		case 'GET_ITEM':
			let nstate = Object.assign({}, state);
			return _.map(nstate, (tt) => {
				if(tt.Symbol==action.payload['sym']) {
					let nt = Object.assign({}, tt);
					nt.price = action.payload['price'];
					//console.log("-------- price:", action.payload);
					return nt;
				}
				else return tt;
			});
		default:
			return state;
	}
}
