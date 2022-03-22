
import { Card, CardContent, Grid, styled, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import emojis from '../utils/emojis.json';
import { newGame } from "../redux/actions/gameActions";

const CardWrapper = styled(Card)(() => ({
    cursor: 'pointer'
  }));

const AnswerCard = (props) =>{
    let emoji = props.collection[1][Math.floor(Math.random()*props.collection[1].length)].emoji
    return <CardWrapper sx={{ minWidth: 200 }} onClick={props.onClick} elevation={4}>
                <CardContent>
                    <Typography variant="h1">{emoji}</Typography>
                    <Typography variant="h5">{props.collection[0].toUpperCase()}</Typography>
                </CardContent>
            </CardWrapper>
}

const Intro = (props) =>{
    const dispatch = useDispatch()

    return <Grid container gap={5} alignItems="center" justifyContent="center" flexDirection="column" style={{padding:'20px'}}>
                <Typography variant="h1">Emojilingo✨</Typography>
                <Grid container gap={5} alignItems="center" justifyContent="center">
                    {Object.entries(emojis).map((collection)=>
                        <AnswerCard key={collection[0]} collection={collection} onClick={()=>dispatch(newGame(collection[0]))}/>
                        )}
                </Grid>
            </Grid>
}
export default Intro;