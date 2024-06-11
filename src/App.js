// App.js
import React, { useState } from 'react';
import './App.css';
import Play from './Play';
import Menu from './Menu';
import Top from './Top';

const App = () => {
  const [page, setPage] = useState(0)
  const [puzzle, setPuzzle] = useState(0);
  const [best, setBest] = useState(77);
  const [user, setUser] = useState(1001);
 
  
  const handlePage = (pageId, uid, puz, score) => {
    console.log("Page & puzzle = ", pageId, puz)
    setPuzzle(puz)
    setBest(score)
    setUser(uid)
    setPage(pageId)
  }



  return (
    <div className="App">
      <div className="container">
        {page===0  && <Menu handlePage={handlePage} />}
        {page===1  && <Play user={user} puzzle={puzzle} best={best} handlePage={handlePage} />}
        {page===2  && <Top user={user} handlePage={handlePage} />}
      </div>
    </div>
  );
}

export default App;  

