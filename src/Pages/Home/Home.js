// Home.js
import React from 'react';
import './Home.css';

function Home() {
  const backgroundImage = './images/home.jpg';

  return (
    <div className="home">
      <div className="dashboard">
        <div>
          <h1 className="titulo-grande">Keep your</h1>
          <h1 className="titulo-grande">Body Active</h1>
          <h3 className="subtitulo-pequeno">All tips on a fit body</h3>
          <img className="circle" src={process.env.PUBLIC_URL + '/images/svg/circle.svg'} alt="Circle" />
          <img className="line3" src={process.env.PUBLIC_URL + '/images/svg/line3.svg'} alt="Line3" />
        </div>
      </div>
      <div className="space"></div>
      <div className="slide">
        <p>sdsd</p>
        <p>sdsd</p>
        <p>sdsd</p>
        <p>sdsd</p>
      </div>
      <footer className="footer">
        <p>euu</p>
      </footer>
    </div>
  );
}

export default Home;
