import React, { useState, useContext, useEffect } from 'react' 
import UserContext from '../helpers/UserContext' 
import { Container, Card, Form, Button } from 'react-bootstrap' 
import SailMasterIIApi from '../API/api'
import Alert from '../helpers/Alert' 

const ProfileForm = () => {
    // useContext
    const { currentUser, setCurrentUser } = useContext(UserContext)
    // keep track of profile save 
    const [saveConfirmed, setSaveConfirmed] = useState(false) 
    // console.log(currentUser) 
    
    // initial state of form to be currentUser's data
    const [formData, setFormData] = useState({
        username: currentUser.username, 
        firstName: currentUser.firstName, 
        lastName: currentUser.lastName, 
        email: currentUser.email, 
        password: ''
    })
    
    // formValidation to be HTML5 validation
    const [validated, setValidated] = useState(false) 
    
    const [formErrors, setFormErrors] = useState([])
    
    // useEffect to fix memory leak for not having a cleanup function
    const [didMount, setDidMount] = useState(false) 

    useEffect(() => {
        setDidMount(true)
        return () => setDidMount(false)
    }, [])

    if(!didMount) {
        return null 
    }

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
        } else {
            e.preventDefault() 
            try {
                await SailMasterIIApi.saveProfile(formData) 
            } catch(errors) {
                setFormErrors(errors) 
                return 
            }
            setFormErrors([])
            setSaveConfirmed([])
            // trigger reloading of user information throughout the site
            setCurrentUser(currentUser)
        }
        setValidated(true) 
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
                                {formErrors.length ? <Alert type="danger" messages={formErrors} /> : null}
                                
                                {saveConfirmed ? ( <Alert type="success" messages={["Updated successfully."]} /> ) : null}
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

export default ProfileForm