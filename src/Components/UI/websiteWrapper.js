import { Fragment } from 'react';
import Footer from './Footer/Footer';
import Appbar from './Header/AppBar';
import { Box } from '@mui/system';
import SpeedDialContact from './Footer/SpeedDialContact';
import CookieBanner from '../../Pages/Legal/CookieBanner';
const WebsiteWrapper = (props) => {
    return <Fragment>
        {/* header  */}
        <Appbar />
        <Box sx={{mb: {xs: 0, md: '14rem'}}} />
        {props.children}
        <SpeedDialContact />
        <Footer />
        <CookieBanner />
    </Fragment>
}
export default WebsiteWrapper;