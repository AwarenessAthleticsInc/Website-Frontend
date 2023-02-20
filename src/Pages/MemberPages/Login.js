import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Button,
    Grid,
    TextField,
    Typography,
    Alert
} from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import PasswordStrengthBar from 'react-password-strength-bar';
import logo from '../../Assets/Images/logo.webp';
import ForgotPasswordFrom from '../../Components/Forms/ForgotPasswordForm';
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../Store/Slices/User/userSlice";
import axios from 'axios';
const Login = () => {
    const userAuth = useSelector(state => state.user.auth);
    let navigate = useNavigate();
    useEffect(() => {
        if (!userAuth) {
            return;
        }
        navigate('/');
    }, [userAuth, navigate]);
    const dispatch = useDispatch();
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState([]);
    const [error, setError] = useState('');
    const [login, setLogin] = useState(true);
    const [forgot, setForgot] = useState(false);
    const [user, setUser] = useState({
        name: {
            givenName: '',
            familyName: '',
        },
        phone: '',
        username: '',
        password: '',
        confirmation: ''
    });
    const setUserHandler = (event) => {
        const id = event.target.id;
        const value = event.target.value;
        setUser((prevs) => {
            return {
                name: {
                    givenName: id === 'givenName' ? value : prevs.givenName,
                    familyName: id === 'familyName' ? value : prevs.familyName,
                },
                phone: id === 'phone' ? formatPhoneNumber(value) : prevs.phone,
                username: id === 'email' ? value : prevs.username,
                password: id === 'password' ? value : prevs.password,
                confirmation: id === 'confirmation' ? value : prevs.confirmation
            }
        })
    }
    const sendLoginRequest = () => {
        axios.post('/api/login', {
            username: user.username,
            password: user.password
        }).then((res) => {
            dispatch(userActions.setToken(res.data));
            setError('');
         }).catch((error) => {
             const response = error.response.data;
             if (response === 'Unauthorized') {
                 setError('Incorrect username or password.');
                 return;
             }
             if (response.includes('No account')) {
                 setError(response);
             }
             setError(response);
         });
    }
    const sendRegisterRequest = () => {
        if(user.password !== user.confirmation) {
            setError('Confirmation does not match your password');
            return;
        }
        if(score < 3) {
            setError('Password is too week. Please pick a stronger password');
            return;
        }
        if(user.phone.length < 10) {
            setError('Please fill in a valid phone number');
            return;
        }
        if (!user.username.includes('@') || !user.username.includes('.')) {
            setError('Please fill in a valid email address');
            return;
        } 
        axios({
            method: 'post',
            url: '/api/register',
            data: {
                username: user.username,
                password: user.password,
                phone: user.phone,
                givenName: user.givenName,
                familyName: user.familyName
            }
        }).then((res) => {
            dispatch(userActions.setToken(res.data));
            setError('');
        }).catch((error) => {
            const response = `${error.response.data}`;
            if (response === 'Unauthorized') {
                setError('Incorrect username or password.');
                return;
            }
            if (response.includes('No account')) {
                setError(response);
            }
            setError(response);
        });
    }
    const scoreChecker = (score, feedback) => {
        setScore(score);
        setFeedback(feedback.suggestions || []);
    }

    return <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        m: { xs: '2% 1%', md: '5% 15%' },
        width: { xs: '98%', md: '75%' }
    }}>
        <img alt='Slo pitch for awanress logo' src={logo} />
        <br />
        <Grid container spacing={2}>
            {!login && <Grid item xs={12} md={6}>
                <TextField fullWidth id="givenName" label="First Name" value={user.name.givenName} onChange={setUserHandler} />
            </Grid>}
            {!login && <Grid item xs={12} md={6}>
                <TextField fullWidth id="familyName" label="Last Name" value={user.name.familyName} onChange={setUserHandler} />
            </Grid>}
            <Grid item xs={12}>
                <TextField fullWidth id="email" label="Email Address" value={user.username} onChange={setUserHandler} />
            </Grid>
            {!login && <Grid item xs={12}>
                <TextField fullWidth id="phone" label="Cell Phone" value={user.phone}  onChange={setUserHandler} />
            </Grid>}
            <Grid item xs={12}>
                <TextField fullWidth type="password" id="password" label="Password" value={user.password} onChange={setUserHandler} />
                {!login && <PasswordStrengthBar password={user.password} minLength={8} onChangeScore={scoreChecker}/>}
                {!login && feedback.map((message) => {
                    return <Typography key={message} sx={{ display: 'block' }} variant='p'><InfoIcon color='info'/> {message}</Typography>
                })}
            </Grid>
            {!login && <Grid item xs={12}>
                <TextField fullWidth type="password" id="confirmation" label="Confirm Password" value={user.confirmation} onChange={setUserHandler} />
            </Grid>}
        </Grid>
        {error && <Alert sx={{ width: '100%', mt: '1rem' }} severity="error">{error}</Alert>}
        <Box sx={{display: 'flex', alignItems: 'center'}}>
            <Typography variant='p'>{login ? `Don't have an account?` : `Already have an account?`}</Typography>
            <Button sx={{ fontSize: 'inherit', textTransform: 'inherit' }} onClick={() => { setLogin(!login); setError(''); }}>{login ? `Create One` : `Login Here`}</Button>
        </Box>
        <Button onClick={login ? sendLoginRequest : sendRegisterRequest} color={login ? 'primary' : 'success'} fullWidth sx={{borderRadius: '50rem'}} variant='contained'>{login ? `Login` : `Create Account`}</Button>
        <Button onClick={() => { setForgot(!forgot) }} variant='text' color='action'>Forgot Password</Button>
        {forgot && <ForgotPasswordFrom close={() => { setForgot(!forgot) }} />}
    </Box>
}
export default Login;



const formatPhoneNumber = (phoneNumberString) => {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        var intlCode = (match[1] ? '+1 ' : '');
        return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
    }
    return null;
}