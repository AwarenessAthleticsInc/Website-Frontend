import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { Grid, Paper, Typography, Tooltip, IconButton } from '@mui/material';
import { useState } from 'react';
import ImgNextGen from '../UI/NextGenImages';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ArticleIcon from '@mui/icons-material/Article';
import { DocumentViewer } from 'react-documents';
import axios from 'axios';
import { useSelector } from 'react-redux';
import $ from 'jquery';

const UploadDocuments = (props) => {
    const [images, setImage] = useState(props.images);
    const token = useSelector(state => state.user.token);
    const Axios = axios.create({
        headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
        }
    });
    const upload = async (event) => {
        event.preventDefault();
        var form = $(`.uploadForm${props.keyID}`)[0];
        var data = new FormData(form);
        const response = await Axios.post(`/api/uploadFile/${props.location}`, {
            data
        }).then((responses) => {
            return responses.data;
        }).catch(() => {
            alert('Failed to upload this image please try again');
            return false
        });
        const index = images.indexOf(response);
        if (!response) {
            return;
        }
        if (index === -1) {
            setImage([...images, response]);
            props.onUpload([...images, response]);
        }
        return;
    }

    const select = () => {
        $(`.fileInput${props.keyID}`).click();
    }
    const deleteImage = (image) => {
        const index = images.indexOf(image);
        if (index > -1) {
            const array = images;
            array.splice(index, 1);
            setImage([...array]);
            props.onUpload([...array]);
        }
    }

    return <Grid container sx={{ display: 'flex', alignItems: 'center' }}>
        <Grid item xs={12} sm={5} md={4} xl={3}>
            <Paper elevation={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <form className={`uploadForm${props.keyID}`} action="poster" method="post" enctype="multipart/form-data">
                    <input onChange={() => { $(`.upload-image${props.keyID}`).click(); }} className={`fileInput${props.keyID}`} style={{ display: 'none' }} type="file" id="myfile" name="filetoupload" />
                    <input onClick={upload} className={`upload-image${props.keyID}`} style={{ display: 'none' }} type="submit" value="Upload Now" />
                </form>
                <Tooltip title='upload'>
                    <IconButton onClick={select}>
                        <DriveFolderUploadIcon sx={{ fontSize: 200 }} color='primary' />
                    </IconButton>
                </Tooltip>
                <Typography variant="h6" component="h6" gutterBottom>Upload Document...</Typography>
            </Paper>
        </Grid>
        <Grid item xs={12} sm={7} md={8} xl={9}>
            <Grid container sx={{ width: '100%', maxHeight: { xs: 550, sm: 450 }, p: '1rem', overflowY: 'scroll' }}>
                {images.map((image, index) => {
                    const array = image.split('/');
                    const name = array[1];
                    return <Grid item xs={12} md={6} xl={3}>
                        <ImageListItem sx={{ width: '100%' }} key={index}>
                        {/* document view goes here */}
                            <DocumentViewer
                                url={`${image}`} 
                                viewer="url"
                                style={{width: '100%', height: '350px'}}
                            >
                            </DocumentViewer>
                            <ImageListItemBar
                                sx={{ borderRadius: '0.25rem' }}
                                title={`${name}`}
                                subtitle={`Image #${index + 1}`}
                                actionIcon={
                                    <Tooltip title='Delete'>
                                        <IconButton
                                            onClick={() => { deleteImage(image) }}
                                            sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                            aria-label={`delete ${name} image`}
                                        >
                                            <DeleteForeverIcon />
                                        </IconButton>
                                    </Tooltip>
                                }
                            />
                        </ImageListItem>
                    </Grid>
                })}
            </Grid>
        </Grid>
    </Grid>
}
export default UploadDocuments;