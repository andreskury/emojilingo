import {
  ADD_ANSWER, IMG_CACHE_READY, NEW_GAME, NEXT_QUESTION, RESET_GAME, SET_LANGUAGE, START_GAME,
} from '../actions/types';

const initialState = {
  loaded: false,
  startGame: false,
  imgCacheReady: false,
  collection: '',
  language: '',
  locale: '',
  questions: [],
  currentQuestion: 0,

};
export default function gameReducer(state = initialState, action = {}) {
  switch (action.type) {
    case ADD_ANSWER:
      return {
        ...state,
        questions: state.questions.map(
          (question, i) => (i === action.payload.index ? { ...question, answer: action.payload.answer, result: action.payload.result }
            : question),
        ),
      };
    case NEXT_QUESTION:
      return {
        ...state,
        currentQuestion: state.currentQuestion + 1,
      };
    case START_GAME:
      return {
        ...state,
        startGame: true,
      };
    case NEW_GAME:
      return {
        ...state,
        collection: action.payload.collection,
        questions: action.payload.questions,
        currentQuestion: 0,
        imgCacheReady: false,
      };
    case IMG_CACHE_READY:
      return {
        ...state,
        imgCacheReady: true,
      };
    case SET_LANGUAGE:
      return {
        ...state,
        language: action.payload.language,
        locale: action.payload.locale,
      };
    case RESET_GAME:
      return initialState;
    default:
      return state;
  }
}
