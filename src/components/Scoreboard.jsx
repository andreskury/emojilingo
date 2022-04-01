import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import {
  Button, Grid, styled, Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetGame } from '../redux/actions/gameActions';
import wording from '../utils/wording.json';

const ImageWrapper = styled('img')(() => ({
  width: '50%',
}));

const Container = styled(Grid)(() => ({
  padding: '20px',
  height: 'fit-content',
  minHeight: '100vh',
}));

const RoundBtn = styled(Button)(() => ({
  width: '100px',
  height: '100px',
  borderRadius: 100,
  fontWeight: 400,
  fontSize: '4rem',
  background: 'linear-gradient( 134.6deg,  #24C6DC 15.4%, #514A9D 74.7% )',
  backgroundSize: '400% 400%',
  animation: 'gradient 15s ease infinite',
}));

const Title = styled(Typography)(() => ({
  background: 'linear-gradient( 134.6deg,  #40e0d0, #ff8c00, #ff0080 )',
  backgroundSize: '400% 400%',
  animation: 'gradient 15s ease infinite',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: 700,
}));

function AnswerCard({
  emoji, result, answer, question,
}) {
  const hex = emoji.codePointAt(0).toString(16);
  return (
    <div>
      <ImageWrapper src={`https://emojiapi.dev/api/v1/${hex}.svg`} alt={emoji} />
      {result === 'incorrect' && (
      <Typography>
        <span style={{ textDecoration: 'line-through' }}>
          {`${answer}`}
          {' '}
        </span>
        ❌
      </Typography>
      )}
      <Typography>
        {question}
        {' '}
        {result === 'correct' && <span>✔️</span>}
      </Typography>

    </div>
  );
}

function Scoreboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const game = useSelector((state) => state.game);
  const score = game.questions.filter((q) => q.result === 'correct').length;

  useEffect(() => {
    if (game?.questions.length === 0) { dispatch(resetGame(navigate)); }
  }, [dispatch, game?.questions, navigate]);

  return (
    game?.questions.length > 0 && (
    <Container container gap={5} alignItems="center" justifyContent="space-evenly" flexDirection="column">
      {score === game.questions.length
        ? <Title variant="h3">{wording[game?.language].congratulations}</Title>
        : <Title variant="h3">{`${wording[game?.language].correct_answers}: ${score}/${game.questions.length}`}</Title>}
      <RoundBtn variant="contained" color="info" size="large" onClick={() => dispatch(resetGame(navigate))}>↺</RoundBtn>
      <Grid container gap={5} alignItems="center" justifyContent="center">
        {game.questions.map((question) => <AnswerCard key={question.emoji} emoji={question.emoji} result={question.result} answer={question.answer} question={question[game?.language].toUpperCase()} />)}
      </Grid>
    </Container>
    )
  );
}
AnswerCard.propTypes = {
  emoji: PropTypes.string.isRequired,
  result: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
};
export default Scoreboard;
