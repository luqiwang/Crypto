let init_messages = {nameMessage: "", editCoinMessage: "", profileMessage:false}

export default function(state = init_messages, action) {
	switch (action.type) {
		case 'EDIT_NAME':
			let es = Object.assign({}, state, {profileMessage: action.payload});
			return es;
		case 'SET_WARN':
			let ns = Object.assign({}, state, {nameMessage: action.payload});
			return ns;
		case 'EDITING_COIN':
			let ms = Object.assign({}, state, {editCoinMessage: action.payload});
			return ms;
		default:
			return state;
	}
}
