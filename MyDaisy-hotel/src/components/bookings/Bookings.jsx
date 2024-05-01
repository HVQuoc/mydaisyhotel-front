import { useEffect, useState } from 'react'
import { cancelBooking, getAllBookings } from '../utils/ApiFunctions'
import Header from '../common/Header'
import BookingTables from './BookingTables'

const Bookings = () => {
    const [bookingInfo, setBookingInfo] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        setTimeout(() => {
            getAllBookings().then(data => {
                setBookingInfo(data)
                setIsLoading(false)
            }).catch(error => {
                setError(error.message)
                setIsLoading(false)
            })
        }, 1000)
    }, [])

    const handleBookingCancellation = async (bookingId) => {
        try {
            await cancelBooking(bookingId)
            const newFetchBookings = await getAllBookings()
            setBookingInfo(newFetchBookings)
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <section className="container">
            <Header title={"Existing bookings"}/>
            {error && (<div className="text-danger">{error}</div>)}
            {isLoading && (<p>Loading booking information...</p>)}
            {!isLoading && (
                <BookingTables 
                    bookingInfo={bookingInfo}
                    handleBookingCancellation={handleBookingCancellation}
                />
            )}
        </section>
    )
}

export default Bookings
