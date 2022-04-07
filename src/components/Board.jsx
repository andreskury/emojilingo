import PropTypes from 'prop-types';
import {
  React, useCallback, useEffect, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { addAnswer, nextQuestion, resetGame } from '../redux/actions/gameActions';
import { playByText } from '../utils/utils';
import Piece from './Piece';

const InputWrapper = styled('input')(({ status }) => {
  let color;
  if (status === 'error') {
    color = 'red';
  } else if (status === 'success') {
    color = 'green';
  } else {
    color = 'white';
  }
  return ({
    fontSize: '4rem',
    position: 'fixed',
    textAlign: 'center',
    backgroundColor: 'transparent',
    outline: '0',
    lineHeight: '4',
    border: '0',
    caretColor: 'transparent',
    textShadow: '0px 0px 17px #000',
    color,
    transform: status ? 'scale(2)' : 'scale(1)',
    fontFamily: 'Nunito',
    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
    '&::selection': {
      background: 'transparent',
    },
  });
});
const PieceWrapper = styled('div')(() => ({
  height: '50vh',
  width: '100vw',
}));
/**
 * Contains all the pieces and the text input
 * @component
 * @return {React.ElementType} Board
 */
function Board() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const game = useSelector((state) => state.game);
  const [pieceInput, setPieceInput] = useState('');
  const [status, setStatus] = useState(undefined);
  const [disableEnter, setDisableEnter] = useState(false);

  useEffect(() => {
    if (game?.questions.length === 0) { dispatch(resetGame(navigate)); }
  }, [dispatch, game?.questions, navigate]);

  const formSubmit = useCallback(() => {
    let result;
    if (pieceInput && !disableEnter) {
      setDisableEnter(true);
      if (pieceInput.toLowerCase() === game?.questions[game?.currentQuestion]?.[game?.language].toLowerCase()) {
        setTimeout(() => playByText(game?.locale, pieceInput.toLowerCase()), 300);
        setStatus('success');
        new Audio('/beep1.mp3').play();
        result = 'correct';
      } else {
        setStatus('error');
        new Audio('/beep2.mp3').play();
        result = 'incorrect';
      }
      setTimeout(() => {
        dispatch(addAnswer({ index: game?.currentQuestion, result, answer: pieceInput }));
        setStatus(undefined);
        setPieceInput('');
        setDisableEnter(false);
        dispatch(nextQuestion());
      }, 300);
    }
  }, [disableEnter, dispatch, pieceInput, game?.currentQuestion, game?.language, game?.locale, game?.questions]);

  const handleSubmit = (e) => {
    if (e.key === 'Enter') formSubmit();
  };

  return (
    game?.questions.length > 0 && (
      <Grid container direction="column" justifyContent="center" alignContent="center" alignItems="center" style={{ position: 'fixed', width: '100vw', height: '100vh' }}>
        <PieceWrapper>
          {game?.questions && game?.questions.map((question, index) => <Piece key={question.emoji} index={index} emoji={question.emoji} />)}
        </PieceWrapper>
        <InputWrapper autoFocus value={pieceInput} onChange={(e) => { setPieceInput(e.target.value); }} onKeyDown={handleSubmit} status={status} />
      </Grid>
    )
  );
}

InputWrapper.propTypes = {
  status: PropTypes.string,
};
export default Board;
