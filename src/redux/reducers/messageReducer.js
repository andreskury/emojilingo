import { SET_MODAL_MESSAGE, CLEAR_MODAL_MESSAGE } from "../actions/types";
const initialState = { type: false, message: false, messageCode: false };
export default function messageReducer(state = initialState, action) {
  switch (action.type) {
    case SET_MODAL_MESSAGE:
      return action.payload;
    case CLEAR_MODAL_MESSAGE:
      return initialState;
    default:
      return state;
  }
}