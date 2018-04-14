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

export const addAlert = (data) => async dispatch => {
  await axios.post('/api/v1/coins', {coin: data})
}

export const editAlert = (coin_id, data) => async dispatch => {
  const res = await axios.put('/api/v1/coins/' + coin_id, {coin: data})
}

export const deleteAlert = (id) => async dispatch => {
	const res = await axios.delete('/api/v1/coins/' + id)
}

export const setWarn = (message) => dispatch => {
  dispatch({type: 'SET_WARN',payload: message})
}

export const getCoinList = (resp) => dispatch => {
  dispatch({type: 'GET_COINS', payload: resp.coinList});
}

export const getPrices = (resp) => dispatch => {
	dispatch({type: 'GET_PRICES', payload:resp.prices});
}

export const flipAlertModal = (message) => dispatch => {
  dispatch({type: 'EDITING_COIN', payload:message});
}

export const setName = (message) => dispatch => {
  dispatch({type: 'EDIT_NAME', payload:message});
}
