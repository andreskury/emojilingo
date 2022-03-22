import Board from "./Board";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "./Loading";
import Scoreboard from "./Scoreboard";
import Intro from "./Intro";
import Picker from "./Picker";

const Game = () =>{
    const game = useSelector((state)=>state.game)
    const [imgCacheReady, setImgCacheReady] = useState(false)
    const [startGame, setStartGame] = useState(false)

    useEffect(()=>{
        if(game.collection !== '' && !imgCacheReady){
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
                setImgCacheReady(true)
                } catch(e) {
                    console.log(e);
                }
            }
            cacheImages()
        }
    },[game, imgCacheReady])
    return <>
        {imgCacheReady ? <>{
            game?.currentQuestion >= game?.questions.length ? <Scoreboard/> :
            startGame ? <Board game={game}/> : <Intro setStartGame={setStartGame} collection={game.collection}/>
            }</> : game.collection ? <Loading/> : <Picker/>}
        
    </>
}
export default Game;