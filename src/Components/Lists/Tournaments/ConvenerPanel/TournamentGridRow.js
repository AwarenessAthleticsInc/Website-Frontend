import * as React from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import TournamentGridRegistrations from './TeamsGridRegistered';
import { Grid, Typography, Button, Paper } from '@mui/material';
import ImgNextGen from '../../../UI/NextGenImages';

const TournamentGridRow = (props) => {
    const [open, setOpen] = React.useState(false);
    const { row, registrations, payments } = props;
    const array = row.assets.poster.split('/');
    const name = array[1];
    const location = array[0];
    return <Paper sx={{ width: '100%', p: '1rem', mt: '1rem', mb: '1rem' }}>
        <Grid container spacing={2} sx={{ alignItems: 'center', mb: '1rem', width: '100%' }}>
            <Grid item md={1} sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
                <ImgNextGen
                    srcWebp={`/${location}/${name}/300/${name}.webp`}
                    srcJpeg={`/${location}/${name}/300/${name}.jpeg`}
                    fallback={`/${location}/${name}/300/${name}.png`}
                    alt={`${row.location.diamond}, ${row.location.city} poster`}
                    style={{ width: '96%', margin: '2%' }}
                />
            </Grid>
            <Grid item xs={12} md={2} sx={{ textAlign: { xs: 'left', md: 'center' } }}>
                <Typography variant='p'>{`${new Date(row.dateTime.start.date).toLocaleDateString('en-us', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`}</Typography>
            </Grid>
            <Grid item md={6} xs={12} sx={{ textAlign: { xs: 'left', md: 'center' } }}>
                <Typography variant='h6' component='h5'>{`${row.location.diamond}, ${row.location.city}`}</Typography>
                <Typography sx={{ fontSize: '0.8rem' }} variant='p' component='p'>{`Deadline: ${new Date(row.dateTime.cancellationDate).toLocaleDateString('en-us', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`}</Typography>
            </Grid>
            <Grid item xs={12} md={3}>
                <Typography variant='p'>{`Spots Available: ${Number(row.teams.Max) - Number(registrations.length)} / ${row.teams.Max}`}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Button fullWidth variant='outlined' startIcon={open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />} onClick={() => setOpen(!open)} color='success' sx={{ borderRadius: '50rem' }}>View Teams</Button>
                <TournamentGridRegistrations open={open} row={registrations} payments={payments} />
            </Grid>
        </Grid>
    </Paper>
}
export default TournamentGridRow;