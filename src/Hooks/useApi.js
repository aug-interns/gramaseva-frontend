import { useState } from "react"
import { apiConnection } from "./apiConnection"
import { useSelector } from "react-redux"
import { selectAuthUserToken } from "../Slices/authSlice"

export const useApi = (initResponse = null) => {
    const [ response, setResponse ] = useState(initResponse)
    const [ error, setError ] = useState(null)
    const [ loading, setLoading ] = useState(false)
    const userToken = useSelector(selectAuthUserToken)

    const request = async ( url, method, body = null ) => {
        const config = {
            method,
            url: `${url}`,
            data: body,
            ...( userToken && {headers: {
                Authorization: `Bearer ${userToken}`
            }})
        }

        try {
            setLoading(true)
            const response = await apiConnection(config);
            setResponse(response.data);
            return response.data;
        } catch (error) {
            setError(error.response.data)
        } finally {
            setLoading(false)
        }
    }

    return [ request, response, error, loading ];
}