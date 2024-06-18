import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "/node_modules/bootstrap/dist/js/bootstrap.min.js"
import AddRoom from './components/room/AddRoom'
import ExistingRoom from './components/room/ExistingRooms'
import EditRoom from './components/room/EditRoom'
import { Route, Routes } from "react-router-dom"
import HomePage from "./components/home/HomePage"
import NavBar from "./components/layout/NavBar"
import Footer from "./components/layout/Footer"
import RoomListing from "./components/room/RoomListing"
import CheckOut from "./components/bookings/CheckOut"
import BookingSuccess from "./components/bookings/BookingSuccess"
import Bookings from "./components/bookings/Bookings"
import FindBooking from "./components/bookings/FindBooking"
import Admin from "./components/admin/Admin"
import Login from "./components/auth/Login"
import Registration from "./components/auth/Registration"
import Profile from "./components/auth/Profile"
import Logout from "./components/auth/Logout"
import AuthProvider from "./components/auth/AuthProvider"
import RequiredAuth from "./components/auth/RequiredAuth"

function App() {

  return (
    <>
      <AuthProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/existing-rooms" element={<ExistingRoom />} />
          <Route path="/edit-room/:roomId" element={<EditRoom />} />
          <Route path="/new-room" element={<AddRoom />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/book-room/:roomId" element={<RequiredAuth><CheckOut /></RequiredAuth>} />
          <Route path="/booking-success" element={<BookingSuccess />} />
          <Route path="/browse-all-rooms" element={<RoomListing />} />
          <Route path="/existing-bookings" element={<Bookings />} />
          <Route path="/find-booking" element={<FindBooking />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </>
  )
}

export default App
