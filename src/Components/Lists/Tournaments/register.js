import { Fragment, useEffect, useReducer, useState } from "react";
import { Button, Paper, TextField, Typography } from "@mui/material";
import LoginForm from '../../Forms/LoginForm';
import { Box } from "@mui/system";
import PaypalButton from "../../Buttons/paypalButton";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import TeamForm from "../../Forms/TeamForm";
import Alert from '@mui/material/Alert';
import { Backdrop } from "@mui/material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const Register = (props) => {
    const user = useSelector(state => state.user.account);
    const userAuth = useSelector(state => state.user.auth);
    const token = useSelector(state => state.user.token);
    const Axios = axios.create({
        headers: { 'Authorization': `Bearer ${token}` }
    });
    const dispatch = useDispatch();
    const [responses, setResponse] = useState('');

    const [stage, setStage] = useState(!userAuth ? "login?" : "check");
    const [tournament, setTournament] = useState(props.tournament);
    const [error, setError] = useState(false);
    const [data, setData] = useState({
        tournamentId: props.tournament._id,
        team: '',
        captain: !user ? '' : `${user.name.givenName} ${user.name.familyName}`,
        cell: !user ? '' : `${user.phone}`,
        email: !user ? '' : `${user.username}`,
        status: '',
        comments: '',
        division: !props.division ? '' : `${props.division}`
    });
    useEffect(() => {
        if (!userAuth) {
            return;
        }
        Axios.post(`/api/teamsByUser`, {
            captain: `${user.name.givenName} ${user.name.familyName}`,
            cell: user.phone
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
                        newTeam: true,
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
                    newTeam: false,
                }
            });
        });
    }, [user]);
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
        Axios.post(`/api/teamsByUser`, {
            captain: data.captain,
            cell: data.cell
        }).then((response) => {
            const team = response.data;
            if (team.length < 1) {
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
                        newTeam: true,
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
                    newTeam: false,
                }
            });
        });
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
            axios.post('/api/register', data).then((response) => {
                resolve(response.data);
            }).catch((error) => {
                reject(error.message);
            })
        });
    }
    const PayLater = () => {
        registerNow().then((data) => {
            setResponse(data);
            setStage('completed');
        }).catch((data) => {
            setStage('error');
            setResponse(data);
        });
    }
    const payment = (payment) => {
        setData((prevs) => {
            return {
                tournamentId: prevs.tournamentId,
                team: prevs.team,
                captain: prevs.captain,
                cell: prevs.cell,
                email: prevs.email,
                status: prevs.status,
                comments: prevs.comments,
                division: prevs.division,
                payment: payment
            }
        });
        registerNow().then((data) => {
            setResponse(data);
            setStage('paymentCompleted');
        }).catch((data) => {
            setStage('error');
            setResponse(data);
        });
    }
    const emt = () => {
        registerNow().then((data) => {
            setResponse(data);
            setStage('emt');
        }).catch((data) => {
            setResponse(data);
        });
    }
    return <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
    >
        {/* starting notice  */}
        {stage === "DepositNotice" && <Paper sx={{ position: 'absolute', inset: 'auto 2% auto 2%', p: '1rem', zIndex: '6000' }}>
            <Typography variant='h6'>Please Note</Typography>
            <p>All new teams are required to pay a $100.00 deposit before their registration will be complete</p>
            <Button fullWidth onClick={() => { setStage('loggedOutRegister') }} sx={{ borderRadius: '50rem' }} variant="contained" color="success">I Understand</Button>
        </Paper>}
        {stage === 'check' && data.status === 'new' && <Paper sx={{ position: 'absolute', inset: 'auto 2% auto 2%', p: '1rem', zIndex: '6000' }}>
            <Typography variant='h6'>Please Note</Typography>
            <p>All new teams are required to pay a $100.00 deposit before their registration will be complete</p>
            <Button onClick={() => { setStage('name') }} sx={{ borderRadius: '50rem', width: '50%', m: '1%' }} variant="contained" color="success">I Understand</Button>
        </Paper>}
        {stage === 'check' && data.status !== 'new' && <Paper sx={{ position: 'absolute', inset: 'auto 2% auto 2%', p: '1rem', zIndex: '6000' }}>
            <Typography variant='h5'>Teams Name</Typography>
            <TextField fullWidth onChange={changedName} id='TeamName' label="Please Enter A Team Name" />
            <Box sx={{ display: 'flex', p: '1rem 0 0 0' }}>
                <Button onClick={props.close} sx={{ borderRadius: '50rem', width: '50%', m: '1%' }} variant="contained" color="error">Cancel</Button>
                <Button onClick={enterName} sx={{ borderRadius: '50rem', width: '50%', m: '1%' }} variant={error ? 'outlined' : "contained"} color={error ? 'error' : 'success'}>Next</Button>
            </Box>
            {error && <Alert severity="error">{error}</Alert>}
        </Paper>
        }
        {stage === "name" && <Paper sx={{ position: 'absolute', inset: 'auto 2% auto 2%', p: '1rem', zIndex: '6000' }}>
            <Typography variant='h5'>Teams Name</Typography>
            <TextField fullWidth onChange={changedName} id='TeamName' label="Please Enter A Team Name" />
            <Box sx={{ display: 'flex', p: '1rem 0 0 0' }}>
                <Button onClick={props.close} sx={{ borderRadius: '50rem', width: '50%', m: '1%' }} variant="contained" color="error">Cancel</Button>
                <Button onClick={enterName} sx={{ borderRadius: '50rem', width: '50%', m: '1%' }} variant={error ? 'outlined' : "contained"} color={error ? 'error' : 'success'}>Next</Button>
            </Box>
            {error && <Alert severity="error">{error}</Alert>}
        </Paper>}
        {/* logging in to register  */}
        {stage === "login?" && <Paper sx={{ position: 'absolute', inset: 'auto 2% auto 2%', p: '1rem', zIndex: '6000' }}>
            <Typography variant='h5'>Would you like to login?</Typography>
            <Box sx={{ display: 'flex', p: '1rem 0 0 0' }}>
                <Button onClick={() => { setStage('DepositNotice') }} sx={{ borderRadius: '50rem', width: '50%', m: '1%' }} variant="outlined" color="error">No</Button>
                <Button onClick={() => { setStage('loginForm') }} sx={{ borderRadius: '50rem', width: '50%', m: '1%' }} variant="contained" color="success">Yes</Button>
            </Box>
        </Paper>}
        {stage === "division" && <Paper sx={{ position: 'absolute', inset: 'auto 2% auto 2%', p: '1rem', zIndex: '6000' }}>
            <Typography variant='h5'>Please Confirm your division</Typography>
            <Box sx={{ p: '1rem 0 0 0' }}>
                {tournament.divisions.map((division) => {
                    return <Button onClick={enterDivision} sx={{ borderRadius: '50rem', m: '1%', minWidth: '98%' }} variant="outlined" color="primary">{division}</Button>
                })}
            </Box>
        </Paper>}

        {/* enter info without logining in  */}
        {stage === "loggedOutRegister" && <TeamForm close={props.close} onClick={checkEnteredTeam} />}

        {stage === "loginForm" && <Paper sx={{ position: 'absolute', inset: 'auto 2% auto 2%', p: '1rem', zIndex: '6000' }}>
            <Typography variant='h5'>Please login</Typography>
            <LoginForm user={props.user} setUser={props.setUser} onComplete={completedLogin} />
        </Paper>}
        {stage === "comments" && <Paper sx={{ position: 'absolute', inset: 'auto 2% auto 2%', p: '1rem', zIndex: '6000' }}>
            <Typography variant='h5'>Comments</Typography>
            <TextField fullWidth onChange={addComments} id='comments' label="Notes and comments" />
            <Box sx={{ display: 'flex', p: '1rem 0 0 0' }}>
                <Button onClick={props.close} sx={{ borderRadius: '50rem', width: '50%', m: '1%' }} variant="contained" color="error">Cancel</Button>
                <Button onClick={() => { setStage('paymentCheck'); }} sx={{ borderRadius: '50rem', width: '50%', m: '1%' }} variant="contained" color="primary">Next</Button>
            </Box>
        </Paper>}
        {stage === "paymentCheck" && <Fragment>
            {data.status === "new" && <Paper sx={{ position: 'absolute', inset: 'auto 2% auto 2%', p: '1rem', zIndex: '6000' }}>
                <Typography variant='h5'>Payment options</Typography>
                <Box sx={{ display: 'flex', p: '1rem 0 0 0' }}>
                    <Button onClick={() => { setStage('fullPayment'); }} sx={{ borderRadius: '50rem', width: '50%', m: '1%' }} variant="contained" color="primary">Full Payment</Button>
                    <Button onClick={() => { setStage('deposit'); }} sx={{ borderRadius: '50rem', width: '50%', m: '1%' }} variant="contained" color="success">Deposit</Button>
                </Box>
            </Paper>}
            {data.status === "Good" && <Paper sx={{ position: 'absolute', inset: 'auto 2% auto 2%', p: '1rem', zIndex: '6000' }}>
                <Typography variant='h5'>Confirmation</Typography>
                <Box sx={{ display: 'flex' }}>
                    <Button onClick={PayLater} sx={{ borderRadius: '50rem', width: '50%', m: '1%' }} variant="contained" color="success">Pay Later</Button>
                    <Button onClick={() => { setStage('showPaymentOptions'); }} sx={{ borderRadius: '50rem', width: '50%', m: '1%' }} variant="contained" color="primary">Pay Now</Button>
                </Box>
            </Paper>}
            {data.status === "Prepay" && <Paper sx={{ position: 'absolute', inset: 'auto 2% auto 2%', p: '1rem', zIndex: '6000' }}>
                <Typography variant='h5'>Payment Methods</Typography>
                <Box sx={{ display: 'flex', alignItems: 'start', p: '1rem 0 0 0' }}>
                    <Button onClick={emt} sx={{ borderRadius: '50rem', width: '50%', m: '0 1%', height: 45 }} variant="contained" color="primary">{`E.M.T. (${tournament.cost})`}</Button>
                    <PaypalButton amount={tournament.cost} onComplete={payment} />
                </Box>
            </Paper>}
            {data.status === "Depoist" && <Paper sx={{ position: 'absolute', inset: 'auto 2% auto 2%', p: '1rem', zIndex: '6000' }}>
                <Typography variant='h5'>Confirmation & Payment</Typography>
                <Box sx={{ display: 'flex' }}>
                    <Button onClick={() => { setStage('fullPayment'); }} sx={{ borderRadius: '50rem', width: '50%', m: '1%' }} variant="contained" color="primary">Full Payment</Button>
                    <Button onClick={() => { setStage('deposit'); }} sx={{ borderRadius: '50rem', width: '50%', m: '1%' }} variant="contained" color="success">Deposit</Button>
                </Box>
            </Paper>}
        </Fragment>}
        {stage === "showPaymentOptions" && <Paper sx={{ position: 'absolute', inset: 'auto 2% auto 2%', p: '1rem', zIndex: '6000' }}>
            <Typography variant='h5'>Payment options</Typography>
            <Box sx={{ display: 'flex', p: '1rem 0 0 0' }}>
                <Button onClick={() => { setStage('fullPayment'); }} sx={{ borderRadius: '50rem', width: '50%', m: '1%' }} variant="contained" color="primary">Full Payment</Button>
                <Button onClick={() => { setStage('deposit'); }} sx={{ borderRadius: '50rem', width: '50%', m: '1%' }} variant="contained" color="success">Deposit</Button>
            </Box>
        </Paper>}
        {stage === 'fullPayment' && <Paper sx={{ position: 'absolute', inset: 'auto 2% auto 2%', p: '1rem', zIndex: '6000' }}>
            <Typography variant='h5'>Payment Methods</Typography>
            <Box sx={{ display: 'flex', alignItems: 'start', p: '1rem 0 0 0' }}>
                <Button onClick={emt} sx={{ borderRadius: '50rem', width: '50%', m: '0 1%', height: 45 }} variant="contained" color="primary">{`E.M.T. (${tournament.cost})`}</Button>
                <PaypalButton amount={tournament.cost} onComplete={payment} />
            </Box>
        </Paper>}
        {stage === 'deposit' && <Paper sx={{ position: 'absolute', inset: 'auto 2% auto 2%', p: '1rem', zIndex: '6000' }}>
            <Typography variant='h5'>Payment Methods</Typography>
            <Box sx={{ display: 'flex', alignItems: 'start', p: '1rem 0 0 0' }}>
                <Button onClick={emt} sx={{ borderRadius: '50rem', width: '50%', m: '0 1%', height: 45 }} variant="contained" color="primary">E.M.T. ($100.00)</Button>
                <PaypalButton amount={100} onComplete={payment} />
            </Box>
        </Paper>}
        {stage === 'emt' && <Paper sx={{ position: 'absolute', inset: 'auto 2% auto 2%', p: '1rem', zIndex: '6000' }}>
            <CheckCircleOutlineIcon color='success' sx={{ fontSize: 55 }} />
            <Typography variant='h5'>Registration Complete!</Typography>
            <hr />
            <p><strong>E.M.T. Instructions</strong></p>
            <p>Email: <span style={{ color: 'red', fontWeight: '700' }}>info@spfacanada.ca</span></p>
            <p>Password: <span style={{ color: 'red', fontWeight: '700' }}>softball</span></p>
            <hr />
            <p>{responses}</p>
            <Button onClick={() => { window.location.reload() }} sx={{ borderRadius: '50rem', width: '98%', m: '1%' }} variant="contained" color="success">Close</Button>
        </Paper>}
        {stage === 'completed' && <Paper sx={{ position: 'absolute', inset: 'auto 2% auto 2%', p: '1rem', zIndex: '6000' }}>
            <CheckCircleOutlineIcon color='success' sx={{ fontSize: 55 }} />
            <Typography variant='h5'>Registration Complete!</Typography>
            <p>{responses}</p>
            <Button onClick={() => { window.location.reload() }} sx={{ borderRadius: '50rem', width: '98%', m: '1%' }} variant="contained" color="success">Close</Button>
        </Paper>}
        {stage === 'error' && <Paper sx={{ position: 'absolute', inset: 'auto 2% auto 2%', p: '1rem', zIndex: '6000' }}>
            <ErrorOutlineIcon color="error" sx={{ fontSize: 55 }} />
            <Typography variant='h5'>There seems to be an issue</Typography>
            <p>{responses.responseText}</p>
            {responses.responseText === 'Your team as already registered for this event(and/or division)' &&
                tournament.divisions.length > 0 &&
                tournament.divisions[0].length > 0 &&
                <Button onClick={() => { setStage('division'); }} sx={{ borderRadius: '50rem', width: '48%', m: '1%' }} variant="contained" color="primary">
                    Select Another Division
                </Button>}
            <Button onClick={props.close} sx={{ borderRadius: '50rem', width: '48%', m: '1%' }} variant="contained" color="error">Cancel</Button>
        </Paper>}
        {stage === 'paymentCompleted' && <Paper sx={{ position: 'absolute', inset: 'auto 2% auto 2%', p: '1rem', zIndex: '6000' }}>
            <CheckCircleOutlineIcon color='success' sx={{ fontSize: 55 }} />
            <Typography variant='h5'>Registered & Paid!</Typography>
            <p>{responses}</p>
            <Button onClick={() => { window.location.reload() }} sx={{ borderRadius: '50rem', width: '98%', m: '1%' }} variant="contained" color="success">Close</Button>
        </Paper>}
    </Backdrop>
}
export default Register;