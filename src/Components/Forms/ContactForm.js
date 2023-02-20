import { Button, Paper } from "@mui/material";
import { useState } from "react"
import { TextField } from "@mui/material";
import ReCAPTCHA from "react-google-recaptcha";
import { createRef } from "react";
import Alert from '@mui/material/Alert';
import axios from "axios";
import logo from '../../Assets/Images/logo.webp';
const recaptchaRef = createRef();

const ContactForm = () => {
    const [recaptcha, setRecaptcha] = useState(false);
    const [error, setError] = useState(false);
    const [response, setResponse] = useState(false);
    const [contactForm, setContactForm] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const contactFormHandler = (event) => {
        const id = event.target.id;
        const value = event.target.value;

        setContactForm((prevs) => {
            return {
                name: id === 'fullName' ? value : prevs.name,
                email: id === 'email' ? value : prevs.email,
                subject: id === 'subject' ? value : prevs.subject,
                message: id === 'message' ? value : prevs.message,
            }
        })
    }
    function recaptchaCallBack(value) {
        setRecaptcha(true);
    };
    const contact = () => {
        if (contactForm.name === "" || contactForm.email === "" || contactForm.subject === "" || contactForm.message === "") {
            setRecaptcha(false);
            recaptchaRef.current.reset()
            setError(true);
            return;
        }
        axios.post('/contact-us', contactForm).then((response) => {
            setResponse({ type: 'success', message: response.data })
            recaptchaRef.current.reset()
            setError(false);
        }).catch((error) => {
            setResponse({ type: 'error', message: error.message });
        });
    }
    return <Paper sx={{ textAlign: 'center', p: '1rem' }}>
        <img height='75px' alt='Slo pitch for awanress logo' src={logo} style={{margin: '1rem auto'}} />
        <TextField id="fullName" label="Full Name" required fullWidth onChange={contactFormHandler} sx={{margin: '0.5rem 0'}} />
        <br />
        <TextField id="email" label="Email Address" required fullWidth onChange={contactFormHandler} sx={{margin: '0.5rem 0'}} />
        <br />
        <TextField id="subject" label="Subject" required fullWidth onChange={contactFormHandler} sx={{margin: '0.5rem 0'}} />
        <br />
        <TextField id="message" label="Message" required fullWidth onChange={contactFormHandler} sx={{margin: '0.5rem 0'}} />
        <br />
        <ReCAPTCHA ref={recaptchaRef} sitekey="6LcbFPgeAAAAAAEWrHNzJ-JpXhnQzGGFsP92pxkA" onChange={recaptchaCallBack} />
        {error && <Alert severity="error">Please fill in ALL parts of the contact form</Alert>}
        {response && <Alert severity={response.type === 'error' ? "error" : 'success'}>{response.message}</Alert>}
        <br />
        {!recaptcha ? <Button disabled onClick={contact} sx={{ borderRadius: '50rem', width: '100%' }} variant="outlined" color='primary'>Submit Now</Button> :
            <Button onClick={contact} sx={{ borderRadius: '50rem', width: '100%' }} variant="contained" color='primary'>Submit Now</Button>}

    </Paper>
}
export default ContactForm