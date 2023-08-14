import { Button, Card, CardContent, CircularProgress, Stack, Typography } from "@mui/material"
import { useSearchParams } from "react-router-dom"
import { useAuthContext } from "@asgardeo/auth-react"

export const Welcome = () => {
    const { signIn } = useAuthContext();
    const [ queryParams, _ ] = useSearchParams()

    const auth_redirecting = queryParams.get("auth_redirecting") === 'true'

    return (
        <Card sx={{ width: '100%' }}>
            <CardContent>
                <Stack direction={{ xs: 'column'}} justifyContent={'center'} alignItems={'center'} spacing={2}>
                    { auth_redirecting ? (
                    <>
                        <Typography>Please wait, You will be redirected</Typography>
                        <CircularProgress/>
                    </>
                    ) : (
                    <>
                        <Typography variant="h5" align="center" sx={{ mb: 3 }}>Welcome to GramaSeva</Typography>
                        <Button variant="contained" size="large" onClick={ () => signIn() }>Get Started</Button>
                    </>
                    ) }
                </Stack>
            </CardContent>
        </Card>
    )
}