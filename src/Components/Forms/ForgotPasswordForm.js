import { Paper, TextField, Box, Button, Alert, AlertTitle, Backdrop } from "@mui/material";
import { useState } from "react";

import axios from 'axios'

const ForgotPasswordFrom = (props) => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const setEmailHandler = (event) => {
        const value = event.target.value;
        setEmail(value);
    }
    const postEmail = () => {
        if (!email.includes('@') && !email.includes('.')) {
            setError({
                title: 'Invalid Email',
                message: 'Please Fill in a valid email address'
            });
            return;
        }
        setError(false);
        axios.post('/api/forgotpassword/', {
            email
        }).then((response) => {
            setSuccess({
                title: 'Success',
                message: response.data
            });
        }).catch((error) => {
            console.log(error);
            setError({
                title: error.code,
                message: error.message
            });
        });
    }


    return <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
    >
        <Paper sx={{ position: 'absolute', inset: 'auto 2% auto 2%', p: '2rem', zIndex: '6000' }}>
            <h6>Please Enter the email address of your account</h6>
            <TextField onClick={() => { setError(false) }} value={email} onChange={setEmailHandler} sx={{ width: '100%' }} id="email" label="E-mail Address" variant="standard" />
            {error && <Alert severity="error" sx={{ textAlign: 'left', marginTop: '1%' }}>
                <AlertTitle>{error.title}</AlertTitle>
                {error.message}
            </Alert>}
            {success && <Alert severity="success">
                <AlertTitle>{success.title}</AlertTitle>
                {success.message}
            </Alert>}
            {!success && <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
                <Button onClick={postEmail} color='primary' variant="contained" sx={{ borderRadius: '50rem', m: '1%', width: { xs: '98%', md: '48%' } }}>Reset Password</Button>
                <Button onClick={props.close} color='error' variant="outlined" sx={{ borderRadius: '50rem', m: '1%', width: { xs: '98%', md: '48%' } }}>Cancel</Button>
            </Box>}
        </Paper>
    </Backdrop>
}
export default ForgotPasswordFrom;