// import React, { useState, useContext } from 'react' 
import React, { useState, useContext, useEffect } from 'react' 
import UserContext from '../helpers/UserContext' 
import { useNavigate } from 'react-router-dom'
import { Container, Card, Form, Button } from 'react-bootstrap' 

const Profile = ({ saveProfile }) => {
    const { currentUser } = useContext(UserContext)
    const [didMount, setDidMount] = useState(false) 

    const INITIAL_STATE = {
        username: currentUser.username, 
        firstName: currentUser.firstName, 
        lastName: currentUser.lastName, 
        email: currentUser.email, 
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

    const handleSubmit = async (e) => {
        const form = e.currentTarget 
        if(form.checkValidity() === false) {
            e.preventDefault()
            e.stopPropagation() 
        } else {
            e.preventDefault()
            await saveProfile(formData) 
            setFormData({
                ...formData,
                password: ''
            })
            alert('Change successful')
            navigate('/') 
        }
        setValidated(true) 
    }

    // useEffect to fix memory leak for not having a cleanup function
    useEffect(() => {
        setDidMount(true)
        return () => setDidMount(false)
    }, [])

    if(!didMount) {
        return null 
    }
    
    return (
        <Container className="d-flex align-items-center justify-content-center mt-4">
            <div className="w-100" style={{ maxWidth: "400px" }}>
                <Card>
                    <Card.Body>
                        <h2 className="text-center mb-4">Profile</h2> 
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            
                        <Form.Group className="mb-3">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    readOnly
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
                                <Button className="w-100" type="submit">
                                    Save Changes
                                </Button>
                            </Form.Group>
                        </Form> 
                    </Card.Body>
                </Card>
            </div>
        </Container>
    )
}

export default Profile