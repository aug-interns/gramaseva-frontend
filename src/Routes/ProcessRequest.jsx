import React from 'react'
import { MainPage } from '../Components/Templates/MainPage'
import { Button, Stack, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useAuthContext } from '@asgardeo/auth-react'
import { RESOURCE_URLS } from '../configs'

export const ProcessRequest = () => {

    const { id } = useParams()
    const { httpRequest } = useAuthContext()

    const onAddressCheck = async (nic) => {
        try {
            const response = await httpRequest({
                url: `${RESOURCE_URLS.AddressCheckService}/testaddress`,
                method: "GET",
            })
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <MainPage title={`Request - ${id}`}>
            <Stack direction='column' spacing={2}>
                <Stack direction={'row'} justifyContent={'space-between'}>
                    <Typography>NIC</Typography>
                    <Button variant='contained'>Verify</Button>
                </Stack>
                <Stack direction={'row'} justifyContent={'space-between'}>
                    <Typography>Address</Typography>
                    <Button variant='contained' onClick={onAddressCheck}>Verify</Button>
                </Stack>
                <Stack direction={'row'} justifyContent={'space-between'} spacing={2}>
                    <Button fullWidth>Reject</Button>
                    <Button variant='contained' fullWidth>Verify</Button>
                </Stack>
            </Stack>
        </MainPage>
    )
}
