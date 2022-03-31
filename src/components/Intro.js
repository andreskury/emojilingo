
import { Button, Grid, styled, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startGame } from "../redux/actions/gameActions";
import { playByText } from "../utils/utils";
import wording from '../utils/wording.json';

const ImageWrapper = styled('img')(() => ({
    width: '50%'
}));

const Container = styled(Grid)(() => ({
    padding: '20px',
    height: 'fit-content',
    minHeight: '100vh'
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
    animation: 'gradient 15s ease infinite',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontWeight: 700
}));

const AnswerCard = (props) => {
    let hex = props.emoji && props.emoji.codePointAt(0).toString(16)
    return <div>
        <ImageWrapper src={`https://emojiapi.dev/api/v1/${hex}.svg`} alt={props.emoji} />
        <Typography>{props.name.toUpperCase()}</Typography>
    </div>
}

const Intro = (props) => {
    const game = useSelector((state) => state.game)
    const dispatch = useDispatch();

    useEffect(()=>{
        playByText(game?.locale, `${wording[game?.language][props.collection]}`)
    },[game?.language, game?.locale, game?.voice, props.collection])

    return <Container container gap={5} alignItems="center" justifyContent="space-evenly" flexDirection="column" >
        <Title variant="h3">{wording[game?.language][props.collection].toUpperCase()}</Title>
        <RoundBtn variant="contained" color="success" size="large" onClick={() => dispatch(startGame())}>Go!</RoundBtn>
        <Grid container gap={5} alignItems="center" justifyContent="center">
            {game.questions.map((question) =>
                <AnswerCard key={question.emoji} name={question[game.language]} emoji={question.emoji} />
            )}
        </Grid>
    </Container>
}
export default Intro;