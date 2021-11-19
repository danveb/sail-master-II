import React from 'react' 
import { Container } from 'react-bootstrap' 

const Home = ({ currentUser }) => {
    const greetUser = (currentUser) => {
        let user = currentUser.firstName[0].toUpperCase().concat(currentUser.firstName.slice(1).concat('!'))
        return user; 
    }

    return (
        <Container className="d-flex align-items-center justify-content-center mt-4">
            {currentUser && (
                <div className="w-100 text-center">
                    <h1>Welcome, {greetUser(currentUser)} </h1>
                    <p>You can go ahead and create a Voyage</p>
                </div>
            )}

            {!currentUser && (
                <div className="w-100 text-center">
                    <h1>Welcome to Sail Master II</h1>
                    <p>Please register if this is your first time!</p>
                    <p>Happy Sailing!</p>
                </div>
            )}
        </Container>
    )
}

export default Home 