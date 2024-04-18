import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "/node_modules/bootstrap/dist/js/bootstrap.min.js"
import AddRoom from './components/room/AddRoom'
import ExistingRoom from './components/room/ExistingRooms'
import EditRoom from './components/room/EditRoom'
import { Router, Route, Routes } from "react-router-dom"
import HomePage from "./components/home/HomePage"
import NavBar from "./components/layout/NavBar"
import Footer from "./components/layout/Footer"

function App() {

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/existing-rooms" element={<ExistingRoom />} />
        <Route path="/edit-room/:roomId" element={<EditRoom />} />
        <Route path="/new-room" element={<AddRoom />} />
      </Routes>
      <Footer />  
    </>
  )
}

export default App
