import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from "react-router-dom";
import { Fragment, useState } from "react";
import userIcon from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Logout from '@mui/icons-material/Logout';
import Divider from '@mui/material/Divider';
import { ListItemIcon } from '@mui/material';
import { Box } from '@mui/system';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SportsIcon from '@mui/icons-material/Sports';
import { useSelector, useDispatch } from 'react-redux';
import { userActions } from '../../Store/Slices/User/userSlice';
import axios from 'axios';
import HomeIcon from '@mui/icons-material/Home';
const LoginButton = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const userAuth = useSelector(state => state.user.auth);
    const user = useSelector(state => state.user.account);
    const token = useSelector(state => state.user.token);
    const Axios = axios.create({
        headers: { 'Authorization': `Bearer ${token}` }
    });
    const login = () => {
        navigate("/login");
    }
    const logout = () => {
        Axios.delete('/api/user').then(() => {
            dispatch(userActions.clearAccount);
            dispatch(userActions.clearOrders);
            dispatch(userActions.clearPayments);
            dispatch(userActions.clearRegistrations);
            dispatch(userActions.clearToken);
            dispatch(userActions.logout);
            window.location.replace('/');
        }).catch((error) => {
            alert(error.message);
        });
    }
    const Icon = () => {
        const [anchorEl, setAnchorEl] = useState(null);
        const open = Boolean(anchorEl);
        const handleClick = (event) => {
            setAnchorEl(event.currentTarget);
        };
        const handleClose = () => {
            setAnchorEl(null);
        };
        return userAuth ?
            <Fragment>
                <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar sx={{ width: 24, height: 24 }} alt={`${user.name.givenName} ${user.name.familyName}`} src={user.profileImage ? user.profileImage : userIcon} />
                    </IconButton>
                </Tooltip>
                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            width: "25%",
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <Box sx={{ display: 'flex', p: "2% 1rem", justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                        <Avatar
                            alt={`${user.name.givenName} ${user.name.familyName}`}
                            src={user.profileImage ? user.profileImage : userIcon}
                            sx={{ width: '75%', height: 'auto', aspectRatio: '1/1', margin: '1rem auto' }}
                        />
                        <p style={{ margin: "0.5rem 0 0 0" }}>{`${user.name.givenName} ${user.name.familyName}`}</p>
                        <p>{user.username}</p>
                    </Box>
                    <MenuItem onClick={() => { navigate('/') }}>
                        <ListItemIcon>
                            <HomeIcon color="action" fontSize="small" />
                        </ListItemIcon>
                        Home
                    </MenuItem>
                    <MenuItem onClick={() => { navigate(`/account`) }}>
                        <ListItemIcon>
                            <ManageAccountsIcon color="action" />
                        </ListItemIcon>
                        Profile
                    </MenuItem>
                    {/* data this when dashboard is complete  */}
                    {user.roles === 'admin' && <MenuItem onClick={() => {navigate('/dashboard')}}>
                        <ListItemIcon>
                            <DashboardIcon color="action" fontSize="small" />
                        </ListItemIcon>
                        Dashboard
                    </MenuItem>}
                    {user.roles === 'Convener' && <MenuItem onClick={() => {navigate('/conveners')}}>
                        <ListItemIcon>
                            <SportsIcon color="action" fontSize="small" />
                        </ListItemIcon>
                        Convener Panel
                    </MenuItem>}
                    {user.roles === 'admin' && <MenuItem onClick={() => {navigate('/conveners')}}>
                        <ListItemIcon>
                            <SportsIcon color="action" fontSize="small" />
                        </ListItemIcon>
                        Convener Panel
                    </MenuItem>}
                    <Divider style={{ width: '100%' }} color="action" />
                    <MenuItem onClick={logout}>
                        <ListItemIcon>
                            <Logout color="action" fontSize="small" />
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                </Menu>
            </Fragment>

            :
            <IconButton onClick={login} title="Login/Register">
                <AccountCircleIcon color="primary" />
            </IconButton>
    }
    return <Icon />

}
export default LoginButton;
