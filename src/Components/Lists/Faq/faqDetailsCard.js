import { Paper, Box, Button, Typography, TextField, Backdrop } from "@mui/material"
import { useState } from "react"
import { useSelector } from "react-redux";
import axios from "axios";

const FaqDetailsCard = (props) => {
    const token = useSelector(state => state.user.token);
    const Axios = axios.create({
        headers: { 'Authorization': `Bearer ${token}` }
    });
    const [faq, setFaq] = useState({
        question: props.faq ? props.faq.question : '',
        answer: props.faq ? props.faq.answer : '',
    });
    const setFaqHandler = (event) => {
        const id = event.target.id;
        const value = event.target.value;
        setFaq((prevs) => {
            return {
                question: id === 'question' ? value : prevs.question,
                answer: id === 'answer' ? value : prevs.answer
            }
        });
    }
    const update = () => {
        Axios.put('/api/dashboard/faq', {
            id: props.faq._id, 
            faq: faq
        }).then((response) => {
            alert(response.message);
            window.location.reload();
        }).catch((error) => {
            alert(error.message);
        });
    }
    const saveNew = () => {
        Axios.post('/api/dashboard/faq', {
            faq
        }).then((response) => {
            alert(response.message);
            window.location.reload();
        }).catch((error) => {
            alert(error.message);
        });
    }

    return <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
    >
        <Paper sx={{ m: { xs: '1%', md: '10%' }, width: { xs: '98%', md: '80%' }, p: '1rem', overflowY: 'scroll', maxHeight: '95%' }}>
            <Box sx={{ display: 'flex' }}>
                <Typography variant="h4" component="h4" gutterBottom>{props.faq ? 'Update FAQ' : 'New FAQ'}</Typography>
                <Button onClick={props.close} sx={{ borderRadius: '50rem', marginLeft: 'auto', mr: '1rem', minWidth: 100 }} color='error' variant='contained'>Cancel</Button>
                <Button onClick={props.faq ? update : saveNew} sx={{ borderRadius: '50rem', minWidth: 100 }} color='secondary' variant='contained'>{props.faq ? 'Update' : 'Save'}</Button>
            </Box>
            <hr />
            <TextField
                sx={{ width: '98%', m: '1%' }}
                id="question"
                label="Question"
                multiline
                rows={4}
                variant="standard"
                value={faq.question}
                onChange={setFaqHandler}
            />
            <TextField
                sx={{ width: '98%', m: '1%' }}
                id="answer"
                label="Answer"
                multiline
                rows={4}
                variant="standard"
                value={faq.answer}
                onChange={setFaqHandler}
            />
        </Paper>
    </Backdrop>
}
export default FaqDetailsCard