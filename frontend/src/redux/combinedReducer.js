import { combineReducers } from 'redux';
import userReducer from './reducers/userReducer';

const combinedReducer = combineReducers({
  userReducer,
});

export default combinedReducer;
