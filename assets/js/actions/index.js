import axios from 'axios';

export const fetchUser = (id) => async dispatch => {
	const res = await axios.get('/api/v1/users/' + id)
  let token = document.querySelector('meta[name="token"]').content;
  let data = Object.assign({}, res.data.data, {token: token})
  dispatch({ type: 'FETCH_USER', payload: data });
};
