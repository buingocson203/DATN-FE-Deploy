import axios from 'axios'

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

// Thêm interceptor để gửi token với mỗi yêu cầu
instance.interceptors.request.use(function (config) {
    const storedUser = localStorage.getItem('user')
    const user = storedUser ? JSON.parse(storedUser) : {}
    const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjRlZjNjYTdkYjIzZTVkZDE2NWE5MmIiLCJpYXQiOjE3MTkxNTI3NzEsImV4cCI6MTcxOTIzOTE3MX0.AnRzHwUYc_JbU5oT83gs5OY6z3l6aPN_QbehLmD65Ic'
    config.headers['Authorization'] = `Bearer ${token}`
    return config
})

export default instance
