import React, { useState, useEffect } from 'react';
import './Menu.css';
import {getUrl} from './Utils';
import packageJson from '../package.json'; // Adjust the path if necessary

const Menu = ({handlePage}) => {
  const [best, setBest] = useState([]);
  const [user, setUser] = useState(1001);
  const [data, setData] = useState(null);
  const img1 = `${process.env.PUBLIC_URL}/assets/p_17.png`;
  const img2 = `${process.env.PUBLIC_URL}/assets/p_14.png`;
  const img3 = `${process.env.PUBLIC_URL}/assets/p_37.png`;
  const img4 = `${process.env.PUBLIC_URL}/assets/p_1.png`;

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    var id = searchParams.get('id');
    if (!id) id = 1001  
    setUser(id)
    const url = getUrl()+`get_cup.php?id=${id}`
    console.log('url ------------------->', url); // Handle any errors
    fetch(url)
  .then(response => {
    return response.json(); // or response.text() if the response is not in JSON format
  })
  .then(data => {
    console.log('data ************** ', data)
    setData(data)
  })
  .catch(error => {
    console.error('fetch operation:', error); // Handle any errors
  });

    // Fetch data from the server
    const urltop = getUrl()+`get_top.php`
    fetch(urltop, { headers: {} }) 
      .then(response => response.json())
      .then(data => setBest(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);



  const topClick = () => {
    handlePage(2, user, 0, 0 )
    console.log(`Top clicked`);
  }

  function getRandomInt() {
    return Math.floor(Math.random() * 990000) + 10000;
  }



  if (!data) {
        return <div className="loading-overlay">Loading...</div>;
  }

  return (
    <div className="container">
      <div onClick={topClick} className="title">Bašni : Daily Telegram Game</div>
           <div className="version">Version: {packageJson.version}</div>

      <div className="button-container">
       <div className="button-wrapper">
          <div className="puzzle" onClick={() => handlePage(1, user, data[0], data[1] )}>
          <img src={img1} alt="Overlay" className="overlay-image" />
          </div>
          <div className="button-text">{ data[2]<99 ? data[2] : '--' }/{data[1]}</div>
        </div>
        <div className="button-wrapper">
          <div className="puzzle" onClick={() => handlePage(1, user, data[3], data[4] )}>
         <img src={img2} alt="Overlay" className="overlay-image" />
          </div>
          <div className="button-text">{data[5]<99 ? data[5] : '--'}/{data[4]}</div>
        </div>
        <div className="button-wrapper">
          <div className="puzzle" onClick={() => handlePage(1, user, data[6], data[7] )}>
            <img src={img3} alt="Overlay" className="overlay-image" />
          </div>
          <div className="button-text">{data[8]<99 ? data[8] : '--'}/{data[7]}</div>
        </div>
        <div className="button-wrapper">
          <div className="puzzle" onClick={() => handlePage(1, user, getRandomInt() , 100 )}>
            <img src={img4} alt="Overlay" className="overlay-image" />
          </div>
          <div className="button-text">Rand</div>
        </div>
      </div>
      
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Player</th>
              <th>Win</th>
              <th>Score</th>
              <th>Cup Details</th>
            </tr>
          </thead>
          <tbody>
            {best.map((player, index) => (
              <tr key={index}>
                <td>{player.name}</td>
                <td>{player.wins}</td>
                <td>{player.score}</td>
                <td>{player.p1}+{player.p2}+{player.p3}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
  );
};

export default Menu;
