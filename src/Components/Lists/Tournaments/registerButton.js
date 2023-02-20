import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Button from '@mui/material/Button';
import { useEffect, useState } from "react";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Box } from "@mui/system";
import SportsBaseballIcon from '@mui/icons-material/SportsBaseball';
import { useSelector } from 'react-redux';

const RegisterButton = (props) => {
    const registrationArray = useSelector(state => state.registrations.registration);
    const userAuth = useSelector(state => state.user.auth);
    const user = useSelector(state => state.user.account);
    const [registrations, setRegistrations] = useState([]);
    useEffect(() => {
        const registrationList = registrationArray.filter((reg) => {
            return reg.tournament._id === props.tournament._id;
        })
        setRegistrations(registrationList);
    }, [registrationArray]);
    const [division, setDivision] = useState(false);
    var CancellationDate = new Date(props.tournament.EntryDeadline);
    var today = new Date();
    useEffect(() => {
        if (props.tournament.divisions.length > 0 && props.tournament.divisions[0].length > 0) {
            setDivision(props.tournament.divisions);
        }
    }, []);
    if (props.tournament.tournamentType.trim().includes("NSA")) {
        return <Button fullWidth color='error' variant='outlined' sx={{ borderRadius: '50rem' }} href={props.tournament.externalLink} target='_blank'>Register (NSA)</Button>
    }
    if (props.count <= 0) {
        return <Button startIcon={<i class="fa - solid fa - people - group"></i>} disabled fullWidth variant='contained' sx={{ borderRadius: '50rem' }} value={props.tournament._id}>Sold Out</Button>
    }
    if (registrations.length > 0 && userAuth) {
        if (division) {
            return <Box sx={{ width: '100%' }}>
                {division.map((div, index) => {
                    const check = registrations.some((registration) => {
                        return registration.team.captain === `${user.name.givenName} ${user.name.familyName}` &&
                            registration.team.cell === `${user.phones}` &&
                            registration.team.division === div;
                    })
                    if (check) {
                        return <Button key={`${div}-${index}`} startIcon={<CheckCircleIcon />} sx={{ borderRadius: '50rem', width: '100%' }} variant="contained" color="success">{`Registered(${div})`}</Button>
                    } else {
                        if (today.toLocaleDateString('us-en') !== CancellationDate.toLocaleDateString('us-en') && CancellationDate < today) {
                            return <Button variant='contained' key={`${div}-${index}`} disabled fullWidth startIcon={<AccessTimeIcon />} sx={{ borderRadius: '50rem' }} value={props.tournament._id}>Deadline Passed</Button>
                        }
                        return <Button variant='contained' key={`${div}-${index}`} onClick={props.onClick} id={div} fullWidth sx={{ borderRadius: '50rem' }} value={props.tournament._id}>{div}</Button>
                    }
                })}
            </Box>
        }
        const check = registrations.some((registration) => {
            return registration.team.captain === `${user.name.givenName} ${user.name.familyName}` &&
                registration.team.cell === user.phone;
        });
        if (check) {
            return <Button startIcon={<CheckCircleIcon />} sx={{ borderRadius: '50rem', width: '100%' }} variant="contained" color="success">Registered</Button>
        }
    }
    if (division) {
        // this event has divsions
        return <Box sx={{ width: '100%' }}>
            {division.map((div, index) => {
                if (today.toLocaleDateString('us-en') !== CancellationDate.toLocaleDateString('us-en') && CancellationDate < today) {
                    return <Button variant='contained' key={`${div}-${index}`} startIcon={<AccessTimeIcon />} disabled sx={{ borderRadius: '50rem', width: '98%', m: '1%' }} value={props.tournament._id}>Deadline Passed</Button>
                }
                return <Button variant='contained' key={`${div}-${index}`} onClick={props.onClick} id={div} startIcon={<SportsBaseballIcon />} sx={{ borderRadius: '50rem', width: '98%', m: '1%' }} value={props.tournament._id}>{div}</Button>
            })}
        </Box>
    }
    if (today.toLocaleDateString('us-en') !== CancellationDate.toLocaleDateString('us-en') && CancellationDate < today) {
        return <Button startIcon={<AccessTimeIcon />} fullWidth disabled sx={{ borderRadius: '50rem', width: '100%' }} variant="contained" value={props.tournament._id}>Deadline Passed</Button>
    }
    return <Button onClick={props.onClick} startIcon={<SportsBaseballIcon />} fullWidth sx={{ borderRadius: '50rem', width: '100%' }} variant="contained" value={props.tournament._id}>Register</Button>
}
export default RegisterButton;