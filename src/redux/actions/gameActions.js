//import { SHOW_LOADING, HIDE_LOADING } from "./types";
import emojis from '../../utils/emojis.json';
import { getRandom } from '../../utils/utils';

export const nextQuestion = () => ({
  type: 'NEXT_QUESTION'
});

export const addAnswer = ({ index, answer, result }) => ({
  type: 'ADD_ANSWER',
  payload: { index, answer, result }
});

export const newGame = (collection) => dispatch => {
  const questions = getRandom({ collection: emojis[collection] });
  dispatch({
    type: 'NEW_GAME',
    payload: { collection, questions }
  })
};

export const imgCacheReady = () => ({
  type: 'IMG_CACHE_READY',
});

export const setLanguage = (language) => ({
  type: 'SET_LANGUAGE',
  payload: language
});

export const startGame = () => ({
  type: 'START_GAME',
});

export const resetGame = () => ({
  type: 'RESET_GAME'
});