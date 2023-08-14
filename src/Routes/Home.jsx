import { Button } from "@mui/material"
import { MainPage } from "../Components/Templates/MainPage"
import { useAuthContext } from "@asgardeo/auth-react"
import { useEffect, useState } from "react"
import { ROLES } from "../Constants/Roles"
import { Link } from "react-router-dom"
import { RESOURCE_URLS } from "../configs"

export const Home = () => {

    const { getDecodedIDToken, httpRequest, state } = useAuthContext()

    console.log(state)

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
                <Link to={'/add-user'}>
                    <Button>Add Users</Button>
                </Link>
                <Button onClick={() => {
                    httpRequest({
                        headers: {
                            Accept: "application/json",
                        },
                        method: "GET",
                        url: `${RESOURCE_URLS.AddressCheckService}/greeting?name=asdf`,
                        attachToken: true,
                        withCredentials: true
                    }).then((data) => {
                        console.log(data)
                    }).catch((err) => {
                        console.log(err)
                    })
                }}>Send</Button>
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
                <Button onClick={() => {
                    httpRequest({
                        headers: {
                            Accept: "application/json",
                        },
                        method: "GET",
                        url: `${RESOURCE_URLS.AddressCheckService}/greeting?name=asdf`,
                        attachToken: true,
                        withCredentials: true
                    }).then((data) => {
                        console.log(data)
                    }).catch((err) => {
                        console.log(err)
                    })
                }}>Send</Button>
            </MainPage>
        )
    }
}