import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import List from '@mui/material/List';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { ListItem, Paper } from '@mui/material';
import { Grid } from '@mui/material';
import CarouselContainer from '../../Layout/Carousel';
import QtyInput from './QtyInput';
import { Box } from '@mui/system';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import Checkout from './Checkout';
import { 
    IconButton,
    Badge,
    Tooltip
} from '@mui/material';
import { useSelector } from 'react-redux';
import ImgNextGen from '../NextGenImages';

const TransitionUp = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const TransitionLeft = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

const CartDialog = (props) => {
    const cart = useSelector(state => state.cart.cart);
    const [open, setOpen] = React.useState(false);
    const [checkoutOpen, setCheckoutOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleCheckoutOpen = () => {
        // setOpen(false);
        setCheckoutOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        setCheckoutOpen(false);
    };
    const ImageBreakpoints = {
        ONE: {
            breakpoint: { max: 10000, min: 0 },
            items: 1
        }
    }

    return <React.Fragment>
        <Tooltip onClick={handleClickOpen} title="Shopping Cart">
            <IconButton aria-label={`${cart.totalQty} Shopping Cart`}>
                <Badge badgeContent={cart.totalQty} max={40} color='success'>
                    <ShoppingCartIcon color='action' />
                </Badge>
            </IconButton>
        </Tooltip>
        <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            TransitionComponent={TransitionUp}
        >
            <AppBar color='primary' sx={{ position: 'relative' }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        Shopping Cart
                    </Typography>
                    <Button endIcon={<ShoppingCartCheckoutIcon />} autoFocus color="inherit" onClick={handleCheckoutOpen}>
                        Checkout
                    </Button>
                </Toolbar>
            </AppBar>
            {cart.items && cart.items.length > 0 ?
                <List sx={{ p: { xs: '1rem', sm: '5%' } }}>
                    {cart.items.map((item) => {
                        return <ListItem>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={3}>

                                    <CarouselContainer arrows={false} breakpoints={ImageBreakpoints}>
                                        {item.image.map((image) => {
                                            const array = image.split('/');
                                            const name = array[1];
                                            const location = array[0];
                                            return <ImgNextGen
                                                srcWebp={`/${location}/${name}/300/${name}.webp`}
                                                srcJpeg={`/${location}/${name}/300/${name}.jpeg`}
                                                fallback={`/${location}/${name}/300/${name}.png`}
                                                alt={`${item.name}'s product image`}
                                                style={{ width: '96%', margin: '2%' }}
                                            />
                                             })}
                                    </CarouselContainer>
                                </Grid>
                                <Grid sx={{ textAlign: 'center' }} item md={6} xs={12}>
                                    <h5>{item.name}</h5>
                                    <p style={{ margin: '0' }}> - Size: <em>{item.size}</em></p>
                                    <p style={{ margin: '0' }}> - Color: <em>{item.color}</em></p>
                                    <br />
                                </Grid>
                                <Grid sx={{ textAlign: 'center' }} item xs={12} md={3}>
                                    <h5>{`$${Number(item.price).toFixed(2)}`}</h5>
                                    <QtyInput setCart={props.setCart} product={item} />
                                </Grid>
                            </Grid>
                        </ListItem>
                    })}
                    <ListItem sx={{ justifyContent: 'center' }}>
                        <Button color="primary" variant="contained" sx={{ borderRadius: '50rem', width: '85%' }} endIcon={<ShoppingCartCheckoutIcon />} onClick={handleCheckoutOpen}>
                            Checkout
                        </Button>
                    </ListItem>
                </List> :
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <div>
                        <RemoveShoppingCartIcon color='primary' sx={{ fontSize: 100, margin: '1rem' }} />
                        <h6>Your cart currently has not items in it</h6>
                    </div>
                </Box>
            }
        </Dialog>
        <Dialog
            fullScreen
            open={checkoutOpen}
            onClose={handleClose}
            TransitionComponent={TransitionLeft}
        >
            <AppBar color='success' sx={{ position: 'relative' }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        Checkout
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box sx={{ padding: '1rem' }}>
                <Checkout cart={cart} />
            </Box>
        </Dialog>
    </React.Fragment>

}
export default CartDialog;