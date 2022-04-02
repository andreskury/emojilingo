import PropTypes from 'prop-types';
import {
  Button, Grid, styled, Typography,
} from '@mui/material';
import { React, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetGame, startGame } from '../redux/actions/gameActions';
import { playByText } from '../utils/utils';
import wording from '../utils/wording.json';
import ExpandGrid from './ExpandGrid';

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
  fontWeight: 700,
  fontSize: '2rem',
  background: 'linear-gradient( 134.6deg,  #1D976C 15.4%, #93F9B9 74.7% )',
  backgroundSize: '400% 400%',
  animation: 'gradient 15s ease infinite',
}));

const Title = styled(Typography)(() => ({
  background: 'linear-gradient( 134.6deg,  #16A085 15.4%, #F4D03F 74.7% )',
  backgroundSize: '400% 400%',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: 700,
}));

function AnswerCard({ emoji, name }) {
  const hex = emoji && emoji.codePointAt(0).toString(16);
  return (
    <div>
      <ImageWrapper src={`https://emojiapi.dev/api/v1/${hex}.svg`} alt={emoji} />
      <Typography>{name.toUpperCase()}</Typography>
    </div>
  );
}

function Intro() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const game = useSelector((state) => state.game);

  useEffect(() => {
    if (game?.collection === '') { dispatch(resetGame(navigate)); } else {
      playByText(game?.locale, `${wording[game?.language][game?.collection]}`);
    }
  }, [game?.language, game?.locale, game?.voice, game?.collection]);

  return (
    game?.collection && game?.imgCacheReady && (
    <Container container gap={5} alignItems="center" justifyContent="space-evenly" wrap="nowrap" flexDirection="column">
      <Title variant="h3" className="gradient-text-expand">{wording[game?.language][game?.collection].toUpperCase()}</Title>
      <RoundBtn variant="contained" color="success" size="large" onClick={() => dispatch(startGame(navigate))}>Go!</RoundBtn>
      <ExpandGrid container gap={5} alignItems="center" justifyContent="center">
        {game.questions.map((question) => <AnswerCard key={question.emoji} name={question[game.language]} emoji={question.emoji} />)}
      </ExpandGrid>
    </Container>
    )
  );
}
AnswerCard.propTypes = {
  name: PropTypes.string.isRequired,
  emoji: PropTypes.string.isRequired,
};
export default Intro;
