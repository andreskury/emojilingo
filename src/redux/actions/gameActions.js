//import { SHOW_LOADING, HIDE_LOADING } from "./types";
import emojis from '../../utils/emojis.json';
import { getRandom } from '../../utils/utils';

export const nextQuestion = () => ({
  type: 'NEXT_QUESTION'
});

export const addAnswer = ({index, answer, result}) => ({
  type: 'ADD_ANSWER',
  payload: {index, answer, result}
});

export const newGame = (collection) => dispatch => {
    const questions = getRandom({collection: emojis[collection]});
    dispatch({
        type: 'NEW_GAME',
        payload: { collection, questions }
    })
};