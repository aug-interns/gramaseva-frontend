import { Button } from "@mui/material"
import { MainPage } from "../Components/Templates/MainPage"
import { useAuthContext } from "@asgardeo/auth-react"
import { useEffect, useState } from "react"
import { ROLES } from "../Constants/Roles"
import { Link } from "react-router-dom"

export const Home = () => {

    const { getDecodedIDToken } = useAuthContext()

    const [ role, setRole ] = useState(null)

    useEffect(() => {
        const decodeIdToken = async () => {
            const decoded_token = await getDecodedIDToken();
            setRole(decoded_token.application_roles)
        }
        decodeIdToken()
    }, [])

    if (role === ROLES.GRAMASEVAKA) {
        return (
            <MainPage title={'Home'}>
                <Link to={'/certificate-requests'}>
                    <Button>View Requests</Button>
                </Link>
                <Button>Add Users</Button>
            </MainPage>
        )
    } else {
        return (
            <MainPage title={'Home'}>
                <Link to={'/request'}>
                    <Button>Request for Certificate</Button>
                </Link>
                <Link to={'/status'}>
                    <Button>Check Status</Button>
                </Link>
            </MainPage>
        )
    }
}