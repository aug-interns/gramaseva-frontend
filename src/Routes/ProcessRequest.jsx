import React from 'react'
import { MainPage } from '../Components/Templates/MainPage'
import { Button, Stack, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'

export const ProcessRequest = () => {

    const { id } = useParams()

    return (
        <MainPage title={`Request - ${id}`}>
            <Stack direction='column' spacing={2}>
                <Stack direction={'row'} justifyContent={'space-between'}>
                    <Typography>NIC</Typography>
                    <Button variant='contained'>Verify</Button>
                </Stack>
                <Stack direction={'row'} justifyContent={'space-between'}>
                    <Typography>Address</Typography>
                    <Button variant='contained'>Verify</Button>
                </Stack>
                <Stack direction={'row'} justifyContent={'space-between'} spacing={2}>
                    <Button fullWidth>Reject</Button>
                    <Button variant='contained' fullWidth>Verify</Button>
                </Stack>
            </Stack>
        </MainPage>
    )
}
