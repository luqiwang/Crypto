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
