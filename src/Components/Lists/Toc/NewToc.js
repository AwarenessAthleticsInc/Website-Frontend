import Backdrop from '@mui/material/Backdrop';
import { Button, IconButton, Paper, Typography } from '@mui/material';
import { useState } from 'react';
import UploadImages from '../../Forms/uploadImages';
import TocDates from './TocDates';
import NewTocSections from './TocSections';
import { Box } from '@mui/system';
import axios from 'axios';
import { useSelector } from 'react-redux';

const NewToc = (props) => {
    const token = useSelector(state => state.user.token);
    const Axios = axios.create({
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    const [images, setImages] = useState(props.toc ? [props.toc[0].poster] : []); //used to hold the value of all uploaded images
    const newImageHandler = (array) => {
        setImages(array);
    }
    const [dates, setDates] = useState([]);
    const dateSelectionHandler = (item) => {
        setDates([...item]);
    }
    const selectedArray = [];
    if (props.toc) {
        props.toc[0].dates.map((tournamemt) => {
            selectedArray.push(tournamemt._id);
        });
        
    }
    const [sections, setSections] = useState(props.toc ? props.toc[0].sections : []);
    const saveSectionHandler = (details, index) => {
        if (index === false) {
            setSections([...sections, details]);
            return;
        }
        const array = sections;
        array.splice(index, 1);
        setSections([...array, details]);
    }
    const deleteSectionHandler = (index) => {
        const array = sections;
        array.splice(index, 1);
        setSections([...array]);
    }
    const saveToc = () => {
        Axios.post('/api/dashboard/toc', {
            poster: images[0],
            dates: dates,
            sections: sections
        }).then((response) => {
            alert(response.data);
            window.location.reload();
        }).catch((error) => {
            alert(error.message);
        });
    }
    const updateToc = () => {
        Axios.put('/api/dashboard/toc', {
            id: props.toc._id,
            data : {
                poster: images[0],
                dates: dates,
                sections: sections
            }
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
    // onClick={props.onClick}
    >
        <Paper sx={{ m: { xs: '1%', md: '10%' }, width: { xs: '98%', md: '80%' }, p: '1rem', overflowY: 'scroll', maxHeight: '95%' }}>
            <Box sx={{ display: 'flex' }}>
                <Typography variant="h4" component="h4" gutterBottom>New Tournament of Champians</Typography>
                <Button onClick={props.onClick} sx={{ borderRadius: '50rem', marginLeft: 'auto', mr: '1rem', minWidth: 100 }} color='error' variant='contained'>Cancel</Button>
                <Button onClick={props.toc ? updateToc : saveToc} sx={{ borderRadius: '50rem', minWidth: 100 }} color='secondary' variant='contained'>{props.toc ? 'Update' : 'Save'}</Button>
            </Box>  
            <hr />
            <UploadImages key='main' keyID='main' development={props.development} location='toc' images={images} onUpload={newImageHandler} />
            <TocDates selected={selectedArray} rows={props.toc ? props.toc[0].dates : false} tournaments={props.tournaments} registrations={props.registrations} onSelect={dateSelectionHandler} />
            <NewTocSections key={-1} development={props.development} onSave={saveSectionHandler} />
            {sections.map((section, index) => {
                return <NewTocSections key={index} index={index} development={props.development} onSave={saveSectionHandler} onDelete={deleteSectionHandler} section={section} />
            })}

        </Paper>
    </Backdrop>
}
export default NewToc;