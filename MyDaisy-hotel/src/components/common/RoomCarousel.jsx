import {useState, useEffect } from 'react'
import { Card, Carousel, Col, Row, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {getAllRooms} from '../utils/ApiFunctions'

const RoomCarousel = () => {
    const [rooms, setRooms] = useState([])
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        getAllRooms().then((rooms) => {
            setRooms(rooms)
            setIsLoading(false)
        }).catch(error => {
            setError(error.message)
            setIsLoading(false)
        })
    }, [])

    if (isLoading) {
        return (<div>Loading rooms...</div>)
    }
    if (error) {
        return (<div>Error: {error}</div>)
    }
    return (
        <section className="bg-light my-5 shadow">
            <Link to={"/browse-all-rooms"}>Browse all rooms</Link>
            <Container>
                <Carousel indicators={false}>
                    {/* <Carousel.Item> item 1, </Carousel.Item>
                    <Carousel.Item> item 2, </Carousel.Item>
                    <Carousel.Item> item 3, </Carousel.Item> */}
                    {[...Array(Math.ceil(rooms.length / 4))].map((_, index) => (
                        <Carousel.Item key={index}>
                            <Row>
                                {rooms.slice(index * 4, index * 4 + 4).map((room) => (
                                    <Col key={room.id} className="mb-4" xs={12} md={6} lg={3}>
                                        <Card>
                                            <Link to={`/book-room/${room.id}`}>
                                                <Card.Img
                                                    variant="top"
                                                    src={`data:image/jpeg;base64, ${room.photo}`}
                                                    alt="Room's image"
                                                    className="w-100"
                                                    style={{ height: "200px" }}
                                                >
                                                </Card.Img>
                                            </Link>
                                            <Card.Body>
                                                <Card.Title className="hotel-color">{room.roomType}</Card.Title>
                                                <Card.Title className="room-price">{room.roomPrice}</Card.Title>
                                                <div className="flex-shrink-0 mt-3">
                                                    <Link to={`bookings/${room.id}`} className="btn btn-hotel btn-sm">
                                                        Book now
                                                    </Link>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </Container>
        </section>
    )
}

export default RoomCarousel
