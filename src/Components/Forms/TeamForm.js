import { Box } from "@mui/system";
import { useState } from "react";
import { Paper, Button, TextField, Grid, Typography } from "@mui/material";

const TeamForm = (props) => {
    const [error, setError] = useState(false);
    const [team, setTeam] = useState({
        team: '',
        firstName: '',
        lastName: '',
        cell: '',
        email: ''
    });
    const setTeamHandler = (event) => {
        const id = event.target.id;
        const value = event.target.value;
        setTeam((prevs) => {
            return {
                team: id === 'team' ? value : prevs.team,
                firstName: id === 'firstName' ? value : prevs.firstName,
                lastName: id === 'lastName' ? value : prevs.lastName,
                cell: id === 'cell' ? formatPhoneNumber(value) : prevs.cell,
                email: id === 'email' ? value : prevs.email
            }
        })
    }
    const onClick = () => {
        if (team.firstName.length < 2) {
            setError('Please fill the all fields');
            return;
        }
        if (team.lastName.length < 2) {
            setError('Please fill the all fields');
            return;
        }
        if (team.cell.length < 10) {
            setError('Please fill the all fields');
            return;
        }
        if (!team.email.includes('@') || !team.email.includes('.')) {
            setError('Please fill the all fields');
            return;
        }
        const finalizedTeam = {
            team: team.team,
            captain: `${team.firstName} ${team.lastName}`,
            cell: team.cell,
            email: team.email
        }
        props.onClick(finalizedTeam);
    }

    return <Paper sx={{ position: 'absolute', inset: 'auto 2% auto 2%', p: '1rem', zIndex: '6000' }}>
        <Typography sx={{mb: '1rem'}} variant='h5'>Captains Information</Typography>
        <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
                <TextField fullWidth value={team.firstName} required onChange={setTeamHandler} id='firstName' label="First Name" />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField fullWidth value={team.lastName} required onChange={setTeamHandler} id='lastName' label="Last Name" />
            </Grid>
            <Grid item xs={12}>
                <TextField fullWidth value={team.cell} required onChange={setTeamHandler} id='cell' label="Cell Phone" />
            </Grid>
            <Grid item xs={12}>
                <TextField fullWidth value={team.email} required onChange={setTeamHandler} id='email' label="Email Address" />
            </Grid>
        </Grid>
        <Box sx={{ display: 'flex', p: '1rem 0 0 0' }}>
            <Button onClick={props.close} sx={{ borderRadius: '50rem', width: '48%', m: '1%' }} variant="outlined" color="error">Close</Button>
            <Button onClick={onClick} sx={{ borderRadius: '50rem', width: '48%', m: '1%' }} variant="contained" color={error ? "error" : "primary"}>Next</Button>
        </Box>
        {error && <p><strong>{error}</strong></p>}
    </Paper>

}
export default TeamForm;

function formatPhoneNumber(phoneNumberString) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return match[1] + '-' + match[2] + '-' + match[3];
    }
    return phoneNumberString;
}