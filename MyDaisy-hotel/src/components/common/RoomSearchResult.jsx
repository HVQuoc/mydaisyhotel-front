import { useState } from 'react'
import { Row, Button } from 'react-bootstrap'
import RoomCard from '../room/RoomCard'
import RoomPagination from './RoomPagination' 

const RoomSearchResult = ({ results, onClearSearch }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const resultPerPage = 3
    const totalResult = results.length
    const totalPages = Math.ceil(totalResult / resultPerPage)
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const startIndex = (currentPage - 1) * resultPerPage
    const endIndex = startIndex + resultPerPage
    const paginatedResults = results.slice(startIndex, endIndex)

    return (
        <>
            {results.length > 0 ? (
                <>
                    <h5 className="text-center mt-5">Search Results</h5>
                    <Row>
                        {paginatedResults.map((room) => (
                            <RoomCard key={room.id} room={room} />
                        ))}
                    </Row>
                    <Row>
                        {totalResult > resultPerPage && (
                            <RoomPagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        )}
                        <Button variant="secondary" onClick={onClearSearch}>
                            Clear Search
                        </Button>
                    </Row>
                </>
            ) : (
                <p></p>
            )}
        </>
    )
}

export default RoomSearchResult
