import { Fragment, useEffect, useReducer, useState } from "react";
import { Button, Paper, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { Backdrop } from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import TeamForm from "../../../Forms/TeamForm";
import Alert from '@mui/material/Alert';
import axios from "axios";

const Register = (props) => {
    const [responses, setResponse] = useState('');
    const [stage, setStage] = useState("loggedOutRegister");
    const [tournament, setTournament] = useState(props.tournament);
    const [error, setError] = useState(false);
    const [data, setData] = useState({
        tournamentId: props.tournament._id,
        team: '',
        captain: '',
        cell: '',
        email: '',
        status: '',
        comments: '',
        division: !props.division ? 'Co-Ed' : `${props.division}`
    });

    const checkEnteredTeam = (team) => {
        setData((prevs) => {
            return {
                tournamentId: prevs.tournamentId,
                team: team.team,
                captain: team.captain,
                cell: team.cell,
                email: team.email,
                status: prevs.status,
                comments: prevs.comments,
                division: prevs.division,
                newTeam: prevs.newTeam
            }
        });
        CheckTeamStatus(team);
        setStage('name');
    }
    const CheckTeamStatus = (data) => {
        axios.get('/api/registrations/byUser',{
            data
        }).then((response) => {
            const team = response.data;
            if (team[0] === null) {
                setData((prevs) => {
                    return {
                        tournamentId: prevs.tournamentId,
                        team: prevs.team,
                        captain: prevs.captain,
                        cell: prevs.cell,
                        email: prevs.email,
                        status: 'new',
                        comments: prevs.comments,
                        division: prevs.division,
                        newTeam: true
                    }
                });
                return;
            }
            setData((prevs) => {
                return {
                    tournamentId: prevs.tournamentId,
                    team: prevs.team,
                    captain: prevs.captain,
                    cell: prevs.cell,
                    email: prevs.email,
                    status: team[0].status,
                    comments: prevs.comments,
                    division: prevs.division,
                    newTeam: false
                }
            });
        })
    }
    const changedName = (event) => {
        var name = event.target.value;
        setData((prevs) => {
            return {
                tournamentId: prevs.tournamentId,
                team: name,
                captain: prevs.captain,
                cell: prevs.cell,
                email: prevs.email,
                status: prevs.status,
                comments: prevs.comments,
                division: prevs.division,
                newTeam: prevs.newTeam
            }
        });
    }
    const enterName = () => {
        if (data.team.trim().length === 0) {
            setError('Please Fill in a team name');
            return;
        } else {
            setError(false);
        }
        if (data.division) {
            axios.post('/api/registrationCheck/withDivision', {
                eventId: data.tournamentId,
                cell: data.cell,
                division: data.division
            }).then((response) => {
                if (response.data) {
                    setResponse({ responseText: "Your team as already registered for this event(and/or division)", status: 400 });
                    setStage('error');
                    return
                }
                setStage('comments');
            }).catch(() => {
                setResponse({ responseText: "Your team as already registered for this event(and/or division)", status: 400 });
                setStage('error')
            })
        } else {
            axios.post('/api/registrationCheck/withoutDivision', {
                eventId: data.tournamentId,
                cell: data.cell,
            }).then((response) => {
                if (response.data) {
                    setResponse({ responseText: "Your team as already registered for this event(and/or division)", status: 400 });
                    setStage('error');
                    return
                }
                setStage('comments');
            }).catch(() => {
                setResponse({ responseText: "Your team as already registered for this event(and/or division)", status: 400 });
                setStage('error')
            })
        }
    }
    const addComments = (event) => {
        var comment = event.target.value;
        setData((prevs) => {
            return {
                tournamentId: prevs.tournamentId,
                team: prevs.team,
                captain: prevs.captain,
                cell: prevs.cell,
                email: prevs.email,
                status: prevs.status,
                comments: comment,
                division: prevs.division,
                newTeam: prevs.newTeam
            }
        });
    }
    const completedLogin = () => {
        setStage('name');
    }
    const enterDivision = (event) => {
        const division = event.target.childNodes[0].nodeValue;
        setData((prevs) => {
            return {
                tournamentId: prevs.tournamentId,
                team: prevs.team,
                captain: prevs.captain,
                cell: prevs.cell,
                email: prevs.email,
                status: prevs.status,
                comments: prevs.comments,
                division: division,
                newTeam: prevs.newTeam
            }
        });
        axios.post('/api/registrationCheck/withDivision', {
            eventId: data.tournamentId,
            cell: data.cell,
            division: data.division
        }).then((response) => {
            if (response.data) {
                setResponse({ responseText: "Your team as already registered for this event(and/or division)", status: 400 });
                setStage('error');
                return
            }
            setStage('comments');
        }).catch(() => {
            setResponse({ responseText: "Your team as already registered for this event(and/or division)", status: 400 });
            setStage('error')
        })
    }
    const registerNow = () => {
        return new Promise((resolve, reject) => {
            axios.post('/api/register', {
                data
            }).then((response) => {
                resolve(response.data);
            }).catch((error) => {
                reject(error.message);
            });
        });
    }
    const register = () => {
        registerNow().then((data) => {
            setResponse(data);
            setStage('completed');
        }).catch((data) => {
            setStage('error');
            setResponse(data);
        });
    }
    return <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
    >
        {stage === 'check' && data.status === 'new' && <Paper sx={{ position: 'absolute', inset: 'auto 2% auto 2%', p: '1rem', zIndex: '6000' }}>
            <h6>Please Note</h6>
            <p>All new teams are required to pay a $100.00 deposit before their registration will be complete</p>
            <Button onClick={() => { setStage('name') }} sx={{ borderRadius: '50rem', width: '50%', m: '1%' }} variant="contained" color="success">I Understand</Button>
        </Paper>}
        {stage === 'check' && data.status !== 'new' && <Paper sx={{ position: 'absolute', inset: 'auto 2% auto 2%', p: '1rem', zIndex: '6000' }}>
            <h5 className='m-2 text-start'>Teams Name</h5>
            <TextField fullWidth onChange={changedName} id="TeamName" label="Please Enter A Team Name" />
            <Box sx={{ display: 'flex', p: '1rem 0 0 0' }}>
                <Button onClick={props.close} sx={{ borderRadius: '50rem', width: '50%', m: '1%' }} variant="contained" color="error">Cancel</Button>
                <Button onClick={enterName} sx={{ borderRadius: '50rem', width: '50%', m: '1%' }} variant={error ? 'outlined' : "contained"} color={error ? 'error' : 'success'}>Next</Button>
            </Box>
            {error && <Alert severity="error">{error}</Alert>}
        </Paper>
        }
        {stage === "name" && <Paper sx={{ position: 'absolute', inset: 'auto 2% auto 2%', p: '1rem', zIndex: '6000' }}>
            <h5 className='m-2 text-start'>Teams Name</h5>
            <TextField onChange={changedName} fullWidth id="TeamName" label="Please Enter A Team Name" />
            <Box sx={{ display: 'flex', p: '1rem 0 0 0' }}>
                <Button onClick={props.close} sx={{ borderRadius: '50rem', width: '50%', m: '1%' }} variant="contained" color="error">Cancel</Button>
                <Button onClick={enterName} sx={{ borderRadius: '50rem', width: '50%', m: '1%' }} variant={error ? 'outlined' : "contained"} color={error ? 'error' : 'success'}>Next</Button>
            </Box>
            {error && <Alert severity="error">{error}</Alert>}
        </Paper>}
        {stage === "division" && <Paper sx={{ position: 'absolute', inset: 'auto 2% auto 2%', p: '1rem', zIndex: '6000' }}>
            <h5>Please Confirm your division</h5>
            <Box sx={{ p: '1rem 0 0 0' }}>
                {tournament.divisions.map((division) => {
                    return <Button onClick={enterDivision} sx={{ borderRadius: '50rem', m: '1%', minWidth: '98%' }} variant="outlined" color="primary">{division}</Button>
                })}
            </Box>
        </Paper>}

        {/* enter info without logining in  */}
        {stage === "loggedOutRegister" && <TeamForm close={props.close} onClick={checkEnteredTeam} />}
        {stage === "comments" && <Paper sx={{ position: 'absolute', inset: 'auto 2% auto 2%', p: '1rem', zIndex: '6000' }}>
            <h5 className='m-2 text-start'>Comments</h5>
            <TextField onChange={addComments} id="comments" label="Notes and comments" />
            <Box sx={{ display: 'flex', p: '1rem 0 0 0' }}>
                <Button onClick={props.close} sx={{ borderRadius: '50rem', width: '50%', m: '1%' }} variant="contained" color="error">Cancel</Button>
                <Button onClick={() => { setStage('confirm'); }} sx={{ borderRadius: '50rem', width: '50%', m: '1%' }} variant="contained" color="primary">Next</Button>
            </Box>
        </Paper>}
        {stage === 'confirm' && <Paper sx={{ position: 'absolute', inset: 'auto 2% auto 2%', p: '1rem', zIndex: '6000' }}>
            <h5 className='m-2 text-start'>Confirmation</h5>
            <p>Please confirm all information in correct</p>
            <p>{`Team Name: ${data.team}`}</p>
            <p>{`Captain: ${data.captain}`}</p>
            <p>{`Cell Phone: ${data.cell}`}</p>
            <p>{`Email Address: ${data.email}`}</p>
            <p>{`Division: ${data.division}`}</p>
            <p>{`Comments: ${data.comments}`}</p>
            <Box sx={{ display: 'flex', p: '1rem 0 0 0' }}>
                <Button onClick={props.close} sx={{ borderRadius: '50rem', width: '50%', m: '1%' }} variant="outlined" color="error">Cancel</Button>
                <Button onClick={register} sx={{ borderRadius: '50rem', width: '50%', m: '1%' }} variant="contained" color="success">Confirm</Button>
            </Box>
        </Paper>}
        {stage === 'completed' && <Paper sx={{ position: 'absolute', inset: 'auto 2% auto 2%', p: '1rem', zIndex: '6000', display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
            <CheckCircleOutlineIcon color='success' sx={{ fontSize: 55, margin: 'auto' }} />
            <h5>Registration Complete!</h5>
            <p>{responses}</p>
            <Button onClick={() => { window.location.reload() }} sx={{ borderRadius: '50rem', width: '98%', m: '1%' }} variant="contained" color="success">Close</Button>
        </Paper>}
        {stage === 'error' && <Paper sx={{ position: 'absolute', inset: 'auto 2% auto 2%', p: '1rem', zIndex: '6000', display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
            <ErrorOutlineIcon color="error" sx={{ fontSize: 55, margin: 'auto' }} />
            <h5>There seems to be an issue</h5>
            <p>{responses.responseText}</p>
            {responses.responseText === 'Your team as already registered for this event(and/or division)' &&
                tournament.divisions.length > 0 &&
                tournament.divisions[0].length > 0 &&
                <Button onClick={() => { setStage('division'); }} sx={{ borderRadius: '50rem', width: '48%', m: '1%' }} variant="contained" color="primary">
                    Select Another Division
                </Button>}
            <Button onClick={props.close} sx={{ borderRadius: '50rem', width: '48%', m: 'auto' }} variant="contained" color="error">Cancel</Button>
        </Paper>}
    </Backdrop>
}
export default Register;