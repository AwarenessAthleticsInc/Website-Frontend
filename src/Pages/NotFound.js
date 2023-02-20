import { Box } from "@mui/system";
import {
    Grid,
    Typography,
} from "@mui/material";
import softball from '../Assets/Images/sadSoftball.png'

const NotFound = () => {
    return <Box>
        <Grid container spacing={3}>
            <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Typography variant='h1'>Whoops! Error 404</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
                <img style={{ width: '100%' }} alt='Page not found sad looking yellow softball animation' src={softball} />
            </Grid>
            <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Typography variant='h1'>Page not found.</Typography>
            </Grid>

        </Grid>

    </Box>
}
export default NotFound;