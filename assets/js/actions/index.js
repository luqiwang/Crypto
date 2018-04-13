import axios from 'axios';

export const fetchUser = (id) => async dispatch => {
	const res = await axios.get('/api/v1/users/' + id)
  let token = document.querySelector('meta[name="token"]').content;
  let data = Object.assign({}, res.data.data, {token: token})
  dispatch({ type: 'FETCH_USER', payload: data });
};

export const addName = (id, input) => async dispatch => {
  const res = await axios.put('/api/v1/users/' + id, {user: {name: input}})
  let token = document.querySelector('meta[name="token"]').content;
  let data = Object.assign({}, res.data.data, {token: token})
  dispatch({ type: 'FETCH_USER', payload: data });
}

export const setWarn = (message) => dispatch => {
  dispatch({type: 'SET_WARN',payload: message})
}

export const getCoinList = (resp) => dispatch => {
	let keys = Object.keys(resp.coinList);
	let values = Object.values(resp.coinList);

	let lst = _.zip(keys, values);

	lst = _.sortBy(lst, function(cc){
		//console.log("cc", cc[1]["SortOrder"]);
		return parseInt(cc[1]["SortOrder"]);
	});
  dispatch({type: 'GET_COINS', payload:lst});
}

export const getPrices = (resp) => dispatch => {
	dispatch({type: 'GET_PRICES', payload:resp.prices});
}
