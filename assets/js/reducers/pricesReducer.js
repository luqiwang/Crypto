export default function(state = null, action) {
	switch (action.type) {
		case 'GET_PRICES':
			return action.payload;
		default:
			return state;
	}
}
