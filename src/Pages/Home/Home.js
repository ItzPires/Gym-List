import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ItemSlide from '../../Components/ItemSlide/ItemSlide';
import Footer from '../../Components/Footer/Footer';
import Exercise from '../../Components/Exercise/Exercise';
import './Home.css';

function Home() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async (url) => {
      try {
        setIsLoading(true);
        let response = await fetch(url);
        let dataJson = await response.json();
        return dataJson;
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setIsLoading(false);
      }
    };

    function getRandomItems(data) {
      const randomIndices = [];
      const randomItems = [];

      while (randomIndices.length < 4) {
        const randomIndex = Math.floor(Math.random() * data.length);

        if (!randomIndices.includes(randomIndex)) {
          randomIndices.push(randomIndex);
          randomItems.push(data[randomIndex]);
        }
      }

      return randomItems;
    }

    const fetchDataExercises = async () => {
      setIsLoading(true);
      let dataJson = await fetchData('./serverJson/all.json');

      let dataJsonFour = getRandomItems(dataJson);

      let dataUpperCase = dataJsonFour.map((item) => ({
        ...item,
        name: item.name.replace(/(?:^|\s)\S/g, char => char.toUpperCase())
      }));

      setData(dataUpperCase);

      setIsLoading(false);
    };

    fetchDataExercises();
  }, []);

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
      <div className="space"></div>
      <Link to={"/exercises"}>
        <div className="view-all">
          <img className="hastag" src={process.env.PUBLIC_URL + '/images/svg/hastag.svg'} />
          View All
        </div>
      </Link>
      <div className="slide">
        {data.map((image, index) => (
          <Exercise index={index} image={image} />
        ))}

        {isLoading ? (
          Array.from({ length: 4 }, (_, index) => <ItemSlide key={index} />)
        ) : null}
      </div>
      <Footer />
    </div>
  );
}

export default Home;
