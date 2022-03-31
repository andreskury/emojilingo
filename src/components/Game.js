import Board from "./Board";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading";
import Scoreboard from "./Scoreboard";
import Intro from "./Intro";
import Category from "./Category";
import { imgCacheReady } from "../redux/actions/gameActions";
import Language from "./Language";

const Game = (props) =>{
    const game = useSelector((state)=>state.game)
    const dispatch = useDispatch()

    useEffect(()=>{
        if(game.collection !== '' && !game.imgCacheReady){
            const cacheImages = async () =>{
                try {
                const promises = await game.questions.map((question) =>
                    new Promise(function(resolve, reject){
                        const hex = question.emoji && question.emoji.codePointAt(0).toString(16)
                        if(hex){
                            const img = new Image()
                            img.src = `https://emojiapi.dev/api/v1/${hex}.svg`;
                            img.onload = () => resolve();
                            img.onerror = () => reject();
                        }else{
                            reject();
                        }
                    })
                )
                await Promise.all(promises)
                dispatch(imgCacheReady())
                } catch(e) {
                    console.log(e);
                }
            }
            cacheImages()
        }
    },[dispatch, game])
    return <>
        {game?.language ? 
            game?.imgCacheReady ? 
                game?.currentQuestion >= game?.questions.length ? 
                    <Scoreboard/> :
                    game?.startGame ? 
                        <Board game={game}/> :
                        <Intro collection={game.collection}/> : 
                    game.collection || !props.voiceReady ?
                <Loading/> : 
            <Category/> :
        <Language/>}
        
    </>
}
export default Game;