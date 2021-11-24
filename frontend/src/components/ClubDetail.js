import React, { useState, useEffect } from 'react' 
import SailMasterIIApi from '../API/api'
import { Container, Card } from 'react-bootstrap' 
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
        <Container className="d-flex align-items-center justify-content-center mt-4">
            <Card className="mt-4 ">
                <Card.Img variant="top" src="https://www.lakepowell.com/media/822008/lake-powell-resorts-wahweap-marina-building-1-1000x500.jpg" />
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
        </Container>
    )
}

export default ClubDetail