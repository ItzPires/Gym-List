import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../Components/Footer/Footer';
import './Home.css';

function Home() {

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
        <div>
          <img className="img-dashboard" src={process.env.PUBLIC_URL + '/images/home.jpg'} />
        </div>
      </div>
      <Link to={"/exercises"}>
        <div className="view-all">
          <img className="hastag" src={process.env.PUBLIC_URL + '/images/svg/hastag.svg'} />
          <span>View Exercises</span>
        </div>
      </Link>
      <Footer />
    </div>
  );
}

export default Home;
