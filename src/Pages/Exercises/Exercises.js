import React, { useEffect, useState } from 'react';
import SelectBox from '../../Components/SelectBox/SelectBox';
import SearchBox from '../../Components/SearchBox/SearchBox';
import './Exercises.css';

function Exercises() {
    const [data, setData] = useState([]);
    const [dataOriginal, setDataOriginal] = useState([]);
    const [dataEquipments, setDataEquipments] = useState([]);
    const [dataBodyPart, setDataBodyPart] = useState([]);
    const [visibleImages, setVisibleImages] = useState(40);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async (url) => {
            try {
                setIsLoading(true);
                const response = await fetch(url);
                const dataJson = await response.json();
                return dataJson;
            } catch (error) {
                console.error('Erro ao carregar dados:', error);
            } finally {
                setIsLoading(false);
            }
        };

        const fetchDataExercises = async () => {
            setIsLoading(true);
            const dataJson = await fetchData('./serverJson/all.json');
            setData(dataJson);
            setDataOriginal(dataJson);

            setIsLoading(false);
        };

        const fetchDataEquipments = async () => {
            setIsLoading(true);
            const dataJson = await fetchData('./serverJson/equipments.json');
            const convertedOptions = dataJson.map((item) => ({
                value: item.toLowerCase(),
                label: item.charAt(0).toUpperCase() + item.slice(1),
                type: "equipments"
            }));
            convertedOptions.unshift({ value: 'all', label: 'All', isFixed: true });

            setDataEquipments(convertedOptions);
            setIsLoading(false);
        };

        const fetchDataBodyPart = async () => {
            setIsLoading(true);
            const dataJson = await fetchData('./serverJson/bodyPart.json');
            const convertedOptions = dataJson.map((item) => ({
                value: item.toLowerCase(),
                label: item.charAt(0).toUpperCase() + item.slice(1),
                type: "bodyPart"
            }));
            convertedOptions.unshift({ value: 'all', label: 'All', isFixed: true });

            setDataBodyPart(convertedOptions);
            setIsLoading(false);
        };

        fetchDataExercises();
        fetchDataEquipments();
        fetchDataBodyPart();
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

    const handleSelectChange = (selectedOption) => {
        if (selectedOption.value === "all") {
            setData(dataOriginal);
        } else {
            if (selectedOption.type === "equipments") {
                const filteredData = dataOriginal.filter(item => item.equipment.toLowerCase() === selectedOption.value);
                setData(filteredData);
            }
            else {
                const filteredData = dataOriginal.filter(item => item.bodyPart.toLowerCase() === selectedOption.value);
                setData(filteredData);
            }
        }
    };

    return (
        <>
            <div className='Row'>
                <div className='SearchBox'>
                    <SearchBox/>
                </div>
                <div className='SelectBox1'>
                    <SelectBox options={dataEquipments} onSelectChange={handleSelectChange} />
                </div>
                <div className='SelectBox2'>
                    <SelectBox options={dataBodyPart} onSelectChange={handleSelectChange} />
                </div>
            </div>
            <div className='Images'>
                {data.slice(0, visibleImages).map((image, index) => (
                    <div key={index} className="image-container">
                        <img src={image.gifUrl} alt={`Imagem ${index}`} />
                        <h1 className="image-name">{image.name}</h1>
                    </div>
                ))}

                {isLoading && <p>Carregando...</p>}
            </div>
        </>
    );
}

export default Exercises;
