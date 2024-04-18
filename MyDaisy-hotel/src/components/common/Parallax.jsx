import { Container } from 'react-bootstrap'

const Parallax = () => {
    return (
        <div className="parallax mb-5">
            <Container className="text-center p-5 justify-content-center">
                <div className="animated-text bouncedIn">
                    <h1>
                        Welcome to <span className="hotel-color">My Daisy Hotel</span>
                    </h1>
                    <h3>We offer the best services for all your needs</h3>
                </div>
            </Container>
        </div>
    )
}

export default Parallax
