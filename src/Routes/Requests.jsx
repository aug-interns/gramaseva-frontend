import React, { useState } from 'react'
import { MainPage } from '../Components/Templates/MainPage'
import { Alert, AlertTitle, Button, CircularProgress, Divider, Grid, InputAdornment, Stack, TextField } from '@mui/material'
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
        try {
            setLoading(true)
            Object.keys(data).forEach(element => {
                data[element] = data[element].trim()
            });
            const response = await httpRequest({
                url: `${RESOURCE_URLS.Gateway}/certificate/newRequestRecord`,
                method: "POST",
                data: {...data, phone: `+94${data.phone}`, no: parseInt(data.no), postalcode: parseInt(data.postalcode)}
            })
            console.log(response)
            setResponse('success')
            setData(initState)
        } catch (error) {
            console.error(error)
            setResponse('fail')
        } finally {
            setLoading(false)
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
                <TextField label='NIC' error={data.NIC !== "" && !(/^(?:\d{12}|\d{9}[a-zA-Z])$/.test(data.NIC))} value={data.NIC} onChange={onChange} name="NIC"/>
                <TextField label='Phone Number' value={data.phone} onChange={onChange} type='number' name="phone" 
                error={data.phone !== "" && data.phone.length !== 9}
                InputProps={{
                    startAdornment: <InputAdornment position="start">(+94)</InputAdornment>,
                    maxLength: 10
                }}
                inputProps={{ maxLength: 12 }}
                />
                <Divider sx={{ mt: 2 }}>Address Details</Divider>
                <Grid container gap={0.5}>
                    <Grid item xs={12} md={1}>
                        <TextField label='Number' type='number' value={data.no} onChange={onChange} name="no" fullWidth/>
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
                        <TextField label='Postal' type='number' value={data.postalcode} onChange={onChange} name="postalcode" fullWidth/>
                    </Grid>
                </Grid>
                <Button variant='contained' onClick={onRequest} startIcon={ loading && <CircularProgress size={16} color='grey'/> } disabled={loading || data.NIC === "" || data.phone === "" || data.no === "" || data.village === "" || data.city === "" || data.postalcode === "" || !(/^(?:\d{12}|\d{9}[a-zA-Z])$/.test(data.NIC)) || data.phone.length !== 9 }>{ loading ? 'Requesting' : 'Request' }</Button>
            </Stack>
        </MainPage>
    )
}
