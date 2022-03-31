//import { useEffect } from 'react';
import { useEffect, useState } from 'react';
import './App.css';
import Game from './components/Game';
import { loadVoicesWhenAvailable } from './utils/utils';
import cacheBuster from './utils/cacheBuster';
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

  useEffect(() =>  {
    cacheBuster()
  },[])

  const [voiceReady, setVoiceReady] = useState(false)

  useEffect(() => {
    loadVoicesWhenAvailable(()=>setVoiceReady(true))
  }, []);

  return (
    <div className="App">
      <Game voiceReady={voiceReady} />
    </div>
  );
}

export default App;
