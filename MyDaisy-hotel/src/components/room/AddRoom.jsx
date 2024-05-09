import { useState } from "react"
import { addRoom } from "../utils/ApiFunctions"
import RoomTypeSelector from "../common/RoomTypeSelector"

const AddRoom = () => {
    const [newRoom, setNewRoom] = useState({
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
        setNewRoom({ ...newRoom, [name]: value })
    }

    const handleImageSelection = (e) => {
        const selectedImage = e.target.files[0]
        setNewRoom({ ...newRoom, photo: selectedImage })
        setImagePreview(URL.createObjectURL(selectedImage))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("enter submit handler")
        try {
            const success = await addRoom(newRoom.photo, newRoom.roomType, newRoom.roomPrice)
            console.log(success)
            if (success != undefined) {
                setSuccess("A new room has been added.")
                setNewRoom({
                    photo: null,
                    roomType: "",
                    roomPrice: ""
                })
                setImagePreview("")
                setError("")
            }
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <>
            <section className="container mt-5 mb-5">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <h2 className="mt-5 mb-2">Add new room</h2>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="roomType" className="form-label">Room type</label>
                                <div>
                                    <RoomTypeSelector
                                        handleRoomInputChange={handleRoomInputChange}
                                        newRoom={newRoom}
                                    />
                                </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="roomPrice" className="form-label">Room price</label>
                                <input
                                    required
                                    className="form-control"
                                    id="roomPrice"
                                    name="roomPrice"
                                    value={newRoom.roomPrice}
                                    onChange={handleRoomInputChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="photo" className="form-label">Photo</label>
                                <input
                                    required
                                    className="form-control"
                                    id="photo"
                                    type="file"
                                    onChange={handleImageSelection}
                                />
                                {imagePreview && (
                                    <img
                                        src={imagePreview}
                                        alt="room image preview"
                                        style={{ maxWidth: "400px", maxHeight: "400px" }}
                                        className="mb-3"
                                    />
                                )}
                            </div>
                            <div className="d-grid d-md-flex mt-2">
                                <button
                                    className="btn btn-outline-primary ml-5"
                                >
                                    Save room
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AddRoom
