import { useEffect, useState } from 'react'
import { getAllRooms, deleteRoom } from '../utils/ApiFunctions'
import { Col, Row } from 'react-bootstrap'
import RoomFilter from '../common/RoomFilter'
import RoomPagination from '../common/RoomPagination'
import { FaEdit, FaEye, FaTrashAlt, FaPlus } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const ExistingRooms = () => {

    // this is all the rooms of this component
    const [rooms, setRooms] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [roomPerPage] = useState(8)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [successMessage, setSuccessMessage] = useState("")

    // this holds the filtered room whenever the filter is applied
    const [filteredRooms, setFilteredRooms] = useState([])
    const [selectedRoomType, setSelectedRoomType] = useState("")

    useEffect(() => {
        fetchAllRooms()
    }, [])

    useEffect(() => {
        if (selectedRoomType == "") {
            setFilteredRooms(rooms)
        } else {
            const filtered = rooms.filter(room => room.roomType == selectedRoomType)
            setFilteredRooms(filtered)
        }
        setCurrentPage(1)
    }, [rooms, selectedRoomType])

    const calculateTotalPages = (filteredRooms, roomPerPage, rooms) => {
        const totalRooms = filteredRooms.length > 0 ? filteredRooms.length : rooms.length
        return Math.ceil(totalRooms / roomPerPage)
    }

    const handlePaginationClick = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const handleDeleteRoom = async (roomId) => {
        try {
            const result = await deleteRoom(roomId);
            if (result === "") {
                setSuccessMessage(`Deleted room with no ${roomId}`)
                fetchAllRooms()
            }
        } catch (err) {
            console.log("Error deleting room")
        }
    }

    const lastRoomIndex = currentPage * roomPerPage
    const firstRoomIndex = lastRoomIndex - roomPerPage
    const currentRooms = filteredRooms.slice(firstRoomIndex, lastRoomIndex)

    const fetchAllRooms = async () => {
        setIsLoading(true)
        try {
            const result = await getAllRooms();
            setRooms(result)
            setIsLoading(false)
        } catch (err) {
            setError(err.message)
        }
    }
    return (
        <>
            {isLoading ? (
                <p>Loading existing rooms...</p>
            ) : (
                <>
                    <section className="my-5 container">
                        <div className="d-flex justify-content-center mb-3 mt-5">
                            <h2>Existing rooms</h2>
                        </div>

                        <Row>
                            <Col md={6} className="mb-3 mb-md-0">
                                <RoomFilter data={rooms} setFilteredData={setFilteredRooms} />
                            </Col>
                            <Col md={6} className="d-flex justify-content-end">
                                <Link to="/new-room">
                                    <FaPlus /> Add room
                                </Link>
                            </Col>
                        </Row>

                        <table className="table-border table-hover">
                            <thead>
                                <tr className="text-center">
                                    <th>ID</th>
                                    <th>Room type</th>
                                    <th>Room price</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentRooms.map(room => (
                                    <tr key={room.id} className="text-center">
                                        <td>{room.id}</td>
                                        <td>{room.roomType}</td>
                                        <td>{room.roomPrice}</td>
                                        <td className="gap-2">
                                            <Link to={`/edit-room/${room.id}`}>
                                                <span className="btn btn-info btn-sm"><FaEye /></span>
                                                <span className="btn btn-info btn-sm"><FaEdit /></span>
                                            </Link>
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => handleDeleteRoom(room.id)}
                                            >
                                                <FaTrashAlt />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <RoomPagination
                            currentPage={currentPage}
                            totalPages={calculateTotalPages(filteredRooms, roomPerPage, rooms)}
                            onPageChange={handlePaginationClick}
                        />
                    </section>
                </>
            )}
        </>
    )
}

export default ExistingRooms
