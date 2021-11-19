import React, { useState, useEffect, useContext } from 'react' 
import SailMasterIIApi from '../API/api'
import { Link, useNavigate } from 'react-router-dom'
import { Table, Button } from 'react-bootstrap' 
import { FaCheckCircle, FaTrashAlt } from "react-icons/fa"

const VoyageTable = ({ id, startPoint, endPoint, sailorUsername }) => {
    // useContext
    const [voyage, setVoyage] = useState([])

    // useNavigate for react-router-dom v6
    const navigate = useNavigate() 

    // TODO: removeVoyage 

    // useEffect
    useEffect(() => {
        async function getVoyage(id) {
            const response = await SailMasterIIApi.getVoyage(id) 
            setVoyage(response) 
        }
        getVoyage(id) 
    }, [])

    if(!voyage) return console.error('No voyages yet. Please consider adding one')

    return (
        <Table striped bordered hover size="lg">
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
                <tr>
                <td>{startPoint}</td>
                <td>{endPoint}</td>
                <td>{sailorUsername}</td>
                {/* <td><Nav.Link as={Link} to={`/voyage/${voyage.id}`}><FaCheckCircle /></Nav.Link></td> */}
                <td><Button variant="warning" as={Link} to={`/voyage/${id}`}><FaCheckCircle /></Button></td>

                {/* <td><Button variant="danger" id={voyage.id} onClick={removeVoyage}><FaTrashAlt /></Button></td> */}

                <td><Button variant="danger"><FaTrashAlt /></Button></td>
                </tr>
            </tbody>
        </Table>
    )
}

export default VoyageTable