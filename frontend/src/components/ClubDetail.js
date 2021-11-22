import React, { useState, useEffect } from 'react' 
import SailMasterIIApi from '../API/api'
import { Card } from 'react-bootstrap' 
import { useParams } from 'react-router-dom'

const ClubDetail = () => {
    // useState
    const [club, setClub] = useState([])
    const { id } = useParams()

    // useEffect
    useEffect(() => {
        async function getClub(id) {
            const response = await SailMasterIIApi.getClub(id) 
            setClub(response)
        }
        getClub(id) 
    }, [id])

    return (
        <Card className="mt-4 ">
            <Card.Body>
                <Card.Title>Club: {club.name}</Card.Title>
                <Card.Text>Address: {`${club.address}, ${club.city}, ${club.state} ${club.state}`}</Card.Text>
                <Card.Text>Website:  
                    {/* use noreferrer noopener attributes for opening websites in new tabs. Prevents security risks in older browsers */}
                    <a 
                        target="_blank" 
                        href={`https://${club.url}`}
                        rel="noreferrer noopener"
                    >
                        {`${club.url}`}
                    </a>
                </Card.Text>
                <Card.Text>Tel: {`${club.tel}`}</Card.Text>
                <Card.Text>{`Latitude: ${club.lat} | Longitude: ${club.lon}`}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default ClubDetail