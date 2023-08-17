import React, { useState } from 'react'
import { MainPage } from '../Components/Templates/MainPage'
import { Button, Stack, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useAuthContext } from '@asgardeo/auth-react'
import { RESOURCE_URLS } from '../configs'
import { Cancel, CheckCircle, Close, CloseOutlined } from '@mui/icons-material'

export const ProcessRequest = () => {

    const { id } = useParams()
    const { httpRequest } = useAuthContext()

    const [checkStatuses, setCheckStatuses] = useState({
        nic: null,
        address: null,
        police: null
    })

    const onNicCheck = async () => {
        const response = true
        setCheckStatuses({...checkStatuses, nic: response})
    }

    const onAddressCheck = async (nic) => {
        const response = true
        setCheckStatuses({...checkStatuses, address: response})
    }

    const onPoliceCheck = async () => {
        const response = 'clear'
        setCheckStatuses({...checkStatuses, police: response})
    }

    const isNull = checkStatuses.address === null && checkStatuses.nic === null && checkStatuses.police === null 
    const isApprovable = checkStatuses.address === true && checkStatuses.nic === true && checkStatuses.police !== null 
    const isAnyRejected = checkStatuses.address === false || checkStatuses.nic === false || checkStatuses.police !== null

    return (
        <MainPage title={`Request - ${id}`}>
            <Stack direction='column' spacing={2}>
                <Stack direction={'row'} justifyContent={'space-between'}>
                    <Typography>NIC</Typography>
                    <Stack direction={'row'} spacing={2} alignItems={'center'}>
                        <Button variant='contained' onClick={onNicCheck} disabled={checkStatuses.nic !== null}>Verify</Button>
                        {checkStatuses.nic === true && (<CheckCircle color='success'/>)}
                        {checkStatuses.nic === false && (<CloseOutlined color='error'/>)}
                    </Stack>
                </Stack>
                <Stack direction={'row'} justifyContent={'space-between'}>
                    <Typography>Address</Typography>
                    <Stack direction={'row'} spacing={2} alignItems={'center'}>
                        <Button variant='contained' onClick={onAddressCheck} disabled={checkStatuses.address !== null || checkStatuses.nic !== true}>Verify</Button>
                        {checkStatuses.address === true && (<CheckCircle color='success'/>)}
                        {checkStatuses.address === false && (<CloseOutlined color='error'/>)}
                    </Stack>
                </Stack>
                <Stack direction={'row'} justifyContent={'space-between'}>
                    <Typography>Police Check</Typography>
                    <Stack direction={'row'} spacing={2} alignItems={'center'}>
                        <Button variant='contained' onClick={onPoliceCheck} disabled={checkStatuses.police !== null || checkStatuses.address !== true}>Verify</Button>
                        {checkStatuses.police === 'clear' && (<Button color='success' variant='contained'>Clear</Button>)}
                        {checkStatuses.police === 'low' && (<Button color='palette.success.light' variant='contained'>Low</Button>)}
                        {checkStatuses.police === 'medium' && (<Button color='warning' variant='contained'>Medium</Button>)}
                        {checkStatuses.police === 'high' && (<Button color='error' variant='contained'>High</Button>)}
                    </Stack>
                </Stack>
                <Stack direction={'row'} justifyContent={'space-between'} spacing={2}>
                    <Button fullWidth disabled={isNull || !isAnyRejected} variant='contained' color='error'>Reject</Button>
                    <Button variant='contained' fullWidth disabled={isNull || !isApprovable} color='success'>Verify</Button>
                </Stack>
            </Stack>
        </MainPage>
    )
}
