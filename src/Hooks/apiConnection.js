import axios from "axios";

export const apiConnection = axios.create({
    withCredentials: true,
    baseURL: process.env.REACT_APP_API_URL
})