import { UPDATE_USER } from '../actions/UserActions';
import { UserModel } from '../models/UserModel';

export default (state = new UserModel(), action) => {
  if (action.type === UPDATE_USER) {
    return action.user;
  }

  return state;
};
