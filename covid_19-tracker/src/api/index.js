import axios from 'axios'

const url = 'https://covid19.mathdro.id/api';

// asyncronous export function
export const fetchData = async () => {
    
  try {
    /*
    await response from url
    pull selected (needed) data from api response
    */
    const {data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(url)
   
    //return results from api
    return  {confirmed,recovered,deaths,lastUpdate};

  } catch (error) {

  }

}
