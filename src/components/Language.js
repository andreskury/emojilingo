
import { Card, CardContent, Grid, styled, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { setLanguage } from "../redux/actions/gameActions";

const languages = [
    {
        language: 'EN',
        locale: 'en-US',
        title: 'Learn English',
        icon: '🇬🇧',
    },
    {
        language: 'ES',
        locale: 'es-MX',
        title: 'Aprender Español',
        icon: '🇪🇸',
    },
    {
        language: 'IT',
        locale: 'it-IT',
        title: "Impara l'italiano",
        icon: '🇮🇹',
    },
    {
        language: 'FR',
        locale: 'fr-FR',
        title: 'Apprends le français',
        icon: '🇫🇷',
    },
    {
        language: 'DE',
        locale: 'de-DE',
        title: 'Lerne Deutsch',
        icon: '🇩🇪',
    },
    {
        language: 'PT',
        locale: 'pt-PT',
        title: 'Aprenda português',
        icon: '🇵🇹',
    }
]

const CardWrapper = styled(Card)(() => ({
    cursor: 'pointer',
    borderRadius: 50
}));

const Title = styled('span')(() => ({
    background: 'linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)',
    backgroundSize: '400% 400%',
    animation: 'gradient 15s ease infinite',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontWeight: 700
}));

const AnswerCard = (props) => {
    return <CardWrapper sx={{ minWidth: 160 }} onClick={props.onClick} elevation={4}>
        <CardContent>
            <Typography variant="h2">{props.language.icon}</Typography>
            <Typography variant="body1">{props.language.title}</Typography>
        </CardContent>
    </CardWrapper>
}

const Language = (props) => {
    const dispatch = useDispatch()
    return <Grid container gap={5} alignItems="center" justifyContent="center" flexDirection="column" style={{ padding: '20px' }}>
        <Typography variant="h3" style={{ maxWidth: '100vw' }}><Title>Emojilingo</Title>✨</Typography>
        <Grid container item gap={5} alignItems="center" justifyContent="center" flexDirection="row" style={{maxHeight: '75vh'}}>
            {languages.map((l) =>
                <AnswerCard key={l.language} language={l} onClick={() => dispatch(setLanguage({language: l.language, locale: l.locale}))} />
            )}
        </Grid>
    </Grid>
}
export default Language;