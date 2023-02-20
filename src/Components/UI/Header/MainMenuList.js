import HomeIcon from '@mui/icons-material/Home';
import SportsBaseballIcon from '@mui/icons-material/SportsBaseball';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import StoreIcon from '@mui/icons-material/Store';
import RuleIcon from '@mui/icons-material/Rule';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import { Link } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import { Avatar, Button } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Box from '@mui/material/Box';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import LoginIcon from '@mui/icons-material/Login';
import { SwipeableDrawer } from "@mui/material";
import { Fragment, useState } from "react";
import KingstonLogo from '../../../Assets/Images/Kingston.png'
import PeterboroughLogo from '../../../Assets/Images/Peterborough.png'
import BellevilleLogo from '../../../Assets/Images/Belleville.png'
import BowmanvilleLogo from '../../../Assets/Images/Bowmanville.png'
import AjaxLogo from '../../../Assets/Images/Ajax.png'
import logo from '../../../Assets/Images/logo.webp';
import SportsIcon from '@mui/icons-material/Sports';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { userActions } from '../../../Store/Slices/User/userSlice';
import axios from 'axios';
const MainMenuList = (props) => {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.account);
    const auth = useSelector(state => state.user.auth);
    const token = useSelector(state => state.user.token);
    const Axios = axios.create({
        headers: { 'Authorization': `Bearer ${token}` }
    });
    const sponsors = [
        {
            name: 'Allstate Kingston',
            image: KingstonLogo,
            link: 'https://agents.allstate.ca/on/kingston/656-gardiners-rd.html'
        },
        {
            name: 'Allstate Peterborough',
            image: PeterboroughLogo,
            link: 'https://agents.allstate.ca/on/peterborough/815-high-st.html'
        },
        {
            name: 'Allstate Belleville',
            image: BellevilleLogo,
            link: 'https://agents.allstate.ca/on/belleville/365-north-front-st.html'
        },
        {
            name: 'Allstate Bowmanville',
            image: BowmanvilleLogo,
            link: 'https://agents.allstate.ca/on/bowmanville/1-hartwell-ave.html'
        },
        {
            name: 'Allstate Ajax',
            image: AjaxLogo,
            link: 'https://agents.allstate.ca/on/ajax/15-westney-rd-n.html'
        },

    ];
    // console.log(user);
    const logoStyle = {
        height: "50%",
        margin: '5% auto'
    }
    const logout = (event) => {
        event.preventDefault();
        toggleDrawer(false);
        Axios.delete('/api/user').then(() => {
            dispatch(userActions.clearAccount);
            dispatch(userActions.clearOrders);
            dispatch(userActions.clearPayments);
            dispatch(userActions.clearRegistrations);
            dispatch(userActions.clearToken);
            dispatch(userActions.logout);
            navigate("/");
        }).catch((error) => {
            alert(error.message);
        });
    }
    const [state, setState] = useState(false);
    const toggleDrawer = (open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setState({ ...state, [props.anchor]: open });
    };
    const replaceLocation = (link) => {
        toggleDrawer(false);
        navigate(link);
        
    }
    return <Fragment>
        <Button sx={props.sx} startIcon={<MenuIcon />} onClick={toggleDrawer(true)} variant="text" color='action'>{props.text}</Button>
        <SwipeableDrawer
            sx={{ zIndex: 1200 }}
            anchor={props.anchor}
            open={state[props.anchor]}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
        >
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', overflowY: 'scroll' }}>
                {!auth ? <Link sx={{ display: 'flex' }} to="/">
                    <img style={logoStyle} src={logo} alt="Slo pitch for awarness logo. It has four different colored puzzle peiece and a bat with with the text SPFA across it." />
                </Link> : <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }} >
                    <Avatar
                        alt={`${user.name.givenName} ${user.name.familyName}`}
                        src={user.profileImage}
                        sx={{ width: '50%', height: 'auto', aspectRatio: '1/1', margin: '1rem auto' }}
                    />
                    <p style={{ margin: '0' }}>{`${user.name.givenName} ${user.name.familyName}`}</p>
                    <p>{user.username}</p>
                </Box>}

                <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: 'left', p: '1rem', justifyContent: 'center'}}>
                    <Link to='/' ><Button onClick={toggleDrawer(false)} startIcon={<HomeIcon />} variant='text' color='action'>Home</Button></Link>
                    <Link to='/tournaments'><Button onClick={toggleDrawer(false)} startIcon={<SportsBaseballIcon />} variant='text' color='action'>Tournaments</Button></Link>
                    <Link to='/tournament-of-champions'><Button onClick={toggleDrawer(false)} startIcon={<EmojiEventsIcon />} variant='text' color='action'>Tournament of Champions</Button></Link>
                    <Link to='/store'><Button onClick={toggleDrawer(false)} startIcon={<StoreIcon />} variant='text' color='action'>Store</Button></Link>
                    <Link to='/about-us'><Button onClick={toggleDrawer(false)} startIcon={<InsertEmoticonIcon />} variant='text' color='action'>About Us</Button></Link>
                    <Link to='/rules-info'><Button onClick={toggleDrawer(false)} startIcon={<RuleIcon />} variant='text' color='action'>Rules & Info</Button></Link>
                    <hr />
                    {auth && user.roles === 'admin' && <Box>
                        <Button onClick={() => { replaceLocation(`/dashboard`) }} startIcon={<SportsIcon />} variant='text' color='action'>Dashboard</Button>
                    </Box>}
                    {auth && user.roles === 'Convener' &&
                    <Box>
                            <Button onClick={() => { replaceLocation(`/conveners`)}} startIcon={ <SportsIcon />} variant='text' color='action'>Convener Panel</Button>
                    </Box>}
                    {auth && user.roles === 'admin' && <Box>
                        <Button onClick={() => { replaceLocation(`/conveners`) }} startIcon={<SportsIcon />} variant='text' color='action'>Convener Panel</Button>
                    </Box>}
                    {!auth ? <Box>
                        <Link to='/login'><Button onClick={toggleDrawer(false)} startIcon={<LoginIcon />} variant='text' color='action'>Login</Button></Link>
                    </Box> : <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }} >
                            <Link to={`/account`}><Button onClick={toggleDrawer(false)} startIcon={<AccountCircleIcon />} variant='text' color='action'>Account</Button></Link>
                        <Link onClick={logout} to={`/logout`}><Button startIcon={<PowerSettingsNewIcon />} variant='text' color='action'>Logout</Button></Link>
                    </Box>}
                </Box>
            </Box>
        </SwipeableDrawer>
    </Fragment>
}
export default MainMenuList;