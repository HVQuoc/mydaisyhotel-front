import { useEffect, useState } from "react";
import {
  getBookingByConfirmationCode,
  cancelBooking,
} from "../utils/ApiFunctions";
import { Spinner } from "react-bootstrap";

const FindBooking = () => {
  const [confirmationCode, setConfirmationCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [bookingInfo, setBookingInfo] = useState({
    bookingId: "",
    bookingConfirmationCode: "",
    room: { id: "", roomType: "" },
    roomNumber: "",
    checkInDate: "",
    checkOutDate: "",
    guestFullName: "",
    guestEmail: "",
    numOfAdults: "",
    numOfChildren: "",
    totalNumOfGuest: "",
  });

  const emptyBookingInfo = {
    bookingId: "",
    bookingConfirmationCode: "",
    room: { id: "", roomType: "" },
    roomNumber: "",
    checkInDate: "",
    checkOutDate: "",
    guestFullName: "",
    guestEmail: "",
    numOfAdults: "",
    numOfChildren: "",
    totalNumOfGuest: "",
  };

  const [isDeleted, setIsDeleted] = useState(false);

  const handleInputChange = (event) => {
    setConfirmationCode(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    useEffect(()=> {
        const fetchBooking = async () => {
            try {
                const data = await getBookingByConfirmationCode(confirmationCode);
                setBookingInfo(data);
                setError("");
              } catch (error) {
                setBookingInfo(emptyBookingInfo);
                if (error.response && error.response.status == 404) {
                  setError(error.response.data.message);
                  console.log("error", error);
                } else {
                  setError(error.message);
                }
              }
        }
        fetchBooking()
    }, [])
    

    setTimeout(() => setIsLoading(false), 2000);
  };

  const handleBookingCancellation = async (bookingId) => {
    try {
      await cancelBooking(bookingId);
      setIsDeleted(true);
      setSuccessMessage("Booking has been cancelled successfully!");
      setBookingInfo(emptyBookingInfo);
      setConfirmationCode("");
      setError(null);
    } catch (error) {
      setError(error.message);
    }
    setTimeout(() => {
      setSuccessMessage("");
      setIsDeleted(false);
    }, 2000);
  };

  return (
    <>
      <div className="container mt-5 d-flex flex-column justify-content-center align-items-center">
        <h2 className="text-center mb-4">Find My Booking</h2>
        <form onSubmit={handleSubmit} className="col-md-6 mb-3">
          <div className="input-group mb-3">
            <input
              className="form-control"
              type="text"
              id="confirmationCode"
              name="confirmationCode"
              value={confirmationCode}
              onChange={handleInputChange}
              placeholder="Enter the booking confirmation code"
            />
          </div>
          <button type="submit" className="btn btn-hotel input-group-text">
            Find booking
          </button>
        </form>

        {error && (<div className="text-danger">Error: {error}</div>)}
        {isLoading ? (<Spinner />) : 
          bookingInfo.bookingConfirmationCode && (
          <div className="col-md-6 mt-4 mb-5">
            <h3>Booking Information</h3>
            <p className="text-success">
              Confirmation Code: {bookingInfo.bookingConfirmationCode}
            </p>
            <p>Room Number: {bookingInfo.room.id}</p>
            <p>Room Type: {bookingInfo.room.roomType}</p>
            <p>
              Check-in Date: {bookingInfo.checkInDate}
              {/* {moment(bookingInfo.checkInDate).format("MMM Do, YYYY")} */}
            </p>
            <p>
              Check-out Date: {bookingInfo.checkOutDate}
              {/* {moment(bookingInfo.checkInDate).format("MMM Do, YYYY")} */}
            </p>
            <p>Full Name: {bookingInfo.guestFullName}</p>
            <p>Email Address: {bookingInfo.guestEmail}</p>
            <p>Adults: {bookingInfo.numOfAdults}</p>
            <p>Children: {bookingInfo.numOfChildren}</p>
            <p>Total Guest: {bookingInfo.totalNumOfGuest}</p>

            {!isDeleted && (
              <button
                onClick={() => handleBookingCancellation(bookingInfo.bookingId)}
                className="btn btn-danger"
              >
                Cancel Booking
              </button>
            )}
          </div>
        )}

        {isDeleted && (
          <div className="alert alert-success mt-3 fade show">
            {successMessage}
          </div>
        )}
      </div>
    </>
  );
};

export default FindBooking;
