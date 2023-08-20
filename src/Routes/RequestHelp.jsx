import React, { useState } from 'react'
import { MainPage } from '../Components/Templates/MainPage'
import { Alert, AlertTitle, Button, CircularProgress, Stack, TextField } from '@mui/material'
import { useAuthContext } from '@asgardeo/auth-react'
import { RESOURCE_URLS } from '../configs'

export const RequestHelp = () => {
    const { httpRequest } = useAuthContext()

    const [ loading, setLoading ] = useState(false)
    const [ response, setResponse ] = useState(null)
    const [ supportRequestData, setSupportRequestData ] = useState({
        nic: '',
        description: '',
        topic: ''
    })

    const onRequest = async () => {
        try {
            setLoading(true)
            const response = await httpRequest({
                url: `${RESOURCE_URLS.Gateway}/support/request`,
                method: "POST",
                data: supportRequestData
            })
            setResponse('success')
        } catch (err) {
            console.error(err)
            setResponse('fail')
        } finally {
            setLoading(false)
        }
    }

    return (
        <MainPage title={'Request Help'}>
            <Stack direction={'column'} spacing={2}>
                {
                    response === 'success' ? (
                        <Alert severity='success'>
                            <AlertTitle>Success</AlertTitle>
                            Your support ticket has been added to the Slack channel
                        </Alert>
                    ) : (
                        response === 'error' && (
                            <Alert severity='error'>
                                <AlertTitle>Failed</AlertTitle>
                                Failed to create a ticket
                            </Alert>
                        )
                    )
                }
                <TextField placeholder='Ex: 200002600083' label='NIC' value={supportRequestData.nic} onChange={e => { setSupportRequestData({...supportRequestData, nic: e.target.value})}}/>
                <TextField placeholder="Ex: Requesting help to change the address" label='Title' value={supportRequestData.topic} onChange={e => { setSupportRequestData({...supportRequestData, topic: e.target.value})}}/>
                <TextField placeholder="Describe your problem in detail" label='Description' rows={10} multiline value={supportRequestData.description} onChange={e => { setSupportRequestData({...supportRequestData, description: e.target.value})}}/>
                {
                    loading ? (
                        <Button variant='contained' disabled={true} startIcon={<CircularProgress size={16} color='grey'/>}>Loading</Button>
                    ) : (
                        <Button variant='contained' disabled={ supportRequestData.description === '' || supportRequestData.nic === '' || supportRequestData.topic === ''} onClick={onRequest}>Request</Button>
                    )
                }
            </Stack>
        </MainPage>
    )
}
