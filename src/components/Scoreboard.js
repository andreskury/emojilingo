
import { Card, CardContent, Grid, styled, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const ImageWrapper = styled('img')(() => ({
    width: '50%'
  }));

  const CardWrapper = styled(Card)((props) => ({
    //backgroundColor: props.question === 'correct' ? 'green' : 'red'
  }));

const AnswerCard = (props) =>{
    let hex = props.question.emoji && props.question.emoji.codePointAt(0).toString(16)
    return <CardWrapper sx={{ minWidth: 100 }} elevation={4}>
                <CardContent>
                <ImageWrapper src={`https://emojiapi.dev/api/v1/${hex}.svg`} alt={props.question.emoji}/>
                    {props.question.result === 'incorrect' && <Typography><span style={{textDecoration: 'line-through'}}>{`${props.question.answer}`} </span>❌</Typography>}
                    <Typography>{props.question.EN.toUpperCase()} {props.question.result === 'correct' && <span>✔️</span>}</Typography>
                </CardContent>
            </CardWrapper>
}

const Scoreboard = () =>{
    const game = useSelector((state)=>state.game)
    const score = game.questions.filter((q) => q.result === 'correct').length
    return <Grid container gap={5} alignItems="center" justifyContent="center">
                {score === game.questions.length ? 
                <Typography variant="h2">All correct! Awesome! 🤘</Typography>:
                <Typography variant="h2">{`Correct answers: ${score}/${game.questions.length}`}</Typography>}
                <Grid container gap={5} alignItems="center" justifyContent="center">
                    {game.questions.map((question)=>
                        <AnswerCard key={question.emoji} question={question}/>
                        )}
                </Grid>
            </Grid>
}
export default Scoreboard;