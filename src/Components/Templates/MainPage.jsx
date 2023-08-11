import { Box, Card, Stack, Typography } from "@mui/material"

export const MainPage = ({ title, children }) => {
    return (
        <Box>
            <Stack direction={'column'} spacing={4}>
                <Typography variant="h4">{ title }</Typography>
                <Box>
                    <Card sx={{ p: 3 }}>
                        { children }
                    </Card>
                </Box>
            </Stack>
        </Box>
    )
}