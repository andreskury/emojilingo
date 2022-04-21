import { React, useEffect, useState } from 'react';
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

  const queryParams = new URLSearchParams(window.location.search);
  const test = queryParams.get('test');
  const [url, setUrl] = useState('');
  const [show, setShow] = useState(false);
  const submitFetch = (e) => {
    e.preventDefault();
    setShow(true);
  };
  return (
    test ? (
      <div>
        <form onSubmit={submitFetch}>
          <input onChange={(e) => setUrl(e.target.value)} />
        </form>
        {show && <iframe width="100%" height="1000px" title="iframe" src={url} />}
      </div>
    )
      : (
        <div className="App">
          <Game />
          <Loading />
        </div>
      )

  );
}

export default App;
