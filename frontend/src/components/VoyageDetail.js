import React, { useState, useEffect } from 'react' 
import SailMasterIIApi from '../API/api'
import { Container, Card } from 'react-bootstrap' 
import { useParams } from 'react-router-dom'
import axios from 'axios'
import SECRET_KEY from '../helpers/secret'

const VoyageDetail = () => {
    // useState
    const [voyage, setVoyage] = useState([]) 
    const { id } = useParams() 
    const [currentCondition, setCurrentCondition] = useState([])

    // Weather API 
    const URL = "https://api.weatherapi.com/v1/current.json"

    // useEffect 
    useEffect(() => {
        async function getVoyage() {
            const response = await SailMasterIIApi.getVoyage(id) 
            // console.log(response) 
            setVoyage(response)
        }
        getVoyage() 
        // load ID to have available data showing on voyage details
        // to render every single time id changes
    }, [id])

    useEffect(() => {
        async function getWeather() {
            try {
                const response = await axios.get(`${URL}?key=${SECRET_KEY}&q=${voyage.club.lat},${voyage.club.lon}&aqi=no`)
                setCurrentCondition(response.data.current) 
            } catch(err) {
                console.log(err) 
            }
        }
        getWeather()
        // cleaning up to prevent memory leaks
        return function cleanup() {
            setCurrentCondition([])
        }
        // load voyage dependencies to have available data showing on voyage details
    }, [voyage])
    
    const sailingAdvice = (wind) => {
        if(wind > 22) {
            return 'Conditions are dangerous. Please consider sailing for next time.'
        } else if(wind > 17) {
            return 'Wind is fairly strong. Please exercise extra caution today.'
        } else if(wind > 9) {
            return 'Wind is fair today.'
        } else {
            return 'Wind is calm. You will have a great sailing!'
        }
    }

    return (
        <Container className="d-flex align-items-center justify-content-center mt-4">
            <Card className="mt-4">
                <Card.Img variant="top" src="https://img.freepik.com/free-photo/yachts-marina-sailing-motor-yachts-moored-shore_215016-314.jpg?size=626&ext=jpg" />
                <Card.Body>
                    <Card.Title>{`From: ${voyage.startPoint} | To: ${voyage.endPoint}`}</Card.Title>
                    <Card.Text>{`@username: ${voyage.sailorUsername}`}</Card.Text>
                    <Card.Text>{`Origin Stats:`}</Card.Text>
                    {/* <Card.Text>{`- Current Conditions: ${currentCondition.condition.text}`}</Card.Text> */}
                    <Card.Text>{`- Current Temperature: ${currentCondition.temp_c} degrees celsius`}</Card.Text>
                    <Card.Text>{`- Temperature Feels Like: ${currentCondition.feelslike_c} degrees celsius`}</Card.Text>
                    <Card.Text>{`- Humidity: ${currentCondition.humidity}%`}</Card.Text>
                    <Card.Text>{`- Precipitation: ${currentCondition.precip_mm}mm`}</Card.Text>
                    <Card.Text>{`- Visibility: ${currentCondition.vis_km}km`}</Card.Text>
                    <Card.Text>{`- Wind: ${currentCondition.wind_kph}kph at ${currentCondition.wind_degree} degrees blowing from ${currentCondition.wind_dir}`}</Card.Text>
                    <Card.Title>{`> Sailing Advice: ${sailingAdvice(currentCondition.wind_kph)}`}</Card.Title>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default VoyageDetail