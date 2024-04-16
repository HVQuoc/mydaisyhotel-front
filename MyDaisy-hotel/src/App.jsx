import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "/node_modules/bootstrap/dist/js/bootstrap.min.js"
import AddRoom from './components/room/AddRoom'
import ExistingRoom from './components/room/ExistingRooms'
import EditRoom from './components/room/EditRoom'
import { Route, Routes } from "react-router-dom"

function App() {

  return (
    <>
      <Routes>
        <Route path="/existing-rooms" element={<ExistingRoom />} />
        <Route path="/edit/:roomId" element={<EditRoom />} />
        <Route path="/new-room" element={<AddRoom />} />
      </Routes>
      
      
    </>
  )
}

export default App
