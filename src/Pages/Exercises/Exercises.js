import React, { useEffect, useState } from 'react';
import SelectBox from '../../Components/SelectBox/SelectBox';
import SearchBox from '../../Components/SearchBox/SearchBox';
import Exercise from '../../Components/Exercise/Exercise';
import ItemSlide from '../../Components/ItemSlide/ItemSlide';
import { useLocation, useNavigate } from 'react-router-dom';
import './Exercises.css';

function Exercises() {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);

    const [data, setData] = useState([]);
    const [dataOriginal, setDataOriginal] = useState([]);
    const [dataEquipments, setDataEquipments] = useState([]);
    const [dataBodyPart, setDataBodyPart] = useState([]);
    const [visibleImages, setVisibleImages] = useState(40);
    const [isLoading, setIsLoading] = useState(false);

    const [searchText, setSearchText] = useState(queryParams.get('search') || '');

    const capitalizeString = (str) => {
        return str.replace(/(?:^|\s)\S/g, char => char.toUpperCase());
    };

    const [equipmentsText, setEquipmentsText] = useState({
        value: queryParams.get('equipment') || '',
        label: queryParams.get('equipment') ? capitalizeString(queryParams.get('equipment')) : ''
    });
    const [bodyPartText, setBodyPartText] = useState({
        value: queryParams.get('bodyPart') || '',
        label: queryParams.get('bodyPart') ? capitalizeString(queryParams.get('bodyPart')) : ''
    });

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

        const fetchDataExercises = async () => {
            setIsLoading(true);
            let dataJson = await fetchData('./serverJson/all.json');

            let dataUpperCase = dataJson.map((item) => ({
                ...item,
                name: item.name.replace(/(?:^|\s)\S/g, char => char.toUpperCase())
            }));

            setData(dataUpperCase);
            setDataOriginal(dataUpperCase);

            setIsLoading(false);
        };

        const fetchDataEquipments = async () => {
            setIsLoading(true);
            let dataJson = await fetchData('./serverJson/equipments.json');
            let convertedOptions = dataJson.map((item) => ({
                value: item.toLowerCase(),
                label: item.charAt(0).toUpperCase() + item.slice(1),
                type: "equipments"
            }));

            setDataEquipments(convertedOptions);
            setIsLoading(false);
        };

        const fetchDataBodyPart = async () => {
            setIsLoading(true);
            let dataJson = await fetchData('./serverJson/bodyPart.json');
            let convertedOptions = dataJson.map((item) => ({
                value: item.toLowerCase(),
                label: item.charAt(0).toUpperCase() + item.slice(1),
                type: "bodyPart"
            }));

            setDataBodyPart(convertedOptions);
            setIsLoading(false);
        };

        fetchDataExercises();
        fetchDataEquipments();
        fetchDataBodyPart();
    }, []);

    useEffect(() => {
        filterData();
    }, [dataOriginal]);

    const handleScroll = () => {
        const scrollPosition = window.innerHeight + document.documentElement.scrollTop;
        const totalHeight = document.documentElement.offsetHeight;
        const nearBottom = scrollPosition + 200 >= totalHeight;

        if (nearBottom && !isLoading) {
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

    useEffect(() => {
        filterData();

        navigate(`/exercises?search=${encodeURIComponent(searchText)}&equipment=${encodeURIComponent(equipmentsText.value)}&bodyPart=${encodeURIComponent(bodyPartText.value)}`);

    }, [searchText, equipmentsText, bodyPartText]);

    const debounce = (func, delay) => {
        let timeoutId;
        return function () {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, arguments), delay);
        };
    };

    const handleSelectChange = (selectedOption) => {
        if (selectedOption !== null) {
            if (selectedOption.clean !== undefined) {
                if (selectedOption.clean === "Equipments") {
                    setEquipmentsText({ value: "", label: "" });
                }
                else {
                    setBodyPartText({ value: "", label: "" });
                }
            } else {
                if (selectedOption.type === "equipments") {
                    setEquipmentsText(selectedOption);
                }
                else {
                    setBodyPartText(selectedOption);
                }
            }
        }
    };

    const handleSearchBoxChange = (searchText) => {
        setSearchText(searchText);
    };

    const filterData = () => {
        let filteredDataSearchBox = dataOriginal.filter((item) => {
            const matchName = item.name.toLowerCase().includes(searchText.toLowerCase());
            const matchEquipment = item.equipment.toLowerCase().includes(searchText.toLowerCase());
            const matchBodyPart = item.bodyPart.toLowerCase().includes(searchText.toLowerCase());

            return matchName || matchEquipment || matchBodyPart;
        });

        let filteredDataSearchBoxAndEquipments;
        if (equipmentsText.value === "") {
            filteredDataSearchBoxAndEquipments = filteredDataSearchBox;

        } else {
            filteredDataSearchBoxAndEquipments = filteredDataSearchBox.filter(item => item.equipment.toLowerCase() === equipmentsText.value);
        }

        let filteredDataSearchBoxAndEquipmentsAndBodyPart;
        if (bodyPartText.value === "") {
            filteredDataSearchBoxAndEquipmentsAndBodyPart = filteredDataSearchBoxAndEquipments;

        } else {
            filteredDataSearchBoxAndEquipmentsAndBodyPart = filteredDataSearchBoxAndEquipments.filter(item => item.bodyPart.toLowerCase() === bodyPartText.value);
        }

        setData(filteredDataSearchBoxAndEquipmentsAndBodyPart);
    };

    return (
        <>
            <div className='Row'>
                <span className='Title'>Exercises</span>
                <div className='SearchBox'>
                    <SearchBox onSearch={handleSearchBoxChange} searchTextInit={searchText} />
                </div>
                <div className='SelectBox1'>
                    <SelectBox label="Equipments" options={dataEquipments} onSelectChange={handleSelectChange} initOption={equipmentsText} />
                </div>
                <div className='SelectBox2'>
                    <SelectBox label="Body Parts" options={dataBodyPart} onSelectChange={handleSelectChange} initOption={bodyPartText} />
                </div>
            </div>
            <div className='Images'>
                {data.slice(0, visibleImages).map((image, index) => (
                    <Exercise index={index} image={image} />
                ))}

                {isLoading ? (
                    Array.from({ length: 20 }, (_, index) => <ItemSlide key={index} />)
                ) : null}
            </div>
        </>
    );
}

export default Exercises;
