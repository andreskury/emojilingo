import { React, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import Game from './components/Game';
import Loading from './components/Loading';
import { loadVoicesWhenAvailable } from './utils/utils';
import cacheBuster from './utils/cacheBuster';
import { hideLoading } from './redux/actions/loadingActions';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    cacheBuster();
    loadVoicesWhenAvailable(() => dispatch(hideLoading()));
  }, []);

  return (
    <div className="App">
      <Game />
      <Loading />
    </div>
  );
}

export default App;
