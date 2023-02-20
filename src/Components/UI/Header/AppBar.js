import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import LoginButton from '../../Buttons/LoginButton';
import { Paper, Tooltip, Button } from '@mui/material';
import SportsBaseballIcon from '@mui/icons-material/SportsBaseball';
import MobileMenu from './MainMenuList';
import AppBarSearch from './AppbarSearch';
import CartDialog from '../Cart/CartDialog';
import { ButtonGroup } from '@mui/material';
import StoreIcon from '@mui/icons-material/Store';
import HomeIcon from '@mui/icons-material/Home';
import { useLocation, useNavigate } from "react-router-dom";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import InfoIcon from '@mui/icons-material/Info';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import GradiantBackground from '../../Layout/GradiantBackground';
import logo from '../../../Assets/Images/logo.webp';

export default function PrimarySearchAppBar(props) {
    let location = useLocation();
    let navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const [searchType, setSearchType] = React.useState('tournaments')
    const mobileMenuId = 'primary-search-account-menu-mobile';
    return (
        <Paper elevation={3} sx={{ flexGrow: 1, borderRadius: '0', position: { xs: 'static', md: 'fixed' }, top: 0, left: 0, right: 0, zIndex: 1100 }}>
            <GradiantBackground>
                <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', p: '0 1rem' }}>
                    <Box sx={{ marginRight: 'auto' }}>
                        <MobileMenu />
                    </Box>
                    <img style={{ margin: '1rem' }} height='65px' alt='Slo pitch for awanress logo' src={logo} />
                    <Box sx={{ marginLeft: 'auto', display: { xs: 'flex', md: 'none' } }}>
                        <CartDialog />
                    </Box>
                </Box>
                <Box sx={{ display: { xs: 'flex', md: 'flex' }, p: { xs: '0.5rem', md: '0.8rem 5rem' } }}>
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <img style={{ margin: '1rem' }} height='65px' alt='Slo pitch for awanress logo' src={logo} />
                    </Box>

                    <Paper elevation={3} sx={{ display: 'flex', margin: 'auto', borderRadius: '25rem', p: '0.25rem 0' }}>
                        <ButtonGroup variant="text" aria-label="tournament and store select search button group">
                            <IconButton onClick={() => { setSearchType('tournaments') }}>
                                <Tooltip title='Search Tournaments'>
                                    <SportsBaseballIcon color={searchType === 'tournaments' ? 'secondary' : 'inherit'} />
                                </Tooltip>
                            </IconButton>
                            <IconButton onClick={() => { setSearchType('store') }}>
                                <Tooltip title='Search Store'>
                                    <StoreIcon color={searchType === 'store' ? 'secondary' : 'inherit'} />
                                </Tooltip>
                            </IconButton>
                        </ButtonGroup>
                        <AppBarSearch registrations={props.registrations} searchType={searchType} />
                    </Paper>
                    <Paper elevation={3} sx={{ display: { xs: 'none', md: 'flex' }, borderRadius: '25rem', p: '0.25rem 1rem', margin: 'auto', marginRight: '0', marginLeft: '0' }}>
                        <CartDialog />
                        <LoginButton />
                    </Paper>

                </Box>
            </GradiantBackground>
            <Box sx={{ margin: { xs: '1%', md: 'auto 25%' }, display: { xs: 'none', md: 'flex' }, justifyContent: 'center', p: { xs: '0.5rem', md: '0.8rem' } }}>
                <Box sx={{ diaply: 'flex', flexDirection: 'column', justifyContent: 'center', margin: 'auto 0.25rem' }}>
                    <Tooltip title='Home'>
                        <Button onClick={() => { navigate('/') }} color={location.pathname === '/' ? 'primary' : 'action'} sx={{ p: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <HomeIcon />
                            <p style={{ margin: '0', fontSize: '0.8rem', fontWeight: 'normal' }}>Home</p>
                        </Button>
                    </Tooltip>
                </Box>
                <Box sx={{ diaply: 'inline', margin: 'auto 0.25rem' }}>
                    <Tooltip title='Tournaments'>
                        <Button onClick={() => { navigate('/tournaments') }} color={location.pathname === '/tournaments' ? 'primary' : 'action'} sx={{ p: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <SportsBaseballIcon />
                            <p style={{ margin: '0', fontSize: '0.8rem', fontWeight: 'normal' }}>Tournaments</p>
                        </Button>
                    </Tooltip>
                </Box>
                <Box sx={{ diaply: 'inline', margin: 'auto 0.25rem' }}>
                    <Tooltip title='Store'>
                        <Button onClick={() => { navigate('/store') }} color={location.pathname === '/store' ? 'primary' : 'action'} sx={{ p: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <StoreIcon />
                            <p style={{ margin: '0', fontSize: '0.8rem', fontWeight: 'normal' }}>Store</p>
                        </Button>
                    </Tooltip>
                </Box>
                <Box sx={{ diaply: 'inline', margin: 'auto 0.25rem' }}>
                    <Tooltip title='Tournament Of Champions'>
                        <Button onClick={() => { navigate('/tournament-of-champions') }} color={location.pathname === '/tournament-of-champions' ? 'primary' : 'action'} sx={{ p: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <EmojiEventsIcon />
                            <p style={{ margin: '0', fontSize: '0.8rem', fontWeight: 'normal' }}>TOC</p>
                        </Button>
                    </Tooltip>
                </Box>
                <Box sx={{ diaply: 'inline', margin: 'auto 0.25rem' }}>
                    <Tooltip title='About Us'>
                        <Button onClick={() => { navigate('/about-us') }} color={location.pathname === '/about-us' ? 'primary' : 'action'} sx={{ p: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <InfoIcon />
                            <p style={{ margin: '0', fontSize: '0.8rem', fontWeight: 'normal' }}>About Us</p>
                        </Button>
                    </Tooltip>
                </Box>
                <Box sx={{ diaply: 'inline', margin: 'auto 0.25rem' }}>
                    <Tooltip title='Rules & Info'>
                        <Button onClick={() => { navigate('/rules-info') }} color={location.pathname === '/rules-info' ? 'primary' : 'action'} sx={{ p: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <LibraryBooksIcon />
                            <p style={{ margin: '0', fontSize: '0.8rem', fontWeight: 'normal' }}>Rules</p>
                        </Button>
                    </Tooltip>
                </Box>
            </Box>
        </Paper>
    );
}
