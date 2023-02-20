import {
    Box
} from "@mui/system";
import {
    Typography,
    Grid,
    Paper
} from "@mui/material";
import { useSelector } from "react-redux/es/exports";
import TournamentList from '../../Components/Lists/Tournaments/ConvenerPanel/TournamentsList';

const Overview = () => {
    const user = useSelector(state => state.user.account);
    const auth = useSelector(state => state.user.auth);
    const tournaments = useSelector(state => state.convener.tournaments);
    return <Box sx={{ width: '100%', p: { xs: '1%,', md: '1rem' }}}>
        <Typography sx={{mb: '1rem'}} variant="h4" gutterBottom>{auth ? `Welcome, ${user.name.givenName} here is your SPFA overview` : `Welcome, heres your SPFA overview`}</Typography>
        <Grid container spacing={2} sx={{ mb: '1rem' }}>
            <Grid item xs={12} md={6}>
                <Paper sx={{ p: '0.8rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 'auto', aspectRatio: '8/3' }}>
                    <Typography variant="h1" gutterBottom>{tournaments.length}</Typography>
                    <Typography variant="h6" gutterBottom>{`Tournament count`}</Typography>
                </Paper>
            </Grid>
        </Grid>
        <TournamentList />
    </Box>
}
export default Overview;