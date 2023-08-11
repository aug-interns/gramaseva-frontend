import React, { useState } from 'react'
import { MainPage } from '../Components/Templates/MainPage'
import { Button, Card, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const dummy_requests = [
    {id: 1, name: 'Indrajith Madhumal', type: 'Certificate'},
    {id: 2, name: 'Sachin Akash', type: 'Certificate'},
    {id: 3, name: 'Anngalinga Gowsigan', type: 'Certificate'}
]

export const CertificateRequests = () => {

    const [ requests, setRequests ] = useState(dummy_requests)

    return (
        <MainPage title={'Certificate Requests'}>
            <Stack direciton='column' spacing={2}>
                {
                    requests.map(e => (
                        <Card key={e.id}>
                            <Stack direction={'row'} justifyContent={'space-between'} m={2}>
                                <Stack direction={'row'} spacing={2}>
                                    <Typography variant='h6'>{e.name}</Typography>
                                </Stack>
                                <Link to={`/certificate-requests/${e.id}`}>
                                    <Button variant='contained'>Process</Button>
                                </Link>
                            </Stack>
                        </Card>
                    ))
                }
            </Stack>
        </MainPage>
    )
}
