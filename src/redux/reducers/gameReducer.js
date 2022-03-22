//import { SHOW_LOADING, HIDE_LOADING } from "../actions/types";
const initialState = { 
  loaded: false,
  collection: "",
  questions: [{
    emoji: "",
    EN:"",
    answer:"",
    result:""
  }],
  currentQuestion: 0

};
export default function gameReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_ANSWER':
      return {
        ...state,
        questions: state.questions.map(
          (question, i) => i === action.payload.index ? {...question, answer: action.payload.answer, result: action.payload.result}
                                  : question
      )
      };
    case 'NEXT_QUESTION':
      return {
        ...state,
        currentQuestion: state.currentQuestion+1
      };
    case 'NEW_GAME':
      return {
        ...state,
        collection: action.payload.collection,
        questions: action.payload.questions,
        currentQuestion: 0
      };
    default:
      return state;
  }
}