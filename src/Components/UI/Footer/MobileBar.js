import { useState, forwardRef } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import SportsBaseballIcon from '@mui/icons-material/SportsBaseball';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import Slide from '@mui/material/Slide';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import ProfileTournamentList from '../../Lists/ProfileRegistrations/ProfileTournamentsList'
import ProfileOrderList from '../../Lists/ProfileOrders/ProfileOrderList';
const TransitionUp = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const MobileBar = (props) => {
    const [eventOpen, setEventOpen] = useState(false);
    const [ordersOpen, setOrdersOpen] = useState(false);

    const handleEventClose = () => {
        setEventOpen(false);
    }
    const handleOrdersClose = () => {
        setOrdersOpen(false);
    } 
    const handleOrdersOpen = () => {
        setOrdersOpen(true);
    }
    const handleEventOpen = () => {
        setEventOpen(true);
    }
    return <Paper sx={{ position: 'fixed', bottom: '0%', left: 0, right: 0, zIndex: "1200", padding: "0.6rem 0" }} elevation={3}>
        <BottomNavigation sx={{ width: '100%' }} value='show'>
            <BottomNavigationAction
                label="My Events"
                value="show"
                icon={<SportsBaseballIcon color='primary'/>}
                onClick={handleEventOpen}
            />
            <BottomNavigationAction
                label="My Orders"
                value="show"
                icon={<ShoppingBasketIcon color='primary'/>}
                onClick={handleOrdersOpen}
            />
        </BottomNavigation>
        <Dialog
            fullScreen
            open={eventOpen}
            onClose={handleEventClose}
            TransitionComponent={TransitionUp}
        >
            <AppBar color='primary' sx={{ position: 'relative' }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleEventClose}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography sx={{ mr: 2, flex: 1 }} variant="h6" component="div">
                        My Tournaments
                    </Typography>
                </Toolbar>
            </AppBar>
            <ProfileTournamentList />
        </Dialog>
        <Dialog
            fullScreen
            open={ordersOpen}
            onClose={handleOrdersClose}
            TransitionComponent={TransitionUp}
        >
            <AppBar color='primary' sx={{ position: 'relative' }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleOrdersClose}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography sx={{ mr: 2, flex: 1 }} variant="h6" component="div">
                        My Orders
                    </Typography>
                </Toolbar>
            </AppBar>
            <ProfileOrderList />
        </Dialog>
    </Paper>
}
export default MobileBar;