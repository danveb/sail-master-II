import React, { useState, useEffect, useContext } from 'react' 
import VoyageTable from './VoyageTable'
import SailMasterIIApi from '../API/api'
import { Link, useNavigate } from 'react-router-dom'
import { Container, Row, Button } from 'react-bootstrap' 

const VoyageList = ({ currentUser }) => {
    // useNavigate for react-router-dom v6
    const navigate = useNavigate() 
    
    // useState
    const [voyages, setVoyages] = useState([])

    // removeVoyage 

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

        // cleanup 
        return function cleanup() {
            setVoyages([])
        }
    }, [setVoyages])

    // filter voyages based on currentUser
    let filteredVoyages = voyages.filter((v) => v.sailorUsername === currentUser.username)

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