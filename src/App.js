//import { useEffect } from 'react';
import './App.css';
import Game from './components/Game';
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

   //useEffect(() =>  {
  //   getUsers()
  
   //},[])

  return (
    <div className="App">
      <Game/>
    </div>
  );
}

export default App;
