import PropTypes from 'prop-types';
import { React } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Card, CardContent, Grid, styled, Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { setLanguage } from '../redux/actions/gameActions';
import ExpandGrid from './ExpandGrid';

const languages = [
  {
    language: 'EN',
    locale: 'en-US',
    title: 'Learn English',
    emoji: '🇬🇧',
  },
  {
    language: 'ES',
    locale: 'es-MX',
    title: 'Aprender Español',
    emoji: '🇪🇸',
  },
  {
    language: 'IT',
    locale: 'it-IT',
    title: "Impara l'italiano",
    emoji: '🇮🇹',
  },
  {
    language: 'FR',
    locale: 'fr-FR',
    title: 'Apprends le français',
    emoji: '🇫🇷',
  },
  {
    language: 'DE',
    locale: 'de-DE',
    title: 'Lerne Deutsch',
    emoji: '🇩🇪',
  },
  {
    language: 'PT',
    locale: 'pt-PT',
    title: 'Aprenda português',
    emoji: '🇵🇹',
  },
];

const CardWrapper = styled(Card)(() => ({
  cursor: 'pointer',
  borderRadius: 50,
}));

const TitleWrapper = styled(Typography)(() => ({
  fontSize: '8vw',
  maxWidth: '100vw',
  '@media (max-width: 600px)': {
    fontSize: '12vw',
  },
}));
const Title = styled('span')(() => ({
  background: 'linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)',
  backgroundSize: '400% 400%',
  animation: 'gradient 15s ease infinite',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: 700,
}));

function AnswerCard({ onClick, emoji, title }) {
  return (
    <CardWrapper sx={{ minWidth: 160 }} onClick={onClick} elevation={4}>
      <CardContent>
        <Typography variant="h2">{emoji}</Typography>
        <Typography variant="body1">{title}</Typography>
      </CardContent>
    </CardWrapper>
  );
}

function Language() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const show = useSelector((state) => state.loading.show);

  return (
    !show
    && (
    <Grid container gap={5} alignItems="center" justifyContent="center" flexDirection="column" style={{ padding: '20px' }}>
      <TitleWrapper variant="h3" className="text-expand">
        <Title>Emojilingo</Title>
        ✨
      </TitleWrapper>
      <ExpandGrid container item gap={5} alignItems="center" justifyContent="center" flexDirection="row" style={{ maxHeight: '75vh' }}>
        {languages.map((l) => <AnswerCard key={l.language} emoji={l.emoji} title={l.title} onClick={() => dispatch(setLanguage({ language: l.language, locale: l.locale }, navigate))} />)}
      </ExpandGrid>
    </Grid>
    )
  );
}
AnswerCard.propTypes = {
  title: PropTypes.string.isRequired,
  emoji: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
export default Language;
