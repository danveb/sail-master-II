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
        async function getVoyage(id) {
            const response = await SailMasterIIApi.getVoyage(id) 
            setVoyage(response)
        }
        getVoyage(id) 
    }, [id])

    // useEffect 
    useEffect(() => {
        async function getClubs() {
            const response = await SailMasterIIApi.getClubs()  
            setVoyage(response)
        }
        getClubs() 
    }, [])

    return (
        <Card className="mt-4">
            <Card.Body>
                <Card.Title>{`From: ${voyage.startPoint} | To: ${voyage.endPoint}`}</Card.Title>
                <Card.Subtitle>{`@username: ${voyage.sailorUsername}`}</Card.Subtitle>
                {/* <Card.Text>{`Lat: ${voyage.lat} | Lon: ${voyage.lon}`}</Card.Text> */}
            </Card.Body>
        </Card>
    )
}

export default VoyageDetail