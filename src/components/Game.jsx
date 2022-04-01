import { React, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Board from './Board';
// import Loading from './Loading';
import Scoreboard from './Scoreboard';
import Intro from './Intro';
import Category from './Category';
import { imgCacheReady } from '../redux/actions/gameActions';
import Language from './Language';
import { hideLoading } from '../redux/actions/loadingActions';

function Game() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const game = useSelector((state) => state.game);

  useEffect(() => {
    if (game.collection !== '' && !game.imgCacheReady) {
      const cacheImages = async () => {
        try {
          const promises = await game.questions.map((question) => new Promise((resolve, reject) => {
            const hex = question.emoji && question.emoji.codePointAt(0).toString(16);
            if (hex) {
              const img = new Image();
              img.src = `https://emojiapi.dev/api/v1/${hex}.svg`;
              img.onload = () => resolve();
              img.onerror = () => reject();
            } else {
              reject();
            }
          }));
          await Promise.all(promises);
          dispatch(imgCacheReady());
          dispatch(hideLoading());
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error(e);
        }
      };
      cacheImages();
    }
  }, [dispatch, game]);
  useEffect(() => {
    if (game?.questions.length > 0 && game?.currentQuestion >= game?.questions.length) navigate('/scoreboard');
  }, [game?.currentQuestion, game?.questions]);
  return (
    <>
      <Routes>
        <Route index element={<Language />} />
        <Route path="category" element={<Category />} />
        <Route path="intro" element={<Intro />} />
        <Route path="board" element={<Board />} />
        <Route path="scoreboard" element={<Scoreboard />} />
      </Routes>
      {/* {game?.language
        ? game?.imgCacheReady
          ? game?.currentQuestion >= game?.questions.length
            ? <Scoreboard />
            : game?.startGame
              ? <Board />
              : <Intro collection={game.collection} />
          : game.collection || !props.voiceReady
            ? <Loading />
            : <Category />
        : <Language />} */}

    </>
  );
}
export default Game;
