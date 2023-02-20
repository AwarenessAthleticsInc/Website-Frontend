import { useSelector } from "react-redux";
import { Paper, Box, Typography } from "@mui/material";
import LinearProgress from '@mui/material/LinearProgress';
import styles from './loadingPage.module.css';
import softball from '../Assets/Images/loadingSoftball.png';

const LoadingPage = () => {
    const percentage = useSelector(state => state.loading.loading.percentage);
    return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Paper elevation={3} sx={{ width: { xs: '90%', md: '80%' }, m: { xs: '2% 5%', md: '10%' }, p: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
            <Typography variant="h5">Welcome to Slo-Pitch For Awareness</Typography>
            <img alt='Happy looking yellow softball with on hand in the air' src={softball} className={styles.loader} />
            <p>{percentage === 100 ? 'Play Ball!!' : `We're just loading page data.`}</p>
            <LinearProgress variant="determinate" value={percentage} />
        </Paper>
    </Box>
}
export default LoadingPage;