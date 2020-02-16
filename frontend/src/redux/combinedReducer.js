import { combineReducers } from 'redux';
import userReducer from './reducers/userReducer';
import courseReducer from './reducers/courseReducer';

const combinedReducer = combineReducers({
  userReducer,
  courseReducer,
});

export default combinedReducer;
