import React, { useState } from 'react' 
import { useNavigate } from 'react-router-dom' 
import { Container, Card, Form, Button } from 'react-bootstrap' 
import Alert from '../helpers/Alert' 

const LoginForm = ({ login }) => {
    /** INITIAL_STATE object holds username, password */
    const INITIAL_STATE = {
        username: '',
        password: ''
    }

    // formData, setFormdata state by default will refer to above state
    const [formData, setFormData] = useState(INITIAL_STATE)

    // formValidation to be HTML5 validation (react-bootstrap) 
    // initially set to be false 
    const [validated, setValidated] = useState(false) 

    // formErrors; errors will display below if formErrors has any messages
    // works in conjunction with Alert component below
    const [formErrors, setFormErrors] = useState([]) 

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

    // handleSubmit with HTML5 validation (react-bootstrap)
    const handleSubmit = async (e) => {
        const form = e.currentTarget 
        if(form.checkValidity() === false) {
            e.preventDefault()
        } else {
            e.preventDefault()
            let result = await login(formData) 
            if(result.success) {
                navigate('/')
            } else {
                setFormErrors(result.errors)
            }      
        }
        setValidated(true) 
    }

    return (
        <Container className="d-flex align-items-center justify-content-center mt-4">
            <div className="w-100" style={{ maxWidth: "400px" }}>
                <Card>
                    <Card.Img variant="top" src="https://www.lakepowell.com/media/822008/lake-powell-resorts-wahweap-marina-building-1-1000x500.jpg" /> 
                    <Card.Body>
                        <h2 className="text-center mb-4">Sail Master II Login</h2> 
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    required 
                                    name="username"
                                    type="text" 
                                    placeholder="Username" 
                                    value={formData.username}
                                    onChange={handleChange}
                                />
                                <Form.Control.Feedback type="invalid">Please enter your username.</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    required 
                                    name="password"
                                    type="password" 
                                    placeholder="Password" 
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                <Form.Control.Feedback type="invalid">Please enter your password.</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group>
                                {formErrors.length ? <Alert type="danger" messages={formErrors} /> : null}
                            </Form.Group>

                            <Form.Group>
                                <Button className="w-100" type="submit">
                                    Login
                                </Button>
                            </Form.Group>
                        </Form> 
                    </Card.Body>
                </Card>
            </div>
        </Container>
    )
}

export default LoginForm