import React, { useState } from 'react' 
import { useNavigate } from 'react-router-dom' 
import { Container, Card, Form, Button } from 'react-bootstrap' 
import Alert from '../helpers/Alert' 

const SignupForm = ({ signup }) => {
    // formData, setFormdata state by default 
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: ''
    })

    // formValidation to be HTML5 validation
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
            let result = await signup(formData) 
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
                <Card.Img variant="top" src="https://images.fineartamerica.com/images-medium-large-5/dusable-harbor-chicago-steve-gadomski.jpg" /> 
                
                    <Card.Body>
                        <h2 className="text-center mb-4">Sail Master II Registration</h2> 
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

                            <Form.Group className="mb-3">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    required 
                                    name="firstName"
                                    type="text" 
                                    placeholder="First Name" 
                                    value={formData.firstName}
                                    onChange={handleChange}
                                />
                                <Form.Control.Feedback type="invalid">Please enter your first name.</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    required 
                                    name="lastName"
                                    type="text" 
                                    placeholder="Last Name" 
                                    value={formData.lastName}
                                    onChange={handleChange}
                                />
                                <Form.Control.Feedback type="invalid">Please enter your last name.</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    required
                                    name="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                <Form.Control.Feedback type="invalid">Please enter your email.</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group>
                                {formErrors.length ? <Alert type="danger" messages={formErrors} /> : null}
                            </Form.Group>

                            <Form.Group>
                                <Button className="w-100" type="submit">
                                    Sign Up
                                </Button>
                            </Form.Group>
                        </Form> 
                    </Card.Body>
                </Card>
            </div>
        </Container>
    )
}

export default SignupForm