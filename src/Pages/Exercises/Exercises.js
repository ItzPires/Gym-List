import React, { useEffect, useState } from 'react';
import './Home.css';

function Exercises() {
  const [data, setData] = useState([]);
  const [visibleImages, setVisibleImages] = useState(40);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('./all.json');
        const dataJson = await response.json();
        setData(dataJson);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleScroll = () => {
    const scrollPosition = window.innerHeight + document.documentElement.scrollTop;
    const totalHeight = document.documentElement.offsetHeight;
    const nearBottom = scrollPosition + 200 >= totalHeight;

    if (nearBottom && !isLoading) {
      console.log('Carregar mais imagens...');
      setIsLoading(true);
      setVisibleImages(prevVisibleImages => prevVisibleImages + 40);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const debouncedHandleScroll = debounce(handleScroll, 300);

    window.addEventListener('scroll', debouncedHandleScroll);
    return () => {
      window.removeEventListener('scroll', debouncedHandleScroll);
    };
  }, [isLoading]);

  const debounce = (func, delay) => {
    let timeoutId;
    return function () {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, arguments), delay);
    };
  };

  return (
    <div>
      <h1>Home</h1>
      <div className='Images'>
        {data.slice(0, visibleImages).map((image, index) => (
          <img key={index} src={image.gifUrl} alt={`Imagem ${index}`} />
        ))}
        {isLoading && <p>Carregando...</p>}
      </div>
    </div>
  );
}

export default Exercises;
