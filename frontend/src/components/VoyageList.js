import React, { useState, useEffect, useContext } from 'react' 
import SailMasterIIApi from '../API/api'
import { Link } from 'react-router-dom'
import { Container, Row, Button, Table } from 'react-bootstrap'
import { FaCheckCircle, FaTrashAlt } from "react-icons/fa"
import UserContext from '../helpers/UserContext'

const VoyageList = () => {    
    const { currentUser } = useContext(UserContext)
    // useState
    const [voyage, setVoyage] = useState([])

    // useEffect
    useEffect(() => {
        async function getVoyages() {
            try {
                let voyages = await SailMasterIIApi.getVoyages() 
                setVoyage(voyages) 
            } catch(err) {
                console.error(err)
            }
        }
        getVoyages() 
    }, [setVoyage])

    // filter voyages based on currentUser
    // if currentUser.isAdmin can view all voyages
    let filteredVoyages = voyage.filter((v) => v.sailorUsername === currentUser.username || currentUser.isAdmin)
    // console.log(filteredVoyages) 

    return (
        <Container className="d-flex align-items-center justify-content-center mt-4">
        <Row>
            <h1 className="text-center mb-4">Voyage List</h1>
            <Button as={Link} to={`/voyage/new`} variant="success" className="mb-4">Create A Voyage</Button>
                <Table striped bordered hover size="s">
                <thead>
                    <tr>
                        <th width="100">Start Point</th>
                        <th width="100">End Point</th>
                        <th width="100">@username</th>
                        <th width="100">View</th>
                        <th width="100">Delete</th>
                    </tr>
                </thead>
                <tbody>
                { filteredVoyages.map((voyage) => (
                    <tr>
                        <td>{voyage.startPoint}</td>
                        <td>{voyage.endPoint}</td>
                        <td>{voyage.sailorUsername}</td>
                        <td><Button variant="warning" as={Link} to={`/voyage/${voyage.id}`}><FaCheckCircle /></Button></td>
                        <td><Button variant="danger" onClick={() => SailMasterIIApi.removeVoyage(voyage.id)}><FaTrashAlt /></Button></td>
                    </tr>
                ))}
                </tbody>
                </Table>
        </Row>
        </Container>
    )
}

export default VoyageList