import { combineReducers } from 'redux';
import messageReducer from './messageReducer';
import loadingReducer from './loadingReducer';
import gameReducer from './gameReducer';

const appReducer = combineReducers({
  message: messageReducer,
  loading: loadingReducer,
  game: gameReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'RESET') {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export default rootReducer;
