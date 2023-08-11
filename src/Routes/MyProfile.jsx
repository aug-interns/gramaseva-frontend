import { Box, Button, Divider, FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material"
import { MainPage } from "../Components/Templates/MainPage"
import { DEGREE_TYPES } from "../Constants/DegreeTypes";

export const MyProfile = () => {
    return (
        <MainPage title={'My Profile'}>
            <Stack direction={'row'} justifyContent={'right'}>
                <Button variant="contained">Edit</Button>
            </Stack>
            <Box component={'form'}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Divider sx={{ mt: 2 }}>Basic Details</Divider>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth label='Full Name' placeholder='Enter your Name' required/>
                    </Grid>
                    <Grid item xs={5}>
                        <FormControl fullWidth required>
                            <InputLabel>Degree Type</InputLabel>
                            <Select
                                label='Degree Type'
                            >
                                { DEGREE_TYPES.map(item => (
                                        <MenuItem value={item.value} key={item.value}>{ item.name }</MenuItem>
                                )) }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={7}>
                        <TextField fullWidth label='Index Number' placeholder='Ex: SC/2019/11126' required/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth label='Contact Number' placeholder='Ex: 0771234567' required/>
                    </Grid>
                    <Divider/>
                    <Grid item xs={12}>
                        <Divider sx={{ mt: 2 }}>Professional Details</Divider>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth label='Company Name' placeholder='Ex: WSO2' required/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth label='Position' placeholder='Ex: Software Engineer' required/>
                    </Grid>
                    <Grid item xs={8}>
                        <TextField fullWidth label='Work Email' placeholder='Ex: yourname@wso2.com' required/>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField fullWidth label='Working Years' placeholder='Ex: 6 years' type='number' required/>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider sx={{ mt: 2 }}>Accout Settings</Divider>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth label='Current Password' placeholder='Enter your Current Password' name='password' type='password' required/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth label='Password' placeholder='Enter your new Password' name='password' type='password' required/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth label='Re-enter Password' placeholder='Re-enter your new Password' type='password' required/>
                    </Grid>
                    <Grid item xs={12}>
                        <Button type='submit' fullWidth variant='contained'>Register</Button>
                    </Grid>
                </Grid>
            </Box>
        </MainPage>
    )
}