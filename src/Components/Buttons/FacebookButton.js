import { 
  IconButton,
  Tooltip
 } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
const FacebookButton = () => {
    return <Tooltip title='Facebook'>
      <IconButton onClick={() => {
        window.location.replace('https://www.facebook.com/SPFACanada');
      }}>
        <FacebookIcon color="action" />
      </IconButton>
    </Tooltip>
}
export default FacebookButton;