import React from 'react'
import { MainPage } from '../Components/Templates/MainPage'
import { Button, Stack } from '@mui/material'

export const RequestStatus = () => {
    return (
        <MainPage title={'Status'}>
            <Stack direction={'column'} spacing={2}>
                <Button variant='contained'>Pending</Button>
            </Stack>
        </MainPage>
    )
}
