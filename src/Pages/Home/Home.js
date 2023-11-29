// Home.jsx

import React from 'react';
import './Home.css';

function Home() {
  const backgroundImage = './images/home.jpg';

  return (
    <div className="background-container">
      <nav className="navbar">
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#contacts">Contacts</a></li>
          <li><a href="#about">About</a></li>
        </ul>
      </nav>

      <img src={backgroundImage} alt="Imagem de fundo" className="background-image" />
      <div className="centered-text">
        <h1>Gym</h1>
      </div>
    </div>
  );
}

export default Home;
