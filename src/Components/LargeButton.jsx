import { RequestQuote } from '@mui/icons-material'
import { Button, Stack, Typography } from '@mui/material'
import React from 'react'

export const LargeButton = ({ icon, text }) => {
    return (
        <Button variant="contained">
            <Stack direction={'column'} spacing={1} alignItems={'center'} m={2}>
                { icon }
                <Typography fontSize={14} fontWeight={600}>{ text }</Typography>
            </Stack>
        </Button>
    )
}
