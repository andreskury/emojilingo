import emojis from '../../utils/emojis.json';
import { getRandom } from '../../utils/utils';
import {
  ADD_ANSWER, IMG_CACHE_READY, NEW_GAME, NEXT_QUESTION, RESET_GAME, SET_LANGUAGE, SHOW_LOADING, START_GAME,
} from './types';

export const nextQuestion = () => ({
  type: NEXT_QUESTION,
});

export const addAnswer = ({ index, answer, result }) => ({
  type: ADD_ANSWER,
  payload: { index, answer, result },
});

export const newGame = (collection, navigate) => (dispatch) => {
  const questions = getRandom({ collection: emojis[collection] });
  dispatch({
    type: SHOW_LOADING,
  });
  dispatch({
    type: NEW_GAME,
    payload: { collection, questions },
  });
  navigate('/intro');
};

export const imgCacheReady = () => ({
  type: IMG_CACHE_READY,
});

export const setLanguage = (language, navigate) => (dispatch) => {
  dispatch({
    type: SET_LANGUAGE,
    payload: language,
  });
  navigate('/category');
};

export const startGame = (navigate) => (dispatch) => {
  dispatch({
    type: START_GAME,
  });
  navigate('/board');
};

export const resetGame = (navigate) => (dispatch) => {
  dispatch({
    type: RESET_GAME,
  });
  navigate('/');
};
