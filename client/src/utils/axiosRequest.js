import axios from 'axios'

const token = localStorage.getItem('accessToken')

const axiosRequest = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? 'https://temi-day-planner.herokuapp.com/api' : 'http://localhost:9000/api',
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
    }
})

export default axiosRequest;