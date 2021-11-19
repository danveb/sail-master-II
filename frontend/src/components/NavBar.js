import React from 'react' 
import { Link } from 'react-router-dom' 
import { Navbar, Nav } from 'react-bootstrap' 

const NavBar = ({ currentUser, logout }) => {
    return (
        <Navbar bg="light" expand="md">
            <Navbar.Brand>
                <Nav.Link as={Link} to="/">Sail Master II</Nav.Link>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
                {currentUser && (
                    <Nav className="ml-auto">
                        <Nav.Item>
                            <Nav.Link as={Link} to="/clubs">Clubs</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/voyage">Voyage</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/" onClick={logout}>Logout</Nav.Link>
                        </Nav.Item>
                    </Nav>
                )}

                {/* if not a currentUser just display clubs/login/signup */}
                {!currentUser && (
                    <Nav className="ml-auto">
                        <Nav.Item>
                            <Nav.Link as={Link} to="/clubs">Clubs</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
                        </Nav.Item>
                    </Nav>
                )}
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBar