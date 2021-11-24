import React from 'react' 
import { Container, Card } from 'react-bootstrap' 

const Home = ({ currentUser }) => {
    return (
        <Container className="d-flex align-items-center justify-content-center mt-4 mb-4">
            <Card className="bg-dark text-white">
                <Card.ImgOverlay bsPrefix>
                    {currentUser && (
                        <div className="text-center">
                            <h1>Welcome, {currentUser.firstName}</h1>
                            <p>You can go ahead and create a Voyage</p>
                        </div>
                    )}

                    {!currentUser && (
                        <div className="text-center">
                            <h1>Welcome to Sail Master II</h1>
                            <p>Please register if this is your first time!</p>
                            <p>Happy Sailing!</p>
                        </div>
                    )}
                    <Card.Img src="https://pbs.twimg.com/media/EAuIfRHXUAAE2S_.jpg" alt="Card image" />
                </Card.ImgOverlay>
            </Card>
        </Container>
    )
}

export default Home 