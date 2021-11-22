import React, { useState, useEffect } from 'react' 
import SailMasterIIApi from '../API/api'
import { Card } from 'react-bootstrap' 
import { useParams } from 'react-router-dom'
import axios from 'axios'

const VoyageDetail = () => {
    // useState
    const [voyage, setVoyage] = useState([]) 
    const { id } = useParams() 

    // Work with OpenweatherMap API to get sailing conditions

    // useEffect 
    useEffect(() => {
        async function getVoyages() {
            const response = await SailMasterIIApi.getVoyages() 
            setVoyage(response)
        }
        getVoyages() 
    }, [])

    useEffect(() => {
        async function getVoyage(id) {
            const response = await SailMasterIIApi.getVoyage(id) 
            setVoyage(response)
        }
        getVoyage(id) 
    }, [id])

    // OpenweatherMap API 
    const [condition, setCondition] = useState(null) 
    const [temperature, setTemperature] = useState(null) 
    const [feelsLike, setFeelsLike] = useState(null) 
    const [humidity, setHumidity] = useState(null) 
    const [precipitation, setPrecipitation] = useState(null) 
    const [visibility, setVisibility] = useState(null) 
    const [windSpeed, setWindSpeed] = useState(null) 
    const [windDegree, setWindDegree] = useState(null) 
    const [windDirection, setWindDirection] = useState(null) 

    // const URL = "https://api.openweathermap.org/data/2.5/onecall" 
    // const SECRET_KEY = '5a631d12891bda5503f40405f8213584'

    const URL = "http://api.weatherapi.com/v1/current.json"
    const SECRET_KEY = "1384ecea483d4ff1839191643212111"

    useEffect(() => {
        async function getWeather() {
            try {
                const response = await axios.get(`${URL}?key=${SECRET_KEY}&q=${voyage.club.lat},${voyage.club.lon}&aqi=no`)
                setCondition(response.data.current.condition.text)
                setTemperature(response.data.current.temp_c) 
                setFeelsLike(response.data.current.feelslike_c)
                setHumidity(response.data.current.humidity)
                setPrecipitation(response.data.current.precip_mm)
                setVisibility(response.data.current.vis_km)
                setWindSpeed(response.data.current.wind_kph)
                setWindDegree(response.data.current.wind_degree)
                setWindDirection(response.data.current.wind_dir) 
            } catch(err) {
                console.log(err) 
            }
        }
        getWeather()
        // load all dependencies to have available data showing on voyage details
    }, [voyage, condition, temperature, feelsLike, humidity, precipitation, visibility, windSpeed, windDegree, windDirection])

    const sailingAdvice = () => {
        if(windSpeed > 22) {
            return 'Conditions are dangerous. Please consider sailing for next time.'
        } else if(windSpeed > 17) {
            return 'Wind is fairly strong. Please exercise extra caution today.'
        } else if(windSpeed > 9) {
            return 'Wind is fair today.'
        } else {
            return 'Wind is calm. You will have a great sailing!'
        }
    }

    return (
        <Card className="mt-4">
            <Card.Body>
                <Card.Title>{`From: ${voyage.startPoint} | To: ${voyage.endPoint}`}</Card.Title>
                <Card.Text>{`@username: ${voyage.sailorUsername}`}</Card.Text>
                <Card.Text>{`Origin Stats:`}</Card.Text>
                <Card.Text>{`- Current Conditions: ${condition}`}</Card.Text>
                <Card.Text>{`- Current Temperature: ${temperature} degrees celsius`}</Card.Text>
                <Card.Text>{`- Temperature Feels Like: ${feelsLike} degrees celsius`}</Card.Text>
                <Card.Text>{`- Humidity: ${humidity}%`}</Card.Text>
                <Card.Text>{`- Precipitation: ${precipitation}mm`}</Card.Text>
                <Card.Text>{`- Visibility: ${visibility}km`}</Card.Text>
                <Card.Text>{`- Wind: ${windSpeed}kph at ${windDegree} degrees blowing from ${windDirection}`}</Card.Text>
                <Card.Title>{`> Sailing Advice: ${sailingAdvice()}`}</Card.Title>
            </Card.Body>
        </Card>
    )
}

export default VoyageDetail