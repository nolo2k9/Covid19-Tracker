import React, {useState, useEffect} from 'react';
import {NativeSelect, FormControl} from '@material-ui/core';
import styles from './CountryPicker.module.css';
import {fetchCountries} from '../../api';

const CountryPicker = ({handleCountryChange}) => {

    //setting up array 
    const [fetchedCountries, setFetchedCountries] = useState([]);
    useEffect(() => {

        const fetchCountryAPI = async () => {
            //Assigning setFetchedCountriesto data retrieved from fetchCountries
            setFetchedCountries(await fetchCountries());

        }

        //array will change when fetchcountries changes
        fetchCountryAPI();

    }, [setFetchedCountries]);

    //Mapping over all countries countries with country value and key of i pulling out a name. 
    return(
       <FormControl className = {styles.FormControl}>
           <NativeSelect defaultValue="" onChange={(e) => handleCountryChange(e.target.value)}>
               <option value="">Stats by country</option>
               {fetchedCountries.map((country, i) => <option key={i} value={country}>{country}</option>)}
           </NativeSelect>
       </FormControl>
    )
}

export default CountryPicker;