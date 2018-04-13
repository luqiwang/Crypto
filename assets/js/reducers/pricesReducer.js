export default function(state = null, action) {
	switch (action.type) {
		case 'GET_PRICES':
      console.log("INSIDEPRICE",action.payload)
			return action.payload;
		default:
			return state;
	}
}
