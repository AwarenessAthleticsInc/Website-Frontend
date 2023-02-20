import {
    IconButton,
    Tooltip
} from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';

const InstagramButton = () => {
    return <Tooltip title='Instagram'>
      <IconButton onClick={() => {
        window.location.replace('https://www.instagram.com/slopitchforawareness/');
      }}>
        <InstagramIcon color="action" />
      </IconButton>
    </Tooltip> 
}
export default InstagramButton;