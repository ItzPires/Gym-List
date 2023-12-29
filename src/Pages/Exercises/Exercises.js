import React, { useEffect, useState } from 'react';
import SelectBox from '../../Components/SelectBox/SelectBox';
import SearchBox from '../../Components/SearchBox/SearchBox';
import Exercise from '../../Components/Exercise/Exercise';
import ItemSlide from '../../Components/ItemSlide/ItemSlide';
import { useLocation, useNavigate } from 'react-router-dom';
import { UseFetch } from '../../Services/APIService';
import './Exercises.css';

function Exercises() {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);

    const [data, setData] = useState([]);
    const [dataOriginal, setDataOriginal] = useState([]);
    const [dataEquipments, setDataEquipments] = useState([]);
    const [dataBodyPart, setDataBodyPart] = useState([]);
    const [dataAlphabeticalOrder, setDataAlphabeticalOrder] = useState([]);
    const [visibleImages, setVisibleImages] = useState(40);
    const [isLoading, setIsLoading] = useState(true);

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
    const [alphabeticalOrderText, setAlphabeticalOrderText] = useState({
        value: queryParams.get('order') || 'ascending',
        label: queryParams.get('order') ? capitalizeString(queryParams.get('order')) : 'Ascending'
    });

    useEffect(() => {
        const fetchDataExercises = async () => {
            let dataJson = await UseFetch('exercises?limit=100000000');
            if(dataJson === null) {
                alert('Ocorreu um erro ao carregar os exercícios');
                return;
            }

            let dataUpperCase = dataJson.map((item) => ({
                ...item,
                name: item.name.replace(/(?:^|\s)\S/g, char => char.toUpperCase())
            }));

            setData(dataUpperCase);
            setDataOriginal(dataUpperCase);

        };

        const fetchDataEquipments = async () => {
            let dataJson = await UseFetch('exercises/equipmentList');
            if(dataJson === null) {
                alert('Ocorreu um erro ao carregar os equipamentos');
                return;
            }

            let convertedOptions = dataJson.map((item) => ({
                value: item.toLowerCase(),
                label: item.charAt(0).toUpperCase() + item.slice(1),
                type: "equipments"
            }));

            setDataEquipments(convertedOptions);
        };

        const fetchDataBodyPart = async () => {
            let dataJson = await UseFetch('exercises/bodyPartList');
            if(dataJson === null) {
                alert('Ocorreu um erro ao carregar as partes do corpo');
                return;
            }

            let convertedOptions = dataJson.map((item) => ({
                value: item.toLowerCase(),
                label: item.charAt(0).toUpperCase() + item.slice(1),
                type: "bodyPart"
            }));

            setDataBodyPart(convertedOptions);
        };

        const fetchDataAlphabeticalOrder = async () => {
            let optionsArray = ['Ascending', 'Descending'];

            let options = optionsArray.map((item) => ({
                value: item.toLowerCase(),
                label: item.charAt(0).toUpperCase() + item.slice(1),
                type: "alphabeticalOrder"
            }));

            setDataAlphabeticalOrder(options);
        }

        fetchDataExercises();
        fetchDataEquipments();
        fetchDataBodyPart();
        fetchDataAlphabeticalOrder();

    }, []);

    useEffect(() => {
        filterData();
    }, [dataOriginal]);

    const handleScroll = () => {
        const scrollPosition = window.innerHeight + document.documentElement.scrollTop;
        const totalHeight = document.documentElement.offsetHeight;
        const nearBottom = scrollPosition + 200 >= totalHeight;

        if (nearBottom && !isLoading) {
            setVisibleImages(prevVisibleImages => prevVisibleImages + 40);
        }
    };

    const onLoadImage = () => {
        setIsLoading(false);
    };

    useEffect(() => {
        const debouncedHandleScroll = debounce(handleScroll, 300);

        window.addEventListener('scroll', debouncedHandleScroll);
        return () => {
            window.removeEventListener('scroll', debouncedHandleScroll);
        };
    }, [isLoading]);

    useEffect(() => {
        setIsLoading(true);
        filterData();

        navigate(`/exercises?search=${encodeURIComponent(searchText)}&equipment=${encodeURIComponent(equipmentsText.value)}&bodyPart=${encodeURIComponent(bodyPartText.value)}&order=${encodeURIComponent(alphabeticalOrderText.value)}`);

    }, [searchText, equipmentsText, bodyPartText, alphabeticalOrderText]);

    const debounce = (func, delay) => {
        let timeoutId;
        return function () {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, arguments), delay);
        };
    };

    const sortAscendant = (exercises) => {
        return exercises.slice().sort((a, b) => a.name.localeCompare(b.name));
    };

    const sortDescending = (exercises) => {
        return exercises.slice().sort((a, b) => b.name.localeCompare(a.name));
    };

    const sortExercises = (exercises) => {
        if (alphabeticalOrderText.value === "ascending") {
            return sortAscendant(exercises);
        } else {
            return sortDescending(exercises);
        }
    }

    const handleSelectChange = (selectedOption) => {
        if (selectedOption !== null) {
            if (selectedOption.clean !== undefined) {
                if (selectedOption.clean === "Equipments") {
                    setEquipmentsText({ value: "", label: "" });
                }
                else if (selectedOption.clean === "Body Parts") {
                    setBodyPartText({ value: "", label: "" });
                }
                else if (selectedOption.clean === "Alphabetical Order") {
                    setAlphabeticalOrderText({ value: "ascending", label: "Ascending" });
                }
            } else {
                if (selectedOption.type === "equipments") {
                    setEquipmentsText(selectedOption);
                }
                else if (selectedOption.type === "bodyPart") {
                    setBodyPartText(selectedOption);
                }
                else {
                    setAlphabeticalOrderText(selectedOption);
                }
            }
        }
    };

    const handleSearchBoxChange = (searchText) => {
        setSearchText(searchText);
    };

    const filterData = async () => {
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
            let url = "exercises/equipment/" + equipmentsText.value + "?limit=100000000";
            const dataFromFetch = await UseFetch(url);
            if (dataFromFetch) {
                filteredDataSearchBoxAndEquipments = filteredDataSearchBox.filter(item =>
                    dataFromFetch.some(fetchItem => fetchItem.id === item.id)
                );
            }
            else {
                alert('Ocorreu um Erro');
                return;
            }
        }
        
        let filteredDataSearchBoxAndEquipmentsAndBodyPart;
        if (bodyPartText.value === "") {
            filteredDataSearchBoxAndEquipmentsAndBodyPart = filteredDataSearchBoxAndEquipments;
        } else {
            let url = "exercises/bodyPart/" + bodyPartText.value + "?limit=100000000"; 
            const dataFromFetch = await UseFetch(url);
            if (dataFromFetch) {
                filteredDataSearchBoxAndEquipmentsAndBodyPart = filteredDataSearchBoxAndEquipments.filter(item =>
                    dataFromFetch.some(fetchItem => fetchItem.id === item.id)
                );
            }
            else {
                alert('Ocorreu um Erro');
                return;
            }
        }        

        let filteredDataSearchBoxAndEquipmentsAndBodyPartAndAlphabeticalOrder = sortExercises(filteredDataSearchBoxAndEquipmentsAndBodyPart);

        setData(filteredDataSearchBoxAndEquipmentsAndBodyPartAndAlphabeticalOrder);
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
                <div className='SelectBox3'>
                    <SelectBox label="Alphabetical Order" options={dataAlphabeticalOrder} onSelectChange={handleSelectChange} initOption={alphabeticalOrderText} />
                </div>
            </div>
            <div className='Images'>
                {isLoading ? (
                    Array.from({ length: 20 }, (_, index) => <ItemSlide key={index} className="loadingImages"/>)
                ) : null}

                {data.slice(0, visibleImages).map((image, index) => (
                    <Exercise index={index} image={image} onLoad={onLoadImage} key={index} />
                ))}
            </div>
        </>
    );
}

export default Exercises;
