
import { styled } from "@mui/material";
import {  useSelector } from "react-redux";

  const ImageWrapper = styled('img')(() => ({
    width: '50vh'
  }));
  
  const PieceWrapper = styled('div')((props) => ({
    position: 'fixed',
    left: props.position === 'right' ? '2000px' : props.position === 'left' ? '-2000px' : 0,
    opacity: props.position === 'center' ? '1' : 0,
    right: 0,
    margin: 'auto',
    transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)'
  }));

  const Piece = (props) =>{
    const currentQuestion = useSelector((state)=>state.game.currentQuestion)
    let hex = props.data.emoji && props.data.emoji.codePointAt(0).toString(16)
    
    return <PieceWrapper position={currentQuestion > props.index ? "right" : currentQuestion < props.index ? "left" : "center"}>
      <ImageWrapper src={`https://emojiapi.dev/api/v1/${hex}.svg`} alt={props.data.emoji}/>
    </PieceWrapper>
}

export default Piece;