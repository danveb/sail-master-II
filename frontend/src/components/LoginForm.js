import React, { useState } from 'react' 
import { useNavigate } from 'react-router-dom' 
import { Container, Card, Form, Button } from 'react-bootstrap' 

const LoginForm = ({ login }) => {
    /** INITIAL_STATE object holds username, password */
    const INITIAL_STATE = {
        username: '',
        password: ''
    }

    // formData, setFormdata state 
    const [formData, setFormData] = useState(INITIAL_STATE)

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
            login(formData)
            navigate('/')
        }
        setValidated(true) 
    }

    return (
        <Container className="d-flex align-items-center justify-content-center mt-4">
            <div className="w-100" style={{ maxWidth: "400px" }}>
                <Card>
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