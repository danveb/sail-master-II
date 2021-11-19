import React, { useState, useEffect } from 'react' 
import ClubCard from './ClubCard'
import SailMasterIIApi from '../API/api'
import { Container, Row, Col } from 'react-bootstrap'

const ClubList = () => {
    // useState 
    const [clubs, setClubs] = useState([])

    // useEffect
    useEffect(() => {
        async function getClubs() {
            const response = await SailMasterIIApi.getClubs() 
            setClubs(response)
        }
        getClubs() 
    }, [setClubs])

    return (
        <Container className="d-flex align-items-center justify-content-center mt-4"> 
            <Row>
                <h1 className="text-center mb-4">Sailing Clubs</h1> 
                { clubs.map((club) =>
                    <Col md={4} >
                        <ClubCard 
                            key={club.id}
                            id={club.id}
                            name={club.name}
                            city={club.city}
                            state={club.state}
                            zip={club.zip}
                            lat={club.lat}
                            lon={club.lon}
                        />
                    </Col>
                ) }
            </Row>
        </Container>
    )
}

export default ClubList