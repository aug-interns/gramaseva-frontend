import React, { useState } from 'react'
import { MainPage } from '../Components/Templates/MainPage'
import { Button, Stack, TextField } from '@mui/material'
import { useAuthContext } from '@asgardeo/auth-react'
import { RESOURCE_URLS } from '../configs'

export const RequestStatus = () => {

    const { httpRequest } = useAuthContext()
    const [ loading ,setLoading ] = useState(false)
    const [ nic, setNic ] = useState('')
    const [ status, setStatus ] = useState(null)

    const onRequest = async () => {
        try {
            setLoading(true)
            const response = await httpRequest({
                url: `${RESOURCE_URLS.Gateway}/certificate/getReqRecord%2F${nic}`,
                method: "GET"
            })
            if (response.data.length === 0) {
                setStatus({ color: 'error', msg: 'Not Found' })
            } else if (response.data[0].status === 'pending') {
                setStatus({ color: 'warning', msg: 'Pending' })
            } else if (response.data[0].status === 'completed') {
                setStatus({ color: 'success', msg: 'Completed' })
            } 
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <MainPage title={'Status'}>
            <Stack direction={'column'} spacing={2}>
                <TextField value={nic} onChange={e => { setNic(e.target.value) }} label='NIC' placeholder='Your NIC'/>
                <Button variant='contained' disabled={loading || nic === ''} onClick={onRequest}>Check</Button>
                {
                    status !== null && (
                        <Button variant='contained' onClick={onRequest} color={status.color}>{status.msg}</Button>
                    )
                }
            </Stack>
        </MainPage>
    )
}
