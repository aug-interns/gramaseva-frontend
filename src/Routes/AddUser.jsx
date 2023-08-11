import React from 'react'
import { MainPage } from '../Components/Templates/MainPage'
import { Button, Stack, TextField } from '@mui/material'

export const AddUser = () => {
    return (
        <MainPage title={'Add User'}>
            <Stack direciton='column' spacing={2}>
                <TextField label={'Name'}/>
                <TextField label={'NIC'}/>
                <TextField label={'Address'}/>
                <Stack direction={'row'} spacing={2}>
                    <Button variant='outlined' fullWidth>Cancel</Button>
                    <Button variant='contained' fullWidth>Add User</Button>
                </Stack>
            </Stack>
        </MainPage>
    )
}
