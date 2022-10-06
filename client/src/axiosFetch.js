import axios from 'axios';

const axiosFetch = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? 'https://temi-day-planner.herokuapp.com/api' : 'http://localhost:9000/api',
    headers: {
        "Content-Type": "application/json",
    }
})

export default axiosFetch;