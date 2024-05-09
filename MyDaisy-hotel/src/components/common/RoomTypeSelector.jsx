import { useEffect, useState } from 'react'
import { getRoomTypes } from '../utils/ApiFunctions'
const RoomTypeSelector = ({ handleRoomInputChange, roomProps }) => {
    const [roomTypes, setRoomTypes] = useState([])
    const [newRoomType, setNewRoomType] = useState("")
    const [showNewRoomTypeInput, setShowNewRoomTypeInput] = useState(false)

    useEffect(() => {
        getRoomTypes().then(data => {
            setRoomTypes(data)
        })
    }, [])

    const handleNewRoomTypeInput = (e) => {
        const inputValue = e.target.value
        setNewRoomType(inputValue)
    }

    const handleAddNewRoomType = (e) => {
        if (e.target.vale != "") {
            setRoomTypes(prev => [...prev, newRoomType])
            setNewRoomType("")
            setShowNewRoomTypeInput(false)
        }
    }

    return (
        <>
            <div>
                <select
                    id="roomType"
                    name="roomType"
                    className="form-select"
                    value={roomProps?.roomType}
                    onChange={(e) => {
                        if (e.target.value == "Add new")
                            setShowNewRoomTypeInput(true)
                        else
                            handleRoomInputChange(e)
                    }}
                >
                    <option value={""}>Select a room type</option>
                    <option value={"Add new"}>Add new type</option>
                    {roomTypes?.length > 0 && roomTypes.map(roomType =>
                        <option key={roomType} value={roomType}>
                            {roomType}
                        </option>
                    )}
                </select>
            </div>

            {showNewRoomTypeInput && (
                <div className="input-group">
                    <input
                        className="form-control"
                        type="text"
                        value={newRoomType}
                        onChange={handleNewRoomTypeInput}
                    />
                    <button
                        className="btn btn-hotel"
                        type="button"
                        onClick={handleAddNewRoomType}
                    >
                        Add
                    </button>
                </div>
            )}
        </>
    )
}

export default RoomTypeSelector
