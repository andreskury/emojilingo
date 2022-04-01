// import { useEffect } from 'react';
import { React, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import Game from './components/Game';
import Loading from './components/Loading';
import { loadVoicesWhenAvailable } from './utils/utils';
import cacheBuster from './utils/cacheBuster';
import { hideLoading } from './redux/actions/loadingActions';
// import { collection, getDocs } from 'firebase/firestore/lite';
// import { useEffect } from 'react';
// import { db } from './utils/firebase';

function App() {
  // async function getUsers() {
  //   const users =  await getDocs(collection(db, "users"));
  //   users.forEach((doc) => {
  //     console.log(doc.id, doc.data());
  //   })
  // }
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
