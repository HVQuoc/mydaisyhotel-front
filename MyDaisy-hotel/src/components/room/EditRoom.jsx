import { useEffect, useState } from "react"
import { addRoom, getRoomById, updateRoom } from "../utils/ApiFunctions"
import RoomTypeSelector from "../common/RoomTypeSelector"
import { useParams } from "react-router-dom"

const EditRoom = () => {
    const { roomId } = useParams()
    const [room, setRoom] = useState({
        roomType: "",
        roomPrice: "",
        photo: null
    })
    const [imagePreview, setImagePreview] = useState("")
    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")

    const handleRoomInputChange = (e) => {
        const name = e.target.name
        let value = e.target.value

        if (name == "roomPrice") {
            if (isNaN(value) || value == "") {
                value = ""
            } else {
                value = parseInt(value)
            }
        }
        setRoom({ ...room, [name]: value })
    }

    const handleImageSelection = (e) => {
        const selectedImage = e.target.files[0]
        setRoom({ ...room, photo: selectedImage })
        setImagePreview(selectedImage)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            console.log(room)
            const response = await updateRoom(roomId, room)
            if (response.status == 200) {
                console.log("Updated room successfully!")
                setSuccess("Updated room successfully!")
                const updatedRoom = await getRoomById(roomId)
                setRoom({...updatedRoom})
                setImagePreview(updatedRoom.photo)
                setError("")
            } else {
                setError("Error updating room")
            }
        } catch (err) {
            console.log(err)
            setError(err.message)
        }
    }

    useEffect(() => {
        const fetchRoom = async () => {
            try {
                const roomData = await getRoomById(roomId)
                setRoom({...roomData})
                setImagePreview(roomData.photo)
            } catch (err) {
                setError(err.message)
            }
        }

        fetchRoom()
    }, [roomId])

    return (
        <>
            <section className="container mt-5 mb-5">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <h2 className="mt-5 mb-2">Edit room</h2>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="roomType" className="form-label">Room type</label>
                                <input
                                    required
                                    className="form-control"
                                    id="roomType"
                                    name="roomType"
                                    value={room.roomType}
                                    onChange={handleRoomInputChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="roomPrice" className="form-label">Room price</label>
                                <input
                                    required
                                    className="form-control"
                                    id="roomPrice"
                                    name="roomPrice"
                                    value={room.roomPrice}
                                    onChange={handleRoomInputChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="photo" className="form-label">Photo</label>
                                <input
                                    className="form-control"
                                    id="photo"
                                    type="file"
                                    onChange={handleImageSelection}
                                />

                                {imagePreview && (
                                    <div className="my-4">
                                        <img
                                            src={`data:image/jpeg;base64,${imagePreview}`}
                                            alt="room image preview"
                                            style={{ maxWidth: "400px", maxHeight: "400px" }}
                                            className="mb-3"
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="d-grid d-md-flex mt-2">
                                <button
                                    className="btn btn-outline-primary ml-5"
                                >
                                    Save change
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default EditRoom
