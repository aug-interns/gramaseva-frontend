import React, { useState } from 'react'
import { MainPage } from '../Components/Templates/MainPage'
import { Alert, AlertTitle, Button, CircularProgress, Stack, TextField } from '@mui/material'
import { useAuthContext } from '@asgardeo/auth-react'
import { RESOURCE_URLS } from '../configs'
import { Document, Font, PDFDownloadLink, Page, StyleSheet, Text, View } from '@react-pdf/renderer'
import { Download } from '@mui/icons-material'

export const RequestStatus = () => {

    const { httpRequest } = useAuthContext()
    const [ loading ,setLoading ] = useState(false)
    const [ reqId, setReqId ] = useState('')
    const [ status, setStatus ] = useState(null)
    const [ certData, setCertData ] = useState({
        id: "",
        data: {
            fullname: "",
            address: {
                no: "",
                street: "",
                village: "",
                city: "",
                postalcode: ""
            },
            criminalstatus: "",
            DoB: "",
            NIC: ""
        }
    })

    const onRequest = async () => {
        try {
            setLoading(true)
            const response = await httpRequest({
                url: `${RESOURCE_URLS.Gateway}/certificate/getReqRecord%2F${reqId}`,
                method: "GET"
            })
            if (response.data.length === 0) {
                setStatus({ color: 'error', msg: 'Certificate with the given ID has not been found. Please check again.', status: 'not found' })
            } else if (response.data[0].status === 'pending') {
                setStatus({ color: 'warning', msg: 'Your Certificate request is still pending, Please wait while it is reviewed.', status: 'pending' })
            } else if (response.data[0].status === 'completed') {
                const response = await httpRequest({
                    url: `${RESOURCE_URLS.Gateway}/certificate/getCompletedReq%2F${reqId}`,
                    method: "GET"
                })
                setCertData(response.data)
                setStatus({ color: 'success', msg: 'Your Certificate request has been granted. You can download it using the button below.', status: 'completed' })
            } else if (response.data[0].status === 'rejected') {
                setStatus({ color: 'error', msg: 'Your Certificate Request has been Rejected', status: 'rejected' })
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
                <TextField value={reqId} onChange={e => { setReqId(e.target.value) }} label='Request ID' placeholder='Request ID given to your request'/>
                <Button variant='contained' disabled={loading || reqId === ''} onClick={onRequest}>Check</Button>
                {
                    status !== null && (
                        <Alert severity={status.color}>
                            <AlertTitle><strong>{status.status.charAt(0).toUpperCase() + status.status.slice(1)}</strong></AlertTitle>
                            {status.msg}
                        </Alert>
                    )
                }
                {
                    status?.status === 'completed' && (
                    <PDFDownloadLink document={<MyDocument data={certData} />} fileName="Gramaniladhari Certificate.pdf">
                        {({ blob, url, loading, error }) =>
                            loading ? <Button startIcon={<CircularProgress size={16} color='grey'/>} variant='contained' disabled fullWidth>Please Wait</Button> : <Button startIcon={<Download/>} variant='contained' color={'success'} fullWidth>Download PDF</Button>
                        }
                    </PDFDownloadLink>
                    )
                }
            </Stack>
        </MainPage>
    )
}

Font.register({
  family: 'Oswald',
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
});

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'Oswald'
  },
  author: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
    fontFamily: 'Oswald'
  },
  field: {
    flexDirection: 'row',
    width: '100%'
  },
  key: {
    fontSize: 16,
    margin: 8,
    textAlign: 'left',
    fontFamily: 'Times-Roman',
    flexGrow: 1
  },
  value: {
    fontSize: 16,
    margin: 8,
    textAlign: 'right',
    fontFamily: 'Times-Roman'
  }
});

const MyDocument = ({ data }) => (
    <Document>
    <Page style={styles.body}>
      <Text style={styles.title}>Gramaniladhari Certificate</Text>
      <Text style={styles.author}>{data.id}</Text>
      <div style={styles.field}>
        <Text style={styles.key}>
          Name
        </Text>
        <Text style={styles.value}>
          {data.data.fullname}
        </Text>
      </div>
      <div style={styles.field}>
        <Text style={styles.key}>
          NIC
        </Text>
        <Text style={styles.value}>
          {data.data.NIC}
        </Text>
      </div>
      <div style={styles.field}>
        <Text style={styles.key}>
          Address
        </Text>
        <Text style={styles.value}>
            {Object.values(data.data.address).filter(e => e !== " ").join(", ")}
        </Text>
      </div>
      <div style={styles.field}>
        <Text style={styles.key}>
          Police Report Severity
        </Text>
        <Text style={styles.value}>
          {data.data.criminalstatus}
        </Text>
      </div>
      <div style={styles.field}>
        <Text style={styles.key}>
            Date of Birth
        </Text>
        <Text style={styles.value}>
            {data.data.DoB}
        </Text>
      </div>
    </Page>
    </Document>
)
