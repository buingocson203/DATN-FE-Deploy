import axios from 'axios'

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

// Thêm interceptor để gửi token với mỗi yêu cầu
instance.interceptors.request.use(function (config) {
    const storedUser = localStorage.getItem('user')
    const user = storedUser ? JSON.parse(storedUser) : {}
    const token = user?.accessToken || ''

    // const token2 =
    //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjdlZTgyMTBjZTE3ZDU1YzEzNDMxOTAiLCJpYXQiOjE3MjAwNzEyODMsImV4cCI6MTcyMDE1NzY4M30.rajLJVdLHdLdZ4FQiQyv7FoRcaA-b3h5CYfsk3yrkms'
    config.headers['Authorization'] = `Bearer ${token}`
    return config
})

export default instance
