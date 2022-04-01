import PropTypes from 'prop-types';
import { React, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Card, CardContent, Grid, styled, Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import emojis from '../utils/emojis.json';
import wording from '../utils/wording.json';
import { newGame, resetGame } from '../redux/actions/gameActions';
import { playByText } from '../utils/utils';

const CardWrapper = styled(Card)(() => ({
  cursor: 'pointer',
  borderRadius: 50,
}));

const Title = styled(Typography)(() => ({
  background: 'linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)',
  backgroundSize: '400% 400%',
  animation: 'gradient 15s ease infinite',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: 700,
}));

function AnswerCard({ name, emoji, onClick }) {
  return (
    <CardWrapper sx={{ minWidth: 200 }} onClick={onClick} elevation={4}>
      <CardContent>
        <Typography variant="h1">{emoji}</Typography>
        <Typography variant="h5">{name.toUpperCase()}</Typography>
      </CardContent>
    </CardWrapper>
  );
}

function Category() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const game = useSelector((state) => state.game);

  useEffect(() => {
    if (game?.language === '') { dispatch(resetGame(navigate)); } else {
      playByText(game?.locale, wording[game?.language]?.welcome);
    }
  }, [game?.language, game?.locale, game?.voice]);

  return (
    game?.language && (
    <Grid container gap={5} alignItems="center" justifyContent="center" flexDirection="column" style={{ padding: '20px' }}>
      <Title variant="h3" style={{ maxWidth: '100vw' }}>{wording[game?.language]?.category}</Title>
      <Grid container gap={5} alignItems="center" justifyContent="center">
        {Object.entries(emojis).map((collection) => {
          const rndEmoji = collection[1][Math.floor(Math.random() * collection[1].length)];
          return <AnswerCard key={collection[0]} name={wording[game?.language]?.[collection[0]]} emoji={rndEmoji.emoji} onClick={() => dispatch(newGame(collection[0], navigate))} />;
        })}
      </Grid>
    </Grid>
    )
  );
}
AnswerCard.propTypes = {
  name: PropTypes.string.isRequired,
  emoji: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
export default Category;