import axios from 'axios'

const axiosRequest = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? 'https://temi-day-planner.herokuapp.com/api' : 'http://localhost:9000/api',
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.accessToken
    }
})

export default axiosRequest;