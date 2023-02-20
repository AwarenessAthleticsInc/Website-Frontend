import styles from "./CookieBanner.module.css";
import { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Grid } from "@mui/material";
import { CenterFocusStrong } from "@mui/icons-material";
import { Button } from "@mui/material";
const CookieBanner = (props) => {
    const [cookieCheck, setCheck] = useState(false);
    const user = useSelector(state => state.user.auth);
    const cookieCheckHandler = () => {
        setCheck(true);
    }
    return !cookieCheck && !user && <div className={styles.cookieBanner}>
        <Grid container spacing={1} sx={{ alignItems: 'center', display: 'flex', p: '1rem' }}>
            <Grid item sm={4}>
                <i class='fas fa-cookie-bite fa-6x'></i>
            </Grid>
            <Grid item sm={4}>
                <span class='mt-2'>We use third party cookies to personalize content and analyze site traffic. <Link to='/cookies'>Learn more <i class='fa fa-angle-right ml-2'></i></Link></span>
            </Grid>
            <Grid item sm={4}>
                <Button fullWidth variant='outlined' color='primary' onClick={cookieCheckHandler} sx={{ borderRadius: '50rem' }}>Click To Agree</Button>
            </Grid>
        </Grid>
    </div>
}
export default CookieBanner