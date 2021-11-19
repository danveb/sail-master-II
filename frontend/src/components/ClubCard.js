import React from 'react' 
import { Link } from 'react-router-dom' 
import { Card, Nav } from 'react-bootstrap' 

const ClubCard = ({ id, name, city, state, zip, lat, lon }) => {
    return (
        <Card className="mt-4 text-center">
            <Nav.Link as={Link} to={`/clubs/${id}`}>
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Subtitle>{`${city}, ${state} ${zip}`}</Card.Subtitle>
                    <Card.Text>{`Latitude: ${lat} | Longitude: ${lon}`}</Card.Text>
                </Card.Body>
            </Nav.Link>
        </Card>
    )
}

export default ClubCard