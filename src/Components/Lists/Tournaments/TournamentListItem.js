import EventDate from "./EventDate";
import { useState } from "react";
import SpotsLeft from "./spotsLeft";
import RegisterButton from "./registerButton";
import Register from "./register";
import { Button, Grid } from "@mui/material";
import ImgNextGen from '../../UI/NextGenImages';
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";

const TournamenListItem = (props) => {
    const userRegistrations = useSelector(state => state.user.registrations);
    const [showImage, setShowImage] = useState(false);
    const showImageHandler = () => {
        if (showImage) {
            setShowImage(false);
            return;
        }
        setShowImage(true);
    }
    const [startReg, setStartReg] = useState(false);
    const [division, setId] = useState();
    const register = (event) => {
        if (startReg) {
            setStartReg(false);
            window.scrollBy(0, -10);
            setId();
        } else {
            setId(event.target.id);
            window.scrollBy(0, 10);
            setStartReg(true);
        }
    }
    const registrations = userRegistrations.filter((regs) => {
        return regs.tournament._id === props.tournament._id
    });
    const array = props.tournament.poster.split('/');
    const name = array[1];
    const location = array[0];

    return <Grid container spacing={1} sx={{ alignItems: 'center', mb: '1rem', width: '100%' }}>
        <Grid item md={1} sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
            <ImgNextGen
                srcWebp={`/${location}/${name}/300/${name}.webp`}
                srcJpeg={`/${location}/${name}/300/${name}.jpeg`}
                fallback={`/${location}/${name}/300/${name}.png`}
                alt={`${props.tournament.diamond}, ${props.tournament.city} poster`}
                style={{ width: '96%', margin: '2%' }}
            />
        </Grid>
        <Grid item xs={12} md={2} sx={{ textAlign: { xs: 'left', md: 'center' } }}>
            <EventDate start={props.tournament.start.date} end={props.tournament.end.date} />
        </Grid>
        <Grid item md={6} xs={9} sx={{ textAlign: { xs: 'left', md: 'center' } }}>
            <Typography variant='h6' component='h5'>{`${props.tournament.diamond}, ${props.tournament.city}`}</Typography>
            <Typography sx={{fontSize: '0.8rem'}} variant='p' component='p'>{`Deadline: ${new Date(props.tournament.EntryDeadline).toLocaleDateString('en-us', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`}</Typography>
            <SpotsLeft tournament={props.tournament} count={Number(props.tournament.spots)} />
            {props.tournament.Notes && <Typography sx={{ fontSize: '0.8rem' }}>{`Note: ${props.tournament.Notes}`}</Typography>}
        </Grid>
        <Grid item md={1} xs={3} sx={{ textAlign: { xs: 'right', md: 'center' } }}>
            <Typography variant='h6'><strong>{`$${Number(props.tournament.cost).toFixed(2)}`}</strong></Typography>
        </Grid>
        <Grid item md={2} xs={12}>
            <RegisterButton registrations={registrations} user={props.user} tournament={props.tournament} count={Number(props.tournament.spots)} onClick={register} />
        </Grid>
        <Grid item xs={12} sx={{ display: { xs: 'flex', md: 'none' }, flexDirection: 'column' }}>
            <Button onClick={showImageHandler} color='success' variant="outlined" sx={{ borderRadius: '50rem', width: '100%', display: { xs: 'flex', md: 'none' }, marginTop: '0.5rem' }}>View Poster</Button>
            {showImage && <ImgNextGen
                srcWebp={`/${location}/${name}/500/${name}.webp`}
                srcJpeg={`/${location}/${name}/500/${name}.jpeg`}
                fallback={`/${location}/${name}/500/${name}.png`}
                alt={`${props.tournament.diamond}, ${props.tournament.city} poster`}
                style={{ width: '98%', margin: '1%' }}
            />}
        </Grid>
        {startReg && <Register tournament={props.tournament} division={division} close={register} />}
    </Grid>

}
export default TournamenListItem;