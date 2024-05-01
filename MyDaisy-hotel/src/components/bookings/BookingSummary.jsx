import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "react-bootstrap"
import moment from "moment"

const BookingSummary = ({ booking, payment, isFormValid, onConfirm }) => {
    const navigate = useNavigate()
    const checkInDate = moment(booking.checkInDate)
    const checkOutDate = moment(booking.checkOutDate)
    const numOfDays = checkOutDate.diff(checkInDate, "days")
    const [isBookingConfirmed, setIsBookingConfirmed] = useState(false)
    const [isProcessingPayment, setIsProcessingPayment] = useState(false)

    const handleConfirmBooking = () => {
        setIsProcessingPayment(true)
        setTimeout(() => {
            setIsProcessingPayment(false)
            setIsBookingConfirmed(true)
            onConfirm()
        }, 3000)
    }

    /* useEffect(() => {
        if (isBookingConfirmed) {
            navigate("/booking-success")
        }
    }, [isBookingConfirmed, navigate]) */

    return (
        <div className="card card-body mt-5">
            <h4>Reservation Summary</h4>
            <p>Full name: <strong>{booking.guestFullName}</strong></p>
            <p>Email: <strong>{booking.guestEmail}</strong></p>
            <p>Check-in date: <strong>{moment(booking.checkInDate).format("MMM Do YYYY")}</strong></p>
            <p>Check-out date: <strong>{moment(booking.checkOutDate).format("MMM Do YYYY")}</strong></p>
            <p>Number of days: <strong>{numOfDays}</strong></p>
            <div>
                <h5>Number of guests</h5>
                <strong>Adults: {booking.numOfAdults}</strong>
                <br />
                <strong>Children: {booking.numOfChildren}</strong>
            </div>
            <hr />
            {payment > 0 ? (
                <>
                    <p>Total payment: <strong>{payment}</strong></p>
                    {isFormValid && !isBookingConfirmed ? (
                        <Button
                            variant="success"
                            onClick={handleConfirmBooking}
                        >
                            {isProcessingPayment ? (
                                <>
                                    <span
                                        className="spinner-border spinner-border-sm mr-2"
                                        role="status"
                                        aria-hidden="true"
                                    > </span>
                                    Booking confirmed, redirecting to payment...
                                </>
                            ) : (
                                "Confirm booking and proceed to payment"
                            )}
                        </Button>
                    ) : isBookingConfirmed ? (<p>Loading...</p>) : null}
                </>) : (
                <p className="text-danger">Payment invalid. Please fill in the form with the requirement.</p>)
            }
        </div>
    )
}

export default BookingSummary
