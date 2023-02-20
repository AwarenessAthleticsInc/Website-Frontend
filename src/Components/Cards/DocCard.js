import Paper from "@mui/material/Paper";
import { Button, Typography } from "@mui/material";
import ImgNextGen from "../UI/NextGenImages";

const DocCard = (props) => {
    var array = [];
    var name = '';
    var location = '';
    if (props.doc.previewLocations.length > 0) {
        array = props.doc.previewLocations[0].split('/');
        name = array[1];
        location = array[0];
    }
    return <Paper elevation={3} sx={{ p: '1rem' }}>
        {props.doc.previewLocations.length < 1 ? <i className='far fa-file-pdf fa-5x'></i> : <ImgNextGen
            fullscreen={true}
            srcWebp={`/${array[0]}/${array[1]}/500/${array[1]}.webp`}
            srcJpeg={`/${array[0]}/${array[1]}/500/${array[1]}.jpeg`}
            fallback={`/${array[0]}/${array[1]}/500/${array[1]}.png`}
            alt={`${props.doc.title} image`}
            style={{ width: '100%' }}
        />}
        <Typography sx={{ margin: '1rem auto' }} variant='p' component='p'>{props.doc.title}</Typography>
        <p>{props.doc.description}</p>
        <form action='/download' method='post'>
            {props.doc.documentLocations.map((location) => {
                return <Button sx={{ width: '100%' }} name='file' value={location} type='submit' color='secondary' variant='outlined'>{`Download: ${location}`}</Button>
            })}
        </form>

    </Paper>
}
export default DocCard;