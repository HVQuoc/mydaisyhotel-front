import { useState, useEffect } from 'react'
import { parseISO } from 'date-fns'
import DateSlider from '../common/DateSlider'

const BookingTables = ({ bookingInfo, handleBookingCancellation }) => {
    const [filteredBookings, setFilteredBookings] = useState(bookingInfo)

    const filterBooking = (startDate, endDate) => {
        let filtered = bookingInfo
        if (startDate && endDate) {
            filtered = bookingInfo.filter(booking => {
                const bookingCheckInDate = parseISO(booking.checkInDate)
                const bookingCheckOutDate = parseISO(booking.checkOutDate)
                return bookingCheckInDate >= startDate && bookingCheckOutDate <= endDate
                    && bookingCheckOutDate > startDate
            })
        }
        setFilteredBookings(filtered)
    }

    useEffect(() => {
        setFilteredBookings(bookingInfo)
    }, [bookingInfo])

    return (
        <section className="p-4">
            <DateSlider onDateChange={filterBooking} onFilterChange={filterBooking} />
            <table>
                <thead>
                    <tr>
                        <th>S/N</th>
                        <th>Booking ID</th>
                        <th>Room ID</th>
                        <th>Check-in date</th>
                        <th>Check-out date</th>
                        <th>Guest name</th>
                        <th>Guest email</th>
                        <th>Adult</th>
                        <th>Children</th>
                        <th>Total guest</th>
                        <th>Confirmation code</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {filteredBookings.map((booking, index) => (
                        <tr key={booking.id}>
                            <td>{index + 1}</td>
                            <td>{booking.id}</td>
                            <td>{booking.room.id}</td>
                            <td>{booking.checkInDate}</td>
                            <td>{booking.checkOutDate}</td>
                            <td>{booking.guestFullName}</td>
                            <td>{booking.guestEmail}</td>
                            <td>{booking.numOfAdults}</td>
                            <td>{booking.numOfChildren}</td>
                            <td>{booking.totalNumOfGuest}</td>
                            <td>{booking.bookingConfirmationCode}</td>
                            <td>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleBookingCancellation(booking.id)}
                                >
                                    Cancel
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {filteredBookings.length === 0 && (<p>No booking found for that the selected dates.</p>)}
        </section>
    )
}

export default BookingTables
