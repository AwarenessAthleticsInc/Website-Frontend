import { Avatar, Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import ProfileTournamentList from '../../Components/Lists/ProfileRegistrations/ProfileTournamentsList';
import ProfileOrderList from "../../Components/Lists/ProfileOrders/ProfileOrderList";
import { useSelector } from "react-redux";

const Profile = () => {
    const user = useSelector(state => state.user.account);
    const userRegistrations = useSelector(state => state.user.registrations);
    const userOrders = useSelector(state => state.user.orders);

    return user && <Box sx={{ m: { xs: '2rem 1rem', md: '2rem 5rem' } }}>
        <Paper elevation={3} sx={{ p: { xs: '1rem', md: '2rem' }, borderRadius: '1rem', backgroundColor: 'secondary.main' }}>
            <h4 style={{ textAlign: 'left' }}>My Profile Dashboard</h4>
            <p style={{ textAlign: 'left', fontSize: '0.8rem' }}>Welcome to your SPFA dashboard portal</p>
            <Grid container spacing={2}>
                <Grid item xs={12} md={5}>
                    <Paper elevation={3} sx={{ p: { xs: '0rem', md: '2rem 2rem' }, borderRadius: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <Avatar
                            alt={`${user.name.givenName} ${user.name.familyName}`}
                            src={user.profileImage}
                            sx={{ width: '35%', height: 'auto', aspectRatio: '1/1', margin: '1rem auto' }}
                        />
                        <Box sx={{ textAlign: 'left', display: 'flex', p: '1rem' }}>
                            <Typography variant="h6" sx={{ display: { xs: 'none', md: 'block' } }}>My Profile</Typography>
                            <Box sx={{ margin: { xs: '0 auto', md: '0 0 0 auto'}, textAlign: { xs: 'center', md: 'right'}}}>
                                <Typography variant='h6'>{`${user.name.givenName} ${user.name.familyName}`}</Typography>
                                <Typography variant='h6'>{user.username}</Typography>
                            </Box>
                        </Box>
                        <hr />
                        <Box sx={{ textAlign: 'left', display: 'flex', p: '0 1rem' }}>
                            <p style={{ margin: '0' }}>Phone Number:</p>
                            <p style={{ margin: '0 0 0 auto', marginLeft: 'auto', textAlign: 'right' }}>{user.phone}</p>
                        </Box>
                        <hr />
                        <Box sx={{ textAlign: 'left', display: 'flex', p: '0 1rem 1rem 1rem' }}>
                            <p style={{ margin: '0' }}>Next Tournament Date: </p>
                            {userRegistrations.length > 0 ? 
                                <p style={{ margin: '0 0 0 auto', marginLeft: 'auto', textAlign: 'right' }}>{new Date(userRegistrations[0].tournament.dateTime.start.date).toLocaleDateString('en-us', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p> : 
                            <p style={{ margin: '0 0 0 auto', marginLeft: 'auto', textAlign: 'right' }}>N/A</p>}
                        </Box>
                    </Paper>
                </Grid>
                <Grid sx={{ display: { xs: 'none', md: 'flex' }, flexDirection: 'column' }} item xs={7}>
                    <Paper elevation={3} sx={{ p: { xs: '0rem', md: '1rem' }, mb: '1rem', borderRadius: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <h4 style={{ textAlign: 'left' }}>My Tournaments</h4>
                        <p style={{ textAlign: 'left', fontSize: '0.8rem' }}>Your up and comming registered events</p>
                        <hr />
                        <Box sx={{maxHeight: '250px', overflowY: 'scroll'}}>
                            {!userRegistrations.length > 0 ? <p>You haven't registered for an event yet</p> :
                                <ProfileTournamentList />}
                        </Box>
                    </Paper>
                    <Paper elevation={3} sx={{ p: { xs: '0rem', md: '1rem' }, borderRadius: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <h4 style={{ textAlign: 'left' }}>My Order</h4>
                        <p style={{ textAlign: 'left', fontSize: '0.8rem' }}>Your recent product orders</p>
                        <hr />
                        <Box sx={{ maxHeight: '250px', overflowY: 'scroll' }}>
                           {!userOrders ? 
                           <p>You haven't order any products yet</p> : 
                           <ProfileOrderList />
                           }
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Paper>
    </Box>
}
export default Profile;