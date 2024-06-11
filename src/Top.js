// TopScores.js
import React from 'react';
import './Top.css'; // Import CSS file for styling
import {getUrl} from './Utils';

  
const restartApp = () => {
    window.location.reload(); // Reload the browser window
};
 

const Top = ({ user, handlePage }) => {
  const url = getUrl()+`top.php?id=${user}&score=0`
  return (
   <div className="top-container">
      <div className="top-button-container">
        <button onClick={restartApp} className="rounded-button">Back To Play</button>
      </div>
      <div className="iframe-container">
        <iframe 
          src={url}
          title="Top Stats"
          className="iframe"
        />
      </div>
    </div>
  );
}
 
export default Top;

