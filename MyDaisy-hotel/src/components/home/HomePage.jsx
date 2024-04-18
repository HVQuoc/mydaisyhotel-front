import MainHeader from '../layout/MainHeader'
import Parallax from '../common/Parallax'
import HotelService from '../common/HotelService'
import RoomCarousel from '../common/RoomCarousel'

const HomePage = () => {
  return (
    <section>
      <MainHeader />
      <section className="container">
        <Parallax />
        <RoomCarousel />
        <HotelService />
        <Parallax />
      </section>
    </section>
  )
}

export default HomePage
