import axios from "axios"

export const api = axios.create({
    baseURL: "http://localhost:8080"
})

export const getHeader = () => {
    const token = localStorage.getItem("token")
    return ({
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
    })
}

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

export const bookRoom = async (roomId, booking) => {
    try {
        const response = await api.post(`/bookings/room/${roomId}/booking`, booking)
        return response.data
    } catch (err) {
        if (err.response && err.response.data) {
            throw new Error(err.response.data)
        } else {
            throw new Error("Error booking room: ", err.message)
        }
    }
}

export const getAllBookings = async () => {
    try {
        const response = await api.get("bookings/all-bookings", {
            headers: getHeader()
        });
        return response.data
    } catch (err) {
        throw new Error("Error fetching all bookings.")
    }
}

export const getBookingByConfirmationCode = async (confirmationCode) => {
    try {
        const result = await api.get(`/bookings/confirmation/${confirmationCode}`)
        return result.data
    } catch (err) {
        if (err.response && err.response.data) {
            throw new Error(err.response.data)
        } else {
            throw new Error("Error booking room by confirmation code: ", err.message)
        }
    }
}

export const cancelBooking = async (bookingId) => {
    try {
        const result = await api.delete(`/bookings/booking/${bookingId}/delete`)
        return result.data
    } catch (err) {
        throw new Error("Error canceling booking: ", err.message)
    }
}

export async function getAvailableRooms(checkInDate, checkOutDate, roomType) {
    const result = await api.get(
        `rooms/available-rooms?checkInDate=${checkInDate}
		&checkOutDate=${checkOutDate}&roomType=${roomType}`
    )
    return result
}

export async function registerAccount(registration) {
    try {
        const response = await api.post("/auth/register-user", registration)
        return response.data
    } catch (err) {
        if (err.response && err.response.data) {
            throw new Error(err.response.data)
        } else {
            throw new Error(`User registration error: ${err.message}`)
        }
    }
}

export const loginUser = async (login) => {
    try {
        const response = await api.post("/auth/login", login)
        // if (response.status > 200 && response.status < 300) {
        console.log("login successfully", response.data)
        return response.data
        // } else {
        //     console.log("login fail")
        //     return null
        // }
    } catch (err) {
        throw err
    }
}

export const getUserProfile = async (userId, token) => {
    try {
        const response = await api.get(`/user/profile/${userId}`, {
            headers: getHeader()
        })
        return response.data
    } catch (err) {
        throw err
    }
}

/* This isthe function to delete a user */
export async function deleteUser(userId) {
    try {
        const response = await api.delete(`/users/delete/${userId}`, {
            headers: getHeader()
        })
        return response.data
    } catch (error) {
        return error.message
    }
}

/* This is the function to get a single user */
export async function getUser(userId, token) {
    try {
        const response = await api.get(`/users/${userId}`, {
            headers: getHeader()
        })
        return response.data
    } catch (error) {
        throw error
    }
}

/* This is the function to get user bookings by the user id */
export async function getBookingsByUserId(userId, token) {
    try {
        const response = await api.get(`/bookings/user/${userId}/bookings`, {
            headers: getHeader()
        })
        return response.data
    } catch (error) {
        console.error("Error fetching bookings:", error.message)
        throw new Error("Failed to fetch bookings")
    }
}
