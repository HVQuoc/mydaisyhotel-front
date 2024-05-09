import MainHeader from '../layout/MainHeader'
import Parallax from '../common/Parallax'
import HotelService from '../common/HotelService'
import RoomCarousel from '../common/RoomCarousel'
import RoomSearch from '../common/RoomSearch'

const HomePage = () => {
  return (
    <section>
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
