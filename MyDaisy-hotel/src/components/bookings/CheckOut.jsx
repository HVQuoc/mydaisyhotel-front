import { useParams } from "react-router-dom"
import BookingForm from "./BookingForm"
import { useEffect, useState } from "react"
import { getRoomById } from "../utils/ApiFunctions"
const CheckOut = () => {
    const {roomId} = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState("")
    const [roomInfo, setRoomInfo] = useState({
        roomPrice: "",
        roomType: "",
        photo: ""
    })

    useEffect(() => {
        setTimeout(() => {
            getRoomById(roomId).then(response => {
                setRoomInfo(response)
                setIsLoading(false)
            }).catch(err => {
                setError(err)
                setIsLoading(false)
            })
        }, 2000)
    }, [roomId])

    return (
        <div>
            <section className="container">
                <div className="row flex-column flex-md-row align-items-center">
                    <div className="col-md-4 my-5">
                        {isLoading ? (
                            <p>Loading room infomation...</p>
                        ) : error ? (
                            <p className="text-danger">{error}</p>
                        ) : (
                            <div className="room-info">
                                <img
                                    src={`data:image/png;base64, ${roomInfo.photo}`}
                                    alt="room's photo"
                                    style={{width: "100%", height: "200px"}}
                                />
                                <table>
                                     <tbody>
                                        <tr>
                                            <td>Rooom type:</td>
                                            <td>{roomInfo.roomType}</td>
                                        </tr>
                                        <tr>
                                            <td>Rooom price:</td>
                                            <td>{roomInfo.roomPrice}</td>
                                        </tr>
                                     </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                    <div className="col-md-8">
                        <BookingForm />
                    </div>
                </div>
            </section>
        </div>
    )
}

export default CheckOut
