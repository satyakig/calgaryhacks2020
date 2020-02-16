import { UPDATE_USER } from '../actions/UserActions';
import { UserModel } from '../models/UserModel';
import { newState } from '../NewState';

export default (state = new UserModel(), action) => {
  if (action.type === UPDATE_USER) {
    return newState(state, {
      ...action.user,
    });
  }

  return state;
};
