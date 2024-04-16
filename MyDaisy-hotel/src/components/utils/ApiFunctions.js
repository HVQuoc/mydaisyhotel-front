import axios from "axios"

export const api = axios.create({
    baseURL: "http://localhost:8080"
})

export async function addRoom(photo, roomType, roomPrice) {
    const formData = new FormData()
    formData.append("photo", photo)
    formData.append("roomType", roomType)
    formData.append("roomPrice", roomPrice)

    const response = await api.post("/rooms/add/new-room", formData)
    if (response.status == 201)
        return true
    return false
}

export const getRoomTypes = async () => {
    try {
        const response = await api.get("/rooms/room/types");
        return response.data
    } catch (err) {
        throw new Error("Error fetching room types")
    }
}

export const getAllRooms = async () => {
    try {
        const result = await api.get("/rooms/all-rooms")
        return result.data
    } catch (err) {
        throw new Error("Cannot fetch all rooms")
    }
}

export const deleteRoom = async (roomId) => {
    try {
        const result = await api.delete(`/rooms/delete/room/${roomId}`)
        console.log("delete room result.data ", result.data)
        return result.data
    } catch (err) {
        throw new Error(`Error deleting room with id ${roomId}`)
    }
}

export const updateRoom = async (roomId, roomData) => {
    // create form data
    const formData = new FormData();
    formData.append("roomType", roomData?.roomType)
    formData.append("roomPrice", roomData?.roomPrice)
    formData.append("photo", roomData?.photo)
    const response = await api.put(`/rooms/update/${roomId}`, formData)
    return response
}

export const getRoomById = async (roomId) => {
    try {
        const result = await api.get(`/rooms/room/${roomId}`)
        return result.data
    } catch (err) {
        throw new Error(`Cannot find room with id ${roomId}`)
    }
}