import React from 'react';
import './Stars.css';

const Star = ({ x, y }) => (
    <div className="star" style={{ '--x': x, '--y': y }}></div>
);

const Stars = () => {
    const stars = [];
    for (let i = 0; i < 7; i++) {
        const angle =  i; 
        const x = Math.cos(angle);
        const y = Math.sin(angle);
        stars.push(<Star key={i} x={x} y={y} />);
    }
    return <div className="stars-container">{stars}</div>;
};

export default Stars;
