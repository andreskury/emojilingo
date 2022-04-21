import { SHOW_LOADING, HIDE_LOADING } from '../actions/types';

const initialState = { show: true };
export default function loadingReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SHOW_LOADING:
      return {
        ...state,
        show: true,
      };
    case HIDE_LOADING:
      return {
        ...state,
        show: false,
      };
    default:
      return state;
  }
}
