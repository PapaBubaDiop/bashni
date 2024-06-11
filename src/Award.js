import React from 'react';
import './Award.css'; // Assuming you have some styles for the popup

const Award = ({ score, best, onClose }) => {
  const win = score<best ? 1 : (score>best ? 3 : 2)
  const image = `${process.env.PUBLIC_URL}/assets/p_${win}.png`;
 
  const t1 = ["", "Верной дорогой ви идете!", "Где то я уже это видел", "Есть игроки получше вас"]; 
  const t2 = ["", "New Hiscore!", "You repeat hiscore", "Well well well"]; 
  
  return (
        <div className="popup-background">
            <div className="popup-container">
                <h2 className="popup-title">{t1[win]}</h2>
                <img src={image} alt="PopupIm" className="popup-image" />
                <div className="popup-score">{score}</div>
                <button className="popup-button" onClick={onClose}>{t2[win]}</button>
          </div>
      </div>
  );
};

export default Award;
