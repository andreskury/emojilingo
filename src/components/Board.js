import { Grid, styled } from '@mui/material';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addAnswer, nextQuestion} from '../redux/actions/gameActions';
import Piece from './Piece';

const InputWrapper = styled('input')((props) => ({
    fontSize: "4rem",
    position: "fixed",
    textAlign: "center",
    backgroundColor: "transparent",
    outline: "0",
    lineHeight: '4',
    border: "0",
    caretColor: "transparent",
    textShadow: "0px 0px 17px #000",
    color: props.status === "error" ? "red" : props.status === "success" ? "green" : "white",
    transform: props.status ? "scale(2)" : "scale(1)",
    userSelect: "none",
    fontFamily: "Nunito",
    transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
  }));
const PieceWrapper = styled('div')(() => ({
    height: '50vh',
    width: '100vw',
}));

const Board = (props) =>{

    const inputRef = useRef(null)
    const [pieceInput, setPieceInput] = useState("")
    const [status, setStatus] = useState(undefined)
    const [disableEnter, setDisableEnter] = useState(false)
    const dispatch = useDispatch();

    const formSubmit = useCallback( (e) => {
        let result
        if(pieceInput  && !disableEnter){
            setDisableEnter(true);
            if(pieceInput.toLowerCase() === props.game?.questions[props.game?.currentQuestion].EN.toLowerCase()){
                setStatus('success')
                result="correct"
            }else{
                setStatus('error')
                result="incorrect"
            }
            setTimeout(() => {
                dispatch(nextQuestion())
                setStatus(undefined)
                dispatch(addAnswer({index:props.game?.currentQuestion, result, answer:pieceInput}))
                setPieceInput('')
                setDisableEnter(false)
            }, 300);
        }
    },[disableEnter, dispatch, pieceInput, props.game?.currentQuestion, props.game?.questions])

    useEffect(()=>{
        const handleSubmit = (e) => {
            let charCode = e.keyCode;
            if (e.key === 'Enter'){
                formSubmit()
            }else if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode === 32){
                setPieceInput(`${pieceInput}${e.key}`.toUpperCase())
            }else if (charCode === 8){
                setPieceInput(pieceInput.substring(0, pieceInput.length - 1))
            }
        }
          
          document.addEventListener("keydown", handleSubmit, false);
          return () => document.removeEventListener("keydown",handleSubmit);
    },[dispatch, formSubmit, pieceInput, props.game.currentQuestion, props.game.questions]);

    
    return <>
        {}
        <Grid container direction="column" justifyContent="center" alignContent="center" alignItems="center" style={{position: 'fixed',width: '100vw',height: '100vh'}}>
            <PieceWrapper>
                {props.game?.questions && props.game?.questions.map((question, index) =>
                    <Piece key={question.emoji} index={index} data={question}/>
                )}
            </PieceWrapper>
        <InputWrapper autoFocus={true} value={pieceInput} onChange={()=>false} onBlur={formSubmit} ref={inputRef} status={status} />
        </Grid>
    </>
}

export default Board;