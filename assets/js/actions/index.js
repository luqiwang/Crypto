import axios from 'axios';

export const fetchUser = (id) => async dispatch => {
	const res = await axios.get('/api/v1/users/' + id)
  dispatch({ type: 'FETCH_USER', payload: res.data });
};
