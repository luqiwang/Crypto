import { createStore, combineReducers, applyMiddleware } from 'redux';
import deepFreeze from 'deep-freeze';
import reduxThunk from 'redux-thunk';

import auth from './authReducer';
import message from './messageReducer';
import coins from './coinsReducer';
import prices from './pricesReducer'
import { reducer as reduxForm }  from 'redux-form';

function root_reducer(state0, action) {
  let reducer = combineReducers({
    auth: auth,
    form: reduxForm,
    message: message,
    coins: coins,
    prices: prices
  });
  let state1 = reducer(state0, action);
  return deepFreeze(state1);
};

let store = createStore(root_reducer, {}, applyMiddleware(reduxThunk));
export default store;
