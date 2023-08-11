import { Box, Button, Collapse, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import { DEGREE_TYPES } from "../Constants/DegreeTypes"
import { useState } from "react"
import { Close, FilterList, Search } from "@mui/icons-material"

const initialState = {
    email: '',
    name: '',
    degree: '',
    studentNumber: '',
    contactNo: '',
    company: '',
    workduration: '',
    workemail: '',
    position: '',
    batch: ''
}

export const MemberFilters = ({ onApply }) => {

    const [ filtersCollapsed, setFiltersCollapsed ] = useState(false)

    const [ fields, setFields ] = useState(initialState)

    const handleChange = (e) => {
        setFields((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))
    }

    const getQuery = () => {
        const params = Object.entries(fields)
                             .filter(([key, value]) => value !== '')
                             .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
                             .join('&');
        onApply(params)
    }

    const clearQuery = () => { 
        onApply('') 
        setFields(initialState)
    }

    return (
        <Box>
            <Button onClick={() => { setFiltersCollapsed(!filtersCollapsed) }} startIcon={ <FilterList/> }> { filtersCollapsed ? 'Hide' : 'Show' } Filters</Button>
            <Collapse in={filtersCollapsed}>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={8} md={5} lg={3}>
                    <TextField label="Name" variant="outlined" fullWidth size="small" name="name" value={fields.name} onChange={handleChange} placeholder="Ex: Your Name"/>
                </Grid>
                <Grid item xs={12} sm={4} md={3} lg={2}>
                    <FormControl fullWidth required size="small">
                        <InputLabel>Degree Type</InputLabel>
                        <Select
                            label='Degree Type'
                            name='degree'
                            value={fields.degree}
                            onChange={handleChange}
                        >
                            { DEGREE_TYPES.map(item => (
                                <MenuItem value={item.value} key={item.value}>{ item.name }</MenuItem>
                            )) }
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <TextField label="Student No" variant="outlined" fullWidth size="small" name="studentno" value={fields.studentno} onChange={handleChange} placeholder="Ex: SC/2019/11126"/>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                    <TextField label="Company" variant="outlined" fullWidth size="small" name="company" value={fields.company} onChange={handleChange} placeholder="Ex: WSO2"/>
                </Grid>
                <Grid item xs={12} sm={3} md={4} lg={2}>
                    <TextField
                        type="number"
                        label="Work Duration"
                        variant="outlined"
                        fullWidth
                        size="small"
                        name="workduration"
                        value={fields.workduration}
                        onChange={handleChange}
                        placeholder="Ex: 6"
                    />
                </Grid>
                <Grid item xs={12} sm={9} md={4} lg={3}>
                    <TextField label="Position" variant="outlined" fullWidth size="small" name="position" value={fields.position} onChange={handleChange} placeholder="Ex: Software Enginner"/>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={4}>
                    <TextField
                        label="Work Email"
                        variant="outlined"
                        fullWidth
                        size="small"
                        name="workemail"
                        value={fields.workemail}
                        onChange={handleChange}
                        placeholder="Ex: yourname@wso2.com"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={3}>
                    <TextField
                        label="Contact No"
                        variant="outlined"
                        fullWidth
                        size="small"
                        name="contactNo"
                        value={fields.contactNo}
                        onChange={handleChange}
                        placeholder="Ex: 0771234566"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={4}>
                    <TextField label="Email" variant="outlined" fullWidth size="small" name="email" value={fields.value} onChange={handleChange} placeholder="Ex: yourmail@gmail.com"/>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={4}>
                    <TextField
                        label="Batch"
                        type="number"
                        variant="outlined"
                        fullWidth
                        size="small"
                        name="batch"
                        value={fields.batch}
                        placeholder="Ex: 2019"
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={12} lg={2}>
                    <Button fullWidth variant="outlined" sx={{ height: '100%' }} size="small" onClick={clearQuery} startIcon={ <Close/> } >Clear</Button>
                </Grid>
                <Grid item xs={12} sm={12} lg={2}>
                    <Button fullWidth variant="contained" sx={{ height: '100%' }} size="small" onClick={getQuery} startIcon={ <Search/> }>Search</Button>
                </Grid>
            </Grid>
            </Collapse>
        </Box>
    )
}