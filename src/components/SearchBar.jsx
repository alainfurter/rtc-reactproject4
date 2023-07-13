import { useState, useEffect } from "react";
import get_nasa_apod_api_object from "../API/NASA_API_Fetch";
import { get_nasa_mars_api_object } from "../API/NASA_API_Fetch";

//const today = new Date(Date.now()).toISOString().slice(0, 10);

const SearchBar = ({searchUpdateCallback}) => {
    const today = new Date(Date.now()).toISOString().slice(0, 10);

    const [maxdate, setMaxDate] = useState(today);
    const [date, setDate] = useState(today);
    const [selectedAPI, setSelectedAPI] = useState('APOD');
    const [nasa_api_object, setNasa_api_object] = useState();

    const apiResponseCallback = (api_response_object) => {
        setNasa_api_object(api_response_object);
    }

    const handleAPIChange = (event) => {
        setSelectedAPI(event.target.value);
    }

    const handleDateChange = (event) => {
        if (event.target.value === '') {
            setDate(maxdate);
            event.target.value = maxdate;
        } else {
            if (event.target.value > maxdate) {
                console.log('Date in the future')
            } else {
                setDate(event.target.value);
            }
        }
    }

    useEffect(() => {
        if (selectedAPI === 'APOD') {
            get_nasa_apod_api_object(date, apiResponseCallback);
        } else {
            get_nasa_mars_api_object(date, apiResponseCallback);
        }
        
    }, [date, selectedAPI]);

    useEffect(() => {
        searchUpdateCallback(nasa_api_object);
    }, [nasa_api_object]);

    return (
        <div className="searchbar">
            <h2>Choose API and date:</h2>
            <div>
                <label htmlFor="api_selection">Select API: </label>
                <br />
                <select name="api_selection" id="api_selection" onChange={handleAPIChange}>
                    <option value="APOD">APOD</option>
                    <option value="Mars Rover">Mars Rover</option>
                </select>
            </div>
            <div>
                <label htmlFor="date_selection">Select a date: </label>
                <br />
                <input 
                    type="date" 
                    id="date_selection" 
                    name="date_selection" 
                    value={date} 
                    max={maxdate}  
                    onChange={handleDateChange}
                    required 
                />
            </div>
            {(selectedAPI!=='APOD') && (<p>There are very few dates that have images for mars rover, f.e. 03rd of June 2015.</p>)}
        </div>
    );
};

export default SearchBar;