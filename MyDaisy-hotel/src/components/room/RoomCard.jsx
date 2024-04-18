import { Col, Card, CardBody } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const RoomCard = ({ room }) => {
    return (
        <Col className="mb-4" xs={12}>
            <Card>
                <CardBody className="d-flex flex-wrap align-items-center">
                    <div className="flex-shrink-0 mr-3 mb-3 mb-md-0">
                        <Card.Img
                            variant="top"
                            src={`data:image/jpeg;base64, ${room.photo}`}
                            alt="Room's photo"
                            style={{ width: "100%", maxWidth: "200px", height: "auto" }}
                        />
                    </div>
                    <div className="flex-grow-1 ml-3 px-5">
                        <Card.Title className="hotel-color">{room.roomType}</Card.Title>
                        <Card.Title className="room-price">{room.roomPrice}</Card.Title>
                        <Card.Text>Lorem ipsums</Card.Text>
                    </div>
                    <div className="flex-shrink-0 mt-3">
                        <Link to={`bookings/${room.id}`} className="btn btn-hotel btn-sm">
                            Book now
                        </Link>
                    </div>
                </CardBody>
            </Card>
        </Col>
    )
}

export default RoomCard