import { Card, Container, Row, Col } from 'react-bootstrap'
import Header from './Header'
import {FaClock, FaWifi, FaTshirt, FaCocktail} from 'react-icons/fa'

const HotelService = () => {
    return (
        <>
            <Container className="mb-5 px-0">
                <Header title={"Our Services"} />
                <Row>
                    <h4 className="text-center">
                        Services at <span className="hotel-color">My Daisy Hotel </span>
                        <span className="gap-3"><FaClock/> - 24-Hour Front Desk</span>
                    </h4>
                </Row>
                <hr />
                <Row xs={1} md={2} lg={3} className="g-4 mt-2">
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title className="hotel-color">
                                    <FaWifi /> Wifi
                                </Card.Title>
                                <Card.Text>
                                    Stay connected with the world wide web
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title className="hotel-color">
                                    <FaTshirt /> Laundry
                                </Card.Title>
                                <Card.Text>
                                    Laundry service
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title className="hotel-color">
                                    <FaCocktail /> Mini-bar
                                </Card.Title>
                                <Card.Text>
                                    Time to dive into an energentic atmosphere
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default HotelService
