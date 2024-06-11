import axios from 'axios'

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

// Thêm interceptor để gửi token với mỗi yêu cầu
instance.interceptors.request.use(function (config) {
    const storedUser = localStorage.getItem('user')
    const user = storedUser ? JSON.parse(storedUser) : {}
    const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjRlZjNjYTdkYjIzZTVkZDE2NWE5MmIiLCJpYXQiOjE3MTgwOTExOTYsImV4cCI6MTcxODE3NzU5Nn0.kbeGRwcmNsV2MNVnhiH5SR_j75NgFM0CruLXfxxQ8_M'
    config.headers['Authorization'] = `Bearer ${token}`
    return config
})

export default instance
