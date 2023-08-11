import { Button, Card, CardContent, Stack, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import { useAuthContext } from "@asgardeo/auth-react"

export const Welcome = () => {
    const { signIn } = useAuthContext();

    return (
        <Card sx={{ width: '100%' }}>
            <CardContent>
                <Typography variant="h5" align="center" sx={{ mb: 3 }}>Welcome to GramaSeva</Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent={'center'} alignItems={'center'} spacing={2}>
                    <Button variant="contained" size="large" onClick={ () => signIn() }>Get Started</Button>
                </Stack>
            </CardContent>
        </Card>
    )
}