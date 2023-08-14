import { ArrowBack } from "@mui/icons-material"
import { Box, Card, IconButton, Stack, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"

export const MainPage = ({ title, children, hideGoBack }) => {

    const navigate = useNavigate()

    return (
        <Box>
            <Stack direction={'column'} spacing={2}>
                <Stack direction={'row'} spacing={1} alignItems={'center'}>
                    {
                        !!!hideGoBack && (
                            <IconButton onClick={() => { navigate(-1) }}>
                                <ArrowBack/>
                            </IconButton>
                        )
                    }
                    <Typography variant="h5" fontWeight={"bold"}>{ title }</Typography>
                </Stack>
                <Box>
                    <Card sx={{ p: 3 }}>
                        { children }
                    </Card>
                </Box>
            </Stack>
        </Box>
    )
}

MainPage.defaultProps = {
    hideGoBack: false
}