
import { Card, CardContent, Grid, styled, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import emojis from '../utils/emojis.json';
import wording from '../utils/wording.json';
import { newGame } from "../redux/actions/gameActions";
import { useEffect } from "react";
import { playByText } from "../utils/utils";

const CardWrapper = styled(Card)(() => ({
    cursor: 'pointer',
    borderRadius: 50
}));

const Title = styled(Typography)(() => ({
    background: 'linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)',
    backgroundSize: '400% 400%',
    animation: 'gradient 15s ease infinite',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontWeight: 700
}));

const AnswerCard = (props) => {
    let emoji = props.emoji[Math.floor(Math.random() * props.emoji.length)].emoji
    return <CardWrapper sx={{ minWidth: 200 }} onClick={props.onClick} elevation={4}>
        <CardContent>
            <Typography variant="h1">{emoji}</Typography>
            <Typography variant="h5">{props.name.toUpperCase()}</Typography>
        </CardContent>
    </CardWrapper>
}

const Category = (props) => {
    const dispatch = useDispatch()
    const game = useSelector((state)=>state.game)
    useEffect(()=>{
        playByText(game?.locale, wording[game?.language].welcome)
    },[game?.language, game?.locale, game?.voice])
    return <Grid container gap={5} alignItems="center" justifyContent="center" flexDirection="column" style={{ padding: '20px' }}>
        <Title variant="h3" style={{ maxWidth: '100vw' }}>{wording[game?.language].category}</Title>
        <Grid container gap={5} alignItems="center" justifyContent="center">
            {Object.entries(emojis).map((collection) =>
                <AnswerCard key={collection[0]} name={wording[game?.language][collection[0]]} emoji={collection[1]} onClick={() => dispatch(newGame(collection[0]))} />
            )}
        </Grid>
    </Grid>
}
export default Category;