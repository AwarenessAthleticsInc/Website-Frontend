import * as React from 'react';
import {
    Box,
    Collapse,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Paper,
    Button,
    Grid
} from '@mui/material';
import BalanceCell from './BalanceCell';
import {
    KeyboardArrowDown,
    KeyboardArrowUp
} from '@mui/icons-material';
import PaypalButton from '../../Buttons/paypalButton';
import { useSelector, useDispatch } from 'react-redux';
import { userActions } from '../../../Store/Slices/User/userSlice';
import { useState } from 'react';
import axios from 'axios';
 

const ProfileOrderList = () => {
    const dispatch = useDispatch();
    const order = useSelector(state => state.user.orders);
    const userPayments = useSelector(state => state.user.payments);
    const token = useSelector(state => state.user.token);
    const Axios = axios.create({
        headers: { 'Authorization': `Bearer ${token}` }
    });
    const [errorMessage, setErrorMessage] = useState({
        code: 0,
        message: ''
    });
    const Row = (props) => {
        const { row } = props;
        const [open, setOpen] = React.useState(false);
        const [balance, setBalance] = React.useState(0);
        const payments = userPayments.filter((payment) => {
            return String(row._id) === String(payment.Invoice);
        });
        const payment = (paymentData, id) => {
            Axios.post('/api/payments', {
                ids: [id],
                paymentData: paymentData,
                type: 'paypal'
            }).then((res) => {
                //when new payment is returned populate the payments list again
                dispatch(userActions.setPayments([...payment, res.data]));
            }).catch((error) => {
                setErrorMessage({
                    code: error.code,
                    message: error.message
                });
            });
        }
        return order.length < 1 ? <p>You haven't place any orders yet</p> : <Grid key={row._id} sx={{ width: '100%', alignItems: 'center', p: '1rem' }} container spacing={2}>
            <Grid item xs={2} md={3}>
                <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => setOpen(!open)}
                >
                    {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                </IconButton>
            </Grid>
            <Grid sx={{ textAlign: { xs: 'left', md: 'center' } }} item xs={10}>
                <Typography variant='p'>{`Date: ${new Date(row.date).toLocaleDateString('en-us') }`}</Typography>
            </Grid>
            <Grid item xs={2} md={3}></Grid>
            <Grid sx={{ textAlign: { xs: 'left', md: 'center' } }} item xs={10}>
                <Typography variant='p'>{`Order Total: $${Number(row.OrderTotal).toFixed(2)}`}</Typography>
            </Grid>
            <Grid item xs={2} md={3}></Grid>
            <Grid item xs={10}>
                <BalanceCell tournament={row} payments={payments} setBalance={(balance) => { setBalance(balance); }} />
            </Grid>
            <Grid item sx={{ justifyContent: 'center' }} xs={12}>
                {balance > 0 && <PaypalButton key={row._id} amount={balance} onComplete={(payment) => { payment(payment, row._id) }} />}
            </Grid>
            <Grid item xs={12}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box sx={{ margin: 1 }}>
                        <Typography variant="h6" gutterBottom component="div">
                            Order Details
                        </Typography>
                        {row.order.items.map((item, index) => {
                            return <Table key={`team-${index}`} size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Qty</TableCell>
                                        <TableCell align="left">Item</TableCell>
                                        <TableCell align="left">Size</TableCell>
                                        <TableCell align="left">Color</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow key={`${item.name}`}>
                                        <TableCell component="th" scope="row">
                                            {item.qty}
                                        </TableCell>
                                        <TableCell align="left">{item.name}</TableCell>
                                        <TableCell align="left">{item.size}</TableCell>
                                        <TableCell align="left">{item.color}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>

                        })}
                    </Box>
                </Collapse>
            </Grid>
        </Grid>
    }

    return <Paper>
        {order.map((row) => (
            <Row key={row._id} row={row} />
        ))}
    </Paper>
}
export default ProfileOrderList;