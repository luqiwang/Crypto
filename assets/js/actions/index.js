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

  console.log("before send: ", resp);
  dispatch({type: 'GET_COINS', payload:resp.Data});
}

export const getPrice = (name, sym) => async dispatch => {
  const res = await axios.get('https://min-api.cryptocompare.com/data/price?fsym='+sym+'&tsyms=USD');
  let item = {}
  item['sym'] = sym;
  console.log("res:", res.data);
  item['price'] = res.data.USD;
  dispatch({type: 'GET_ITEM', payload:item});
}
