export default function(state = "", action) {
	switch (action.type) {
		case 'SET_WARN':
			return action.payload;
		default:
			return state;
	}
}
