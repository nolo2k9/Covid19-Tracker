import React, { useState, useEffect } from 'react'
import { fetchDailyData } from '../../api/'
import { Line, Bar } from 'react-chartjs-2'
import styles from './Chart.module.css'

const Chart = ({data: {confirmed, deaths, recovered}, country}) => {
  const [dailyData, setDailyData] = useState([])

  useEffect(() => {
    const fetchApi = async () => {
      setDailyData(await fetchDailyData())
    }
    fetchApi()
    //making useEffect run only once
  }, []);

  const lineChart =
    //if daily data is available return the line chart
    dailyData.length ? (
      <Line
        data={{
          //looping through daily data
          labels: dailyData.map(({ date }) => date),
          datasets: [
            {
              data: dailyData.map(({ confirmed }) => confirmed),
              label: 'Infected',
              borderColor: '#3333ff',
              fill: true,
            },
            {
              data: dailyData.map(({ deaths }) => deaths),
              label: 'Deaths',
              borderColor: 'red',
              backgroundColor: 'rgba(255, 0, 0, 0.5',
              fill: true,
            },
          ],
        }}
        //if data not available return null
      />) : null


      const barChart = (
       confirmed
        ? (
          <Bar
          data={{
            //label
            labels: ['Infected', 'Recovered', 'Deaths'],
            datasets:[{
              //label
              label: 'People',
              // array of background colour for Infected', 'Recovered', 'Deaths'
              backgroundColor:[
              'rgba(248,148,6,1)',
              'rgba(0,255,0,0.5)',
              'rgba(255,0,0,0.5)'],
              //taken from api 
              data:[confirmed.value, recovered.value, deaths.value]
            }]

          }}
          options={{
            legend: {display: false},
            title: {display: true, text: `Current state in ${country}`}


          }} />
        ) : null
      );

      console.log(confirmed, recovered, deaths);
  
    
    
  //if there is a country show a barchart else show a linechart
  return (
      <div className={styles.container}>
          {country ? barChart : lineChart}
      </div>
  )
}

export default Chart
