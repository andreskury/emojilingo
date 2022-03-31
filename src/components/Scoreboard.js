
import { Button, Grid, styled, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { resetGame } from "../redux/actions/gameActions";
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
    fontWeight: 700
}));

const AnswerCard = (props) => {
    let hex = props.emoji && props.emoji.codePointAt(0).toString(16)
    return <div >
        <ImageWrapper src={`https://emojiapi.dev/api/v1/${hex}.svg`} alt={props.emoji} />
        {props.result === 'incorrect' && <Typography><span style={{ textDecoration: 'line-through' }}>{`${props.answer}`} </span>❌</Typography>}
        <Typography>{props.question} {props.result === 'correct' && <span>✔️</span>}</Typography>

    </div>
}

const Scoreboard = () => {
    const game = useSelector((state) => state.game)
    const dispatch = useDispatch();
    const score = game.questions.filter((q) => q.result === 'correct').length
    return <Container container gap={5} alignItems="center" justifyContent="space-evenly" flexDirection="column">
        {score === game.questions.length ?
            <Title variant="h3">{wording[game?.language].congratulations}</Title> :
            <Title variant="h3">{`${wording[game?.language].correct_answers}: ${score}/${game.questions.length}`}</Title>}
        <RoundBtn variant="contained" color="info" size="large" onClick={() => dispatch(resetGame())}>↺</RoundBtn>
        <Grid container gap={5} alignItems="center" justifyContent="center">
            {game.questions.map((question) =>
                <AnswerCard key={question.emoji} emoji={question.emoji} result={question.result} answer={question.answer} question={question[game?.language].toUpperCase()} />
            )}
        </Grid>
    </Container>
}
export default Scoreboard;