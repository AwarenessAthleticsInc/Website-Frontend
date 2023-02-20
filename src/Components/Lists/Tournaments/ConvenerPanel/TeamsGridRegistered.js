import * as React from 'react';
import Box from '@mui/material/Box';
import {
    Collapse,
    Grid,
    Typography
} from '@mui/material';
const TournamentGridRegistrations = (props) => {
    const { open, row } = props
    return <Collapse in={open} timeout="auto" unmountOnExit>
        <Box sx={{ margin: 1 }}>
            <Box sx={{ display: 'flex' }}>
                <Typography sx={{ marginRight: 'auto' }} variant="h6" gutterBottom component="div">
                    Teams Registered
                </Typography>
            </Box>
            {row.length < 1 ?
                <Typography variant='h6'>No Teams Registered Yet</Typography> :
                row.map((reg) => {
                    return <Grid sx={{ display: { xs: 'flex', md: 'none' }, pb: '0.25rem', borderBottom: '1px solid gray' }} container spacing={1}>
                        <Grid item xs={12}>
                            {`Team: ${reg.team.team}`}
                        </Grid>
                        <Grid item xs={12}>
                            {`Captain: ${reg.team.captain}`}
                        </Grid>
                        <Grid item xs={12}>
                            {`Cell: ${reg.team.cell}`}
                        </Grid>
                        <Grid item xs={12}>
                            {`Email: ${reg.team.email}`}
                        </Grid>
                        <Grid item xs={12}>
                            {`Division: ${reg.team.division || 'Co-Ed'}`}
                        </Grid>
                    </Grid>
                })
            }
        </Box>
    </Collapse>
}
export default TournamentGridRegistrations;