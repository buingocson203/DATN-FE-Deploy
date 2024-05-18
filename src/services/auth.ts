import { IUser } from "@/common/type"
import instance from "@/core/api"
// import instance from "@/core/api"

export const signup = async (user: IUser) => {
    try {
        const response = await instance.post(`api/auth/signup`, user)
        return response.data
    } catch (error) {
        console.log("Create user error", error)
    }
}