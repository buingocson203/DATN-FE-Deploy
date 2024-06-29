import axios from 'axios'

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

// Thêm interceptor để gửi token với mỗi yêu cầu
instance.interceptors.request.use(function (config) {
    const storedUser = localStorage.getItem('user')
    const user = storedUser ? JSON.parse(storedUser) : {}
    const token = user?.accessToken || ''

    // const token =
    //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjRlZjNjYTdkYjIzZTVkZDE2NWE5MmIiLCJpYXQiOjE3MTk1NDkxMDgsImV4cCI6MTcxOTYzNTUwOH0.3x4WaRIPOmX7woCmXauVu1aBhNFYB0MCvof_0pymSlk'
    config.headers['Authorization'] = `Bearer ${token}`
    return config
})

export default instance
