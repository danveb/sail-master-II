import React, { useState, useEffect } from 'react' 
import { useNavigate } from 'react-router-dom' 
import SailMasterIIApi from '../API/api'
import { Container, Card, Form, Button } from 'react-bootstrap' 

const VoyageForm = ({ currentUser, newVoyage }) => {
    // formData, setFormdata state 
    const [formData, setFormData] = useState({
        startPoint: '',
        endPoint: '',
        sailorUsername: currentUser.username
    })

    const [clubs, setClubs] = useState([])
    useEffect(() => {
        async function getClubs() {
            const response = await SailMasterIIApi.getClubs() 
            setClubs(response)
        }
        getClubs() 
    }, [setClubs])

    // formValidation to be HTML5 validation
    const [validated, setValidated] = useState(false) 

    // useNavigate for react-router-dom v6
    const navigate = useNavigate() 

    const handleChange = (e) => {
        // destructure e.target and use name/value 
        const { name, value } = e.target 
        setFormData(formData => ({
            ...formData, 
            [name]: value 
        }))
    }

    const handleSubmit = (e) => {
        const form = e.currentTarget 
        if(form.checkValidity() === false) {
            e.preventDefault()
            e.stopPropagation() 
        } else {
            e.preventDefault()
            // console.log('submitted')
            newVoyage(formData)
            navigate('/voyage')
        }
        setValidated(true) 
    }

    return (
        <Container className="d-flex align-items-center justify-content-center mt-4">
            <div className="w-100" style={{ maxWidth: "400px" }}>
                <Card>
                    <Card.Body>
                        <h2 className="text-center mb-4">New Voyage</h2> 
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Start Point</Form.Label>
                                <Form.Control
                                    as="select"
                                    required 
                                    name="startPoint"
                                    type="text" 
                                    placeholder="From" 
                                    onChange={handleChange}
                                >
                                {clubs.map((club) => (
                                    <option value={club.name}>{club.name}</option>
                                ))}
                                </Form.Control>
                                <Form.Control.Feedback type="valid">Please enter an end point.</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>End Point</Form.Label>
                                <Form.Control
                                    as="select"
                                    required 
                                    name="endPoint"
                                    type="text"
                                    placeholder="To" 
                                    onChange={handleChange}
                                >
                                {clubs.map((club) => (
                                    <option value={club.name}>{club.name}</option>
                                ))}
                                </Form.Control>
                                <Form.Control.Feedback type="valid">Please enter an end point.</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    required 
                                    name="username"
                                    type="text" 
                                    value={formData.sailorUsername}
                                    onChange={handleChange}
                                    readOnly
                                />
                            </Form.Group>

                            <Form.Group>
                                <Button className="w-100" type="submit">
                                    Submit
                                </Button>
                            </Form.Group>
                        </Form> 
                    </Card.Body>
                </Card>
            </div>
        </Container>
    )
}

export default VoyageForm