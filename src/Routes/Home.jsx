import { Stack } from "@mui/material"
import { MainPage } from "../Components/Templates/MainPage"
import { useAuthContext } from "@asgardeo/auth-react"
import { useEffect, useState } from "react"
import { ROLES } from "../Constants/Roles"
import { Link } from "react-router-dom"
import { CheckBoxOutlined, HelpCenterRounded, PersonAddAlt1Rounded, RequestQuote, ViewQuiltOutlined } from "@mui/icons-material"
import { LargeButton } from "../Components/LargeButton"

export const Home = () => {

    const { getDecodedIDToken, state } = useAuthContext()

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
            <MainPage title={'Home'} hideGoBack>
                <Stack direction={'row'} spacing={2}>
                    <Link to={'/certificate-requests'}>
                        <LargeButton icon={<ViewQuiltOutlined fontSize="large"/>} text={"View Requests"}/>
                    </Link>
                    {/* <Link to={'/add-user'}>
                        <LargeButton icon={<PersonAddAlt1Rounded fontSize="large"/>} text={"Add Users"}/>
                    </Link> */}
                    <Link to={'https://app.slack.com/client/T05NBL72M3J/C05NBLBQGHW'} target="_blank">
                        <LargeButton icon={<HelpCenterRounded fontSize="large"/>} text={"Slack Channel"}/>
                    </Link>
                </Stack>
            </MainPage>
        )
    } else if (role === ROLES.PUBLIC_USER) {
        return (
            <MainPage title={'Home'} hideGoBack>
                <Stack direction={'row'} spacing={2}>
                    <Link to={'/request'}>
                        <LargeButton icon={<RequestQuote fontSize="large"/>} text={"Request Certificate"}/>
                    </Link>
                    <Link to={'/status'}>
                        <LargeButton icon={<CheckBoxOutlined fontSize="large"/>} text={"Check Status"}/>
                    </Link>
                    <Link to={'/request-help'}>
                        <LargeButton icon={<HelpCenterRounded fontSize="large"/>} text={"Request Help"}/>
                    </Link>
                </Stack>
            </MainPage>
        )
    }
}