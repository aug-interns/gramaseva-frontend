import React from 'react'
import { MainPage } from '../Components/Templates/MainPage'
import { Button, Stack, TextField } from '@mui/material'

export const Requests = () => {
    return (
        <MainPage title={'Request Certificate'}>
            <Stack direction={'column'} spacing={2}>
                <TextField label='Your NIC'/>
                <TextField label='Your Address'/>
                <Button variant='contained'>Request</Button>
            </Stack>
        </MainPage>
    )
}
