import React, { useEffect, useState } from 'react'
import { MainPage } from '../Components/Templates/MainPage'
import { Box, Button, Card, CircularProgress, Collapse, Divider, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { useAuthContext } from '@asgardeo/auth-react'
import { RESOURCE_URLS } from '../configs'
import { ExpandLess, ExpandMore } from '@mui/icons-material'

export const CertificateRequests = () => {

    const { httpRequest } = useAuthContext()
    const [loading, setLoading] = useState(false)
    const [ requests, setRequests ] = useState({
        pending: [],
        completed: [],
        rejected: []
    })
    const [ exapandables, setExapandables ] = useState({
        pending: true,
        completed: false,
        rejected: false
    })

    useEffect(() => {
        const onStartup = async () => {
            try {
                setLoading(true)
                const response = await httpRequest({
                    url: `${RESOURCE_URLS.Gateway}/certificate/getRequests`,
                    method: "GET"
                })
                const filteredGroups = {
                    pending: [],
                    completed: [],
                    rejected: []
                }
                console.log(response.data)
                response.data.forEach(element => {
                    if (element.status === 'completed')
                        filteredGroups.completed.push(element)
                    else if (element.status === 'pending')
                        filteredGroups.pending.push(element)
                    else if (element.status === 'rejected')
                        filteredGroups.rejected.push(element)
                });
                setRequests(filteredGroups)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        onStartup()
    }, [])

    return (
        <MainPage title={'Certificate Requests'}>
            {
                !loading ? (
                    <Stack direciton='column' spacing={2}>
                        <Box>
                            <Button onClick={() => { setExapandables({...exapandables, pending: !exapandables.pending}) }} fullWidth>
                                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} width={'100%'}>
                                    <Typography variant='body1' color={'black'}>Pending</Typography>
                                    { exapandables.pending ? (<ExpandLess/>) : (<ExpandMore/>) }
                                </Stack>
                            </Button>
                            <Collapse in={exapandables.pending}>
                            {
                                requests.pending.map(e => (
                                    <Card key={e.id}>
                                        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} m={2}>
                                            <Stack direction={'column'} spacing={0.2}>
                                                <Typography variant='h6'>{e.id}</Typography>
                                                <Typography variant='body2'><strong>NIC:&nbsp;&nbsp; </strong>{e.NIC}</Typography>
                                                <Typography variant='body2'><strong>Address:&nbsp;&nbsp; </strong>{Object.values(e.address).filter(e => e !== "").join(", ")}</Typography>
                                                <Typography variant='body2'><strong>Phone&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp; </strong>{e.phone}</Typography>
                                            </Stack>
                                            <Link to={`/certificate-requests/${e.id}`}>
                                                <Button variant='contained'>Process</Button>
                                            </Link>
                                        </Stack>
                                    </Card>
                                ))
                            }
                            </Collapse>
                            <Divider/>
                        </Box>
                        <Box>
                            <Button onClick={() => { setExapandables({...exapandables, completed: !exapandables.completed}) }} fullWidth>
                                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} width={'100%'}>
                                    <Typography variant='body1' color={'black'}>Completed</Typography>
                                    { exapandables.completed ? (<ExpandLess/>) : (<ExpandMore/>) }
                                </Stack>
                            </Button>
                            <Collapse in={exapandables.completed}>
                            {
                                requests.completed.map(e => (
                                    <Card key={e.id}>
                                        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} m={2}>
                                            <Stack direction={'column'} spacing={0.2}>
                                                <Typography variant='h6'>{e.id}</Typography>
                                                <Typography variant='body2'><strong>NIC:&nbsp;&nbsp; </strong>{e.NIC}</Typography>
                                                <Typography variant='body2'><strong>Address:&nbsp;&nbsp; </strong>{Object.values(e.address).filter(e => e !== "").join(", ")}</Typography>
                                                <Typography variant='body2'><strong>Phone&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp; </strong>{e.phone}</Typography>
                                            </Stack>
                                            <Link to={`/certificate-requests/${e.id}`}>
                                                <Button variant='contained'>View</Button>
                                            </Link>
                                        </Stack>
                                    </Card>
                                ))
                            }
                            </Collapse>
                            <Divider/>
                        </Box>
                        <Box>
                            <Button onClick={() => { setExapandables({...exapandables, rejected: !exapandables.rejected}) }} fullWidth>
                                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} width={'100%'}>
                                    <Typography variant='body1' color={'black'}>Rejected</Typography>
                                    { exapandables.rejected ? (<ExpandLess/>) : (<ExpandMore/>) }
                                </Stack>
                            </Button>
                            <Collapse in={exapandables.rejected}>
                            {
                                requests.rejected.map(e => (
                                    <Card key={e.id}>
                                        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} m={2}>
                                            <Stack direction={'column'} spacing={0.2}>
                                                <Typography variant='h6'>{e.id}</Typography>
                                                <Typography variant='body2'><strong>NIC:&nbsp;&nbsp; </strong>{e.NIC}</Typography>
                                                <Typography variant='body2'><strong>Address:&nbsp;&nbsp; </strong>{Object.values(e.address).filter(e => e !== "").join(", ")}</Typography>
                                                <Typography variant='body2'><strong>Phone&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp; </strong>{e.phone}</Typography>
                                            </Stack>
                                            <Link to={`/certificate-requests/${e.id}`}>
                                                <Button variant='contained'>View</Button>
                                            </Link>
                                        </Stack>
                                    </Card>
                                ))
                            }
                            </Collapse>
                            <Divider/>
                        </Box>
                    </Stack>
                ) : (
                    <Stack direction={'column'} width={'100%'} alignItems={'center'}>
                        <CircularProgress/>
                    </Stack>
                )
            }
        </MainPage>
    )
}
