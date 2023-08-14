import React from 'react'
import { MainPage } from '../Components/Templates/MainPage'
import { Button, Stack, TextField } from '@mui/material'

export const RequestHelp = () => {
    return (
        <MainPage title={'Request Help'}>
            <Stack direction={'column'} spacing={2}>
                <TextField label='Your NIC'/>
                <TextField label='Title'/>
                <TextField label='Description' rows={10} multiline/>
                <Button variant='contained'>Request</Button>
            </Stack>
        </MainPage>
    )
}
