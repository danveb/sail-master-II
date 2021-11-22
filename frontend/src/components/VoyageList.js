import React, { useState, useEffect } from 'react' 
import VoyageTable from './VoyageTable'
import SailMasterIIApi from '../API/api'
import { Link } from 'react-router-dom'
import { Container, Row, Button } from 'react-bootstrap' 

const VoyageList = ({ currentUser }) => {    
    // useState
    const [voyages, setVoyages] = useState([])

    // useEffect
    useEffect(() => {
        async function getVoyages() {
            try {
                let voyages = await SailMasterIIApi.getVoyages() 
                setVoyages(voyages) 
            } catch(err) {
                console.error(err)
            }
        }
        getVoyages() 
    }, [setVoyages])

    // filter voyages based on currentUser
    // if currentUser.isAdmin can view all voyages
    let filteredVoyages = voyages.filter((v) => v.sailorUsername === currentUser.username || currentUser.isAdmin)

    if(!voyages) return console.error('No voyages yet. Please consider adding one')

    return (
        <Container className="d-flex align-items-center justify-content-center mt-4">
            <Row>
                <h1 className="text-center mb-4">Voyage List</h1>
                <Button as={Link} to={`/voyage/new`} variant="success" className="mb-4">Create A Voyage</Button>
                { filteredVoyages.map((voyage) => (
                    <VoyageTable
                        key={voyage.id}
                        id={voyage.id}
                        startPoint={voyage.startPoint}
                        endPoint={voyage.endPoint}
                        sailorUsername={voyage.sailorUsername} 
                    />
                ))} 
            </Row>
        </Container>
    )
}

export default VoyageList