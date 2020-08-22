import React from 'react';
import{Cards, Chart, CountryPicker} from './components';
import styles from './App.module.css';
import {fetchData} from './api/index';
import img from './images/new.jpg';

class App extends React.Component {

    state = {
        data: {},
        country: '',

    }
    async componentDidMount(){

        const fetchedData = await fetchData();
        this.setState({data: fetchedData});
       
    }
    handleCountryChange =  async (country) => {
         //get the data from selected country
        const fetchedData = await fetchData(country);
       
        //set country to the state
        this.setState({data: fetchedData, country: country});
    }
    render(){
        //de-structure from state
        const {data, country} = this.state;
        //pull out data from state
        return(
            <div className={styles.container}>
                <img className = {styles.image} src={img} alt="Covid"/>
               <Cards data={data}/>
               <CountryPicker handleCountryChange={this.handleCountryChange}/>
               <Chart data = {data} country={country}/>
            </div>
        )
    }
}

export default App;