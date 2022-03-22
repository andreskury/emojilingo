
import { Button, Card, CardContent, Grid, styled, Typography } from "@mui/material";
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
                    <Typography>{props.question.EN.toUpperCase()}</Typography>
                </CardContent>
            </CardWrapper>
}

const Intro = (props) =>{
    const game = useSelector((state)=>state.game)
    return <Grid container gap={5} alignItems="center" justifyContent="center" flexDirection="row" style={{padding:'20px'}}>
                <Typography variant="h2">{props.collection.toUpperCase()}</Typography>
                <Button variant="contained" color="success" size="large" style={{width:200}} onClick={()=>props.setStartGame(true)}>Go!</Button>
                <Grid container gap={5} alignItems="center" justifyContent="center">
                    {game.questions.map((question)=>
                        <AnswerCard key={question.emoji} question={question}/>
                        )}
                </Grid>
            </Grid>
}
export default Intro;