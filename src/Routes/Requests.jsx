import React, { useState } from 'react'
import { MainPage } from '../Components/Templates/MainPage'
import { Alert, AlertTitle, Button, Divider, Grid, Stack, TextField } from '@mui/material'
import { useAuthContext } from '@asgardeo/auth-react'
import { RESOURCE_URLS } from '../configs'

const initState = {
    NIC: "",
    city: "",
    no: "",
    phone: "",
    postalcode: "",
    street: "",
    village: ""
}

export const Requests = () => {

    const { httpRequest } = useAuthContext()
    const [ loading, setLoading ] = useState(false)
    const [ response, setResponse ] = useState(null)
    const [ data, setData ] = useState(initState)

    const onRequest = async () => {
        setLoading(true)
        try {
            console.log(data)
            const response = await httpRequest({
                url: `${RESOURCE_URLS.Gateway}/certificate/newRequestRecord`,
                method: "POST",
                data: {...data, no: parseInt(data.no), postalcode: parseInt(data.postalcode)}
            })
            console.log(response)
            setResponse('success')
            setData(initState)
        } catch (error) {
            console.error(error)
            setResponse('fail')
        }
    }

    const onChange = (e) => {
        setData({...data, [e.target.name]: e.target.value})
    }

    return (
        <MainPage title={'Request Certificate'}>
            {
                response === 'success' ? (
                    <Alert severity='success' sx={{ m: 1 }}>
                        <AlertTitle>Success</AlertTitle>
                        Your request has been recorded successfully
                    </Alert>
                ) : (
                    response === 'error' && (
                        <Alert severity='error' sx={{ m: 1 }}>
                            <AlertTitle>Failed</AlertTitle>
                            Failed to send a request
                        </Alert>
                    )
                )
            }
            <Stack direction={'column'} spacing={2}>
                <TextField label='NIC' value={data.NIC} onChange={onChange} name="NIC"/>
                <TextField label='Phone Number' value={data.phone} onChange={onChange} name="phone"/>
                <Divider sx={{ mt: 2 }}>Address Details</Divider>
                <Grid container gap={0.5}>
                    <Grid item xs={12} md={1}>
                        <TextField label='Number' value={data.no} onChange={onChange} name="no" fullWidth/>
                    </Grid>
                    <Grid item xs={12} md={2.5}>
                        <TextField label='Street' value={data.street} onChange={onChange} name="street" fullWidth/>
                    </Grid>
                    <Grid item xs={12} md={2.5}>
                        <TextField label='Village' value={data.village} onChange={onChange} name="village" fullWidth/>
                    </Grid>
                    <Grid item xs={12} md={3.3}>
                        <TextField label='City' value={data.city} onChange={onChange} name="city" fullWidth/>
                    </Grid>
                    <Grid item xs={12} md={2.5}>
                        <TextField label='Postal' value={data.postalcode} onChange={onChange} name="postalcode" fullWidth/>
                    </Grid>
                </Grid>
                <Button variant='contained' onClick={onRequest}>Request</Button>
            </Stack>
        </MainPage>
    )
}
