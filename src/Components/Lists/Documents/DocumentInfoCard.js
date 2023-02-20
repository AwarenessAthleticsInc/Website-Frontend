import { useState } from "react";
import { Paper, Box, Typography, Button, TextField, Backdrop } from "@mui/material";
import UploadImages from '../../Forms/uploadImages';
import UploadDocuments from "../../Forms/UploadDocuments";
import axios from "axios";
import { useSelector } from "react-redux";

const DocumentInfoCard = (props) => {
    const token = useSelector(state => state.user.token);
    const Axios = axios.create({
        headers: { 'Authorization': `Bearer ${token}` }
    });
    const [doc, setDoc] = useState({
        title: props.doc ? props.doc.title : '',
        previewLocations: props.doc ? props.doc.previewLocations : [],
        documentLocations: props.doc ? props.doc.documentLocations : [],
        description: props.doc ? props.doc.description : ''
    });
    const setDocHandler = (event) => {
        const id = event.target.id;
        const value = event.target.value;
        setDoc((prevs) => {
            return {
                title: id === 'title' ? value : prevs.title,
                previewLocations: prevs.previewLocations,
                documentLocations: prevs.documentLocations,
                description: id === 'description' ? value : prevs.description
            }
        })
    }
    const setImagesHandler = (array) => {
        setDoc((prevs) => {
            return {
                title: prevs.title,
                previewLocations: array,
                documentLocations: prevs.documentLocations,
                description: prevs.description
            }
        })
    }
    const setDocumentsHandler = (array) => {
        console.log(array);
        setDoc((prevs) => {
            return {
                title: prevs.title,
                previewLocations: prevs.previewLocations,
                documentLocations: array,
                description: prevs.description
            }
        })
    }
    const update = () => {
        Axios.put('/api/dashboard/info', {
            id: props.doc._id, 
            doc: doc
        }).then((response) => {
            alert(response.data);
            window.location.reload();
        }).catch((error) => {
            alert(error.message);
        });
    }
    const saveNew = () => {
        Axios.post('/api/dashboard/info', {
            doc
        }).then((response) => {
            alert(response.data);
            window.location.reload();
        }).catch((error) => {
            alert(error.message);
        });
    }

    return <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
        close={props.close}
    >
        <Paper sx={{ m: { xs: '1%', md: '10%' }, width: { xs: '98%', md: '80%' }, p: '1rem', overflowY: 'scroll', maxHeight: '95%' }}>
            <Box sx={{ display: 'flex' }}>
                <Typography variant="h4" component="h4" gutterBottom>{props.doc ? 'Update Document' : 'New Document'}</Typography>
                <Button onClick={props.close} sx={{ borderRadius: '50rem', marginLeft: 'auto', mr: '1rem', minWidth: 100 }} color='error' variant='contained'>Cancel</Button>
                <Button onClick={props.doc ? update : saveNew} sx={{ borderRadius: '50rem', minWidth: 100 }} color='secondary' variant='contained'>{props.doc ? 'Update' : 'Save'}</Button>
            </Box>
            <hr />
            <TextField
                id="title"
                label="Title"
                variant="standard"
                onChange={setDocHandler}
                sx={{ width: '98%', m: '1%' }}
                value={doc.title}
            />
            <TextField
                id="description"
                label="Description"
                multiline
                rows={6}
                value={doc.description}
                variant="standard"
                onChange={setDocHandler}
                sx={{ width: '98%', m: '1%' }}
            />
            <hr />
            {/* keyID must be different on each upload component within the same page */}
            <UploadImages key='main' keyID='main' location='documents' images={doc.previewLocations} onUpload={setImagesHandler} />
            <hr />
            {/* keyID must be different on each upload component within the same page */}
            <UploadDocuments key='docs' keyID='docs' location='documents' images={doc.documentLocations} onUpload={setDocumentsHandler} />
        </Paper>
    </Backdrop>
}
export default DocumentInfoCard;