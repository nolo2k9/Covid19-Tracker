import axios from 'axios'

const url = 'https://covid19.mathdro.id/api'

// asyncronous export function
export const fetchData = async (country) => {
  let changeableUrl = url;
  //If a country is selected
  if (country){
    //change the url to the specified countr
    changeableUrl = `${url}/countries/${country}`;
  }
  try {
    /*
    await response from url
    pull selected (needed) data from api response
    Data will correspond to the selected country
    */
    const {
      data: { confirmed, recovered, deaths, lastUpdate },
      //await changeableUrl 
    } = await axios.get(changeableUrl)

    //return results from api
    return { confirmed, recovered, deaths, lastUpdate }

  } catch (error) {
    //log error
    console.log(error);
  }
}//fetchData

export const fetchDailyData = async () => {
  try {
    //get daily data from api
    const { data } = await axios.get(`${url}/daily`)

    const modifiedData = data.map((dailyData) => ({
      //pull out confirmed, deaths and date stats from response
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      date: dailyData.reportDate,

    }));//modifiedData

    //return results
    return modifiedData;

  } catch (error) {
     //log error
     console.log(error);
  }
}//fetchDailyData

export const fetchCountries = async () => {
  try {

    //get country data 
    const {data: {countries}} = await axios.get(`${url}/countries`);
    //return countries name 
    return countries.map((country) => country.name);
    
  } catch (error) {

    console.log(error);
  }
}
