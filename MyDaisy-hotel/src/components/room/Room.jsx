import React, { useEffect, useState } from 'react'
import { getAllRooms } from '../utils/ApiFunctions'
import RoomCard from './RoomCard'
import { Container, Row, Col } from 'react-bootstrap'
import RoomFilter from '../common/RoomFilter'
import RoomPagination from '../common/RoomPagination'

const Room = () => {
    const [data, setData] = useState([])
    const [filteredData, setFilterdData] = useState([])
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [roomPerPage, setRoomPerPage] = useState(6)

    useEffect(() => {
        setIsLoading(true)
        getAllRooms().then((rooms) => {
            setData(rooms)
            setFilterdData(rooms)
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

    const totalPage = Math.ceil(filteredData.length / roomPerPage)
    const renderRooms = () => {
        const startIndex = (currentPage - 1) * roomPerPage
        const endIndex = startIndex + roomPerPage
        return filteredData.slice(startIndex, endIndex).map(room => (<RoomCard key={room.id} room={room} />))
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    return (
        <Container>
            <Row>
                <Col md={8} className="mb-3 mb-md-0">
                    <RoomFilter data={data} setFilteredData={setFilterdData} />
                </Col>
                <Col md={4} className="d-flex justify-content-end align-items-end">
                    <RoomPagination
                        currentPage={currentPage}
                        totalPages={totalPage}
                        onPageChange={handlePageChange}
                    />
                </Col>
            </Row>
            <Row>{renderRooms()}</Row>
            <Row>
                <Col md={12} className="d-flex justify-content-center align-items-center">
                    <RoomPagination
                        currentPage={currentPage}
                        totalPages={totalPage}
                        onPageChange={handlePageChange}
                    />
                </Col>
            </Row>
        </Container>
    )
}

export default Room
