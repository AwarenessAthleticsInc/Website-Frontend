import { Box } from "@mui/material";
import { PayPalButtons, usePayPalScriptReducer, PayPalScriptProvider } from "@paypal/react-paypal-js";
import CircularProgress from '@mui/material/CircularProgress';
const PaypalButton = (props) => {
    const initialOptions = {
        "client-id": process.env.NODE_ENV === 'development' ? 'AU5x1CmyyI8AFq7JssxT4UpmDjj1T-SNzhsGkEUs0bpDl89lD3T0YpbzOsPSApY33U-Z1QoTjIpLR7Xm' : 'Aaw7unfKIH7zTVhX42PmqrmxkVXITXeQeBTqE3yZaed4ziMwTC-IY_IdMsfug39gUTic8JqC7hjPdHmo',
        currency: "CAD",
        intent: "capture",
    };


    return <PayPalScriptProvider deferLoading={false} options={initialOptions}>
        <PaypalButtonRenderer amount={props.amount} onComplete={props.onComplete}/>
    </PayPalScriptProvider>
}

const PaypalButtonRenderer = (props) => {
    const [{ isPending, isRejected }] = usePayPalScriptReducer();

    return <Box sx={{ width: '97%', m: '0 0 0 3%' }}>
        {isPending && <CircularProgress />}
        <PayPalButtons forceReRender={[props.amount]}
            style={{
                shape: 'pill',
                color: 'blue',
                layout: 'horizontal',
                label: 'pay',
                height: 45
            }}
            createOrder={(data, actions) => {
                return actions.order.create({
                    purchase_units: [{ "amount": { "currency_code": "CAD", "value": Number(props.amount) } }]
                });
            }}
            onApprove={(data, actions) => {
                return actions.order.capture().then(function (orderData) {
                    props.onComplete(orderData);
                });
            }}
            onError={(err) => {
                console.log(err);
                alert(`There was an error while trying to make a payment. ${err}`)
            }}
        />
    </Box>
}

export default PaypalButton;

