import MainHeader from '../layout/MainHeader'
import Parallax from '../common/Parallax'
import HotelService from '../common/HotelService'
import RoomCarousel from '../common/RoomCarousel'
import RoomSearch from '../common/RoomSearch'
import { useLocation } from 'react-router-dom'

const HomePage = () => {
  const location = useLocation()
  const message = location.state && location.state.message
  const currentUser = localStorage.getItem("userId")
  return (
    <section>
      {message && (<p className="text-warning p-4">{message}</p>)}
      {currentUser && (<h6 className="text-success text-center my-2">You are logging as {currentUser}</h6>)}
      <MainHeader />
      <section className="container">
        <RoomSearch />
        <Parallax />
        <RoomCarousel />
        <HotelService />
        <Parallax />
      </section>
    </section>
  )
}

export default HomePage
