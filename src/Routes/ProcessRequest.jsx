import React, { useEffect, useState } from 'react'
import { MainPage } from '../Components/Templates/MainPage'
import { Alert, AlertTitle, Button, CircularProgress, Stack, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useAuthContext } from '@asgardeo/auth-react'
import { RESOURCE_URLS } from '../configs'
import { Cancel, CheckCircle, CloseOutlined } from '@mui/icons-material'

export const ProcessRequest = () => {

    const { id } = useParams()
    const { httpRequest } = useAuthContext()

    const [loading, setLoading] = useState(false)
    const [ statusLoading, setStatusLoading ] = useState(false)
    const [ checkLoading, setCheckLoading ] = useState({
        nic: false,
        address: false,
        police: false
    })
    const [requestData, setRequestData] = useState({
        NIC: '',
        address: {
            no: "",
            street: "",
            village: "",
            city: "",
            postalcode: ""
        },
        phone: "",
        status: ""
    })
    const [checkStatuses, setCheckStatuses] = useState({
        nic: null,
        address: null,
        police: null
    })

    useEffect(() => {
        const onStartup = async () => {
            try {
                setLoading(true)
                const response = await httpRequest({
                    url: `${RESOURCE_URLS.Gateway}/certificate/getReqRecord%2F${id}`,
                    method: "GET"
                })
                console.log(response.data[0])
                setRequestData(response.data[0])
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        onStartup()
    }, [])

    const onNicCheck = async () => {
        try {
            setCheckLoading({...checkLoading, nic: true})
            const response = await httpRequest({
                url: `${RESOURCE_URLS.Gateway}/identity/checkNIC%2F${requestData.NIC}`
            })
            console.log(response)
            setCheckStatuses({...checkStatuses, nic: response.data})
        } catch (error) {
            console.error(error)
        } finally {
            setCheckLoading({...checkLoading, nic: false})
        }
    }

    const onAddressCheck = async () => {
        try {
            setCheckLoading({...checkLoading, address: true})
            const response = await httpRequest({
                url: `${RESOURCE_URLS.Gateway}/address/checkAddress%3FNIC%3D${requestData.NIC}%26no%3D${requestData.address.no}%26village%3D${requestData.address.village}%26city%3D${requestData.address.city}%26postalcode%3D${requestData.address.postalcode}%26street%3D${ requestData.address.street !== '' ? requestData.address.street : '%2520'}`,
                method: "GET"
            })
            setCheckStatuses({...checkStatuses, address: response.data})
        } catch (error) {
            console.error(error)
        } finally {
            setCheckLoading({...checkLoading, nic: false})
        }
    }

    const onPoliceCheck = async () => {
        try {
            setCheckLoading({...checkLoading, police: true})
            const response = await httpRequest({
                url: `${RESOURCE_URLS.Gateway}/police/checkStatus%2F${requestData.NIC}`,
                method: "GET"
            })
            setCheckStatuses({...checkStatuses, police: response.data})
        } catch (error) {
            console.error(error)
        } finally {
            setCheckLoading({...checkLoading, police: false})
        }
    }

    const onSetStatus = async (status) => {
        try {
            setStatusLoading(true)
            const response = await httpRequest({
                url: `${RESOURCE_URLS.Gateway}/certificate/updateRequest%2F${requestData.id}%2F${status}`,
                method: "PUT"
            })
            setRequestData({...requestData, status})
            console.log(response)
        } catch (error) {
            console.log(error)
        } finally {
            setStatusLoading(true)
        }
    }

    const isNull = checkStatuses.address === null && checkStatuses.nic === null && checkStatuses.police === null 
    const isApprovable = checkStatuses.address === true && checkStatuses.nic === true && checkStatuses.police !== null 
    const isAnyRejected = checkStatuses.address === false || checkStatuses.nic === false || checkStatuses.police !== null

    return (
        <MainPage title={`Request - ${id}`}>
            {
                !loading ? (
                    <Stack direction='column' spacing={2}>
                        {
                            requestData.status === 'completed' ? (
                                <Alert>
                                    <AlertTitle>Completed</AlertTitle>
                                    This request has been completed.
                                </Alert>
                            ) : ( requestData.status === 'rejected' ? (
                                <Alert severity='error'>
                                    <AlertTitle>Rejected</AlertTitle>
                                    This request has been rejected.
                                </Alert>
                            ) : (
                                <></>
                            ))
                        }
                        <Stack direction={'column'} spacing={0.2}>
                            <Typography>Phone</Typography>
                            <Typography variant='body2' fontWeight={'bold'}>{requestData.phone}</Typography>
                        </Stack>
                        <Stack direction={'row'} justifyContent={'space-between'}>
                            <Stack direction={'column'} spacing={0.2}>
                                <Typography>NIC</Typography>
                                <Typography variant='body2' fontWeight={'bold'}>{requestData.NIC}</Typography>
                            </Stack>
                            <Stack direction={'row'} spacing={2} alignItems={'center'}>
                                <Button variant='contained' onClick={onNicCheck} startIcon={checkLoading.nic && (<CircularProgress size={14} color='grey'/>)} disabled={checkStatuses.nic !== null || checkLoading.nic}>{checkLoading.nic ? "Verifying" : "Verify"}</Button>
                                {checkStatuses.nic === true && (<CheckCircle color='success'/>)}
                                {checkStatuses.nic === false && (<CloseOutlined color='error'/>)}
                            </Stack>
                        </Stack>
                        <Stack direction={'row'} justifyContent={'space-between'}>
                            <Stack direction={'column'} spacing={0.2}>
                                <Typography>Address</Typography>
                                <Typography variant='body2' fontWeight={'bold'}>{Object.values(requestData.address).filter(e => e !== "").join(", ")}</Typography>
                            </Stack>
                            <Stack direction={'row'} spacing={2} alignItems={'center'}>
                                <Button variant='contained' onClick={onAddressCheck} startIcon={checkLoading.address && (<CircularProgress size={14} color='grey'/>)} disabled={checkStatuses.address !== null || checkStatuses.nic !== true || checkLoading.address}>{checkLoading.address ? "Verifying" : "Verify"}</Button>
                                {checkStatuses.address === true && (<CheckCircle color='success'/>)}
                                {checkStatuses.address === false && (<CloseOutlined color='error'/>)}
                            </Stack>
                        </Stack>
                        <Stack direction={'row'} justifyContent={'space-between'}>
                            <Typography>Police Check</Typography>
                            <Stack direction={'row'} spacing={2} alignItems={'center'}>
                                <Button variant='contained' onClick={onPoliceCheck} startIcon={checkLoading.police && (<CircularProgress size={14} color='grey'/>)} disabled={checkStatuses.police !== null || checkStatuses.address !== true || checkLoading.police}>{checkLoading.police ? "Verifying" : "Verify"}</Button>
                                {checkStatuses.police === 'clear' && (<Button color='success' variant='contained'>Clear</Button>)}
                                {checkStatuses.police === 'low' && (<Button color='palette.success.light' variant='contained'>Low</Button>)}
                                {checkStatuses.police === 'medium' && (<Button color='warning' variant='contained'>Medium</Button>)}
                                {checkStatuses.police === 'high' && (<Button color='error' variant='contained'>High</Button>)}
                            </Stack>
                        </Stack>
                        {
                            requestData.status === 'pending' && (
                                <Stack direction={'row'} justifyContent={'space-between'} spacing={2}>
                                    <Button fullWidth disabled={isNull || !isAnyRejected || statusLoading} variant='contained' color='error'  onClick={() => { onSetStatus('rejected') }}>Reject</Button>
                                    <Button variant='contained' fullWidth disabled={isNull || !isApprovable || statusLoading} color='success' onClick={() => { onSetStatus('completed') }}>Verify</Button>
                                </Stack>
                            )
                        }
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
