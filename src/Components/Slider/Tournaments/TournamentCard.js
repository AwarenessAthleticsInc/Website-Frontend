import styles from "./TournamentCard.module.css";
import { Link } from "react-router-dom";
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import { useState } from "react";
import RegisterButton from "../../Lists/Tournaments/registerButton";
import Register from "../../Lists/Tournaments/register";
import { Box } from "@mui/system";
import ImgNextGen from "../../UI/NextGenImages";
const TournamentCard = (props) => {
    const [imageLoading, setImageLoading] = useState(true);
    const [startReg, setStartReg] = useState(false);
    const [division, setId] = useState();
    const imageLoadingHandler = () => {
        setImageLoading(false);
    }
    const register = (event) => {
        if (startReg) {
            setStartReg(false);
            setId();
        } else {
            setId(event.target.id);
            setStartReg(true);
        }
    }
    const date = new Date(props.tournament.start.date);
    const array = props.tournament.poster.split('/');
    const name = array[1];
    const location = array[0];
    return <Box className={`${styles.card} card w-100`}>
        <Link className={styles["event-poster"]} to={`/tournaments/#${props.tournament._id}`}>
        <ImgNextGen
            srcWebp={`/${location}/${name}/300/${name}.webp`}
            srcJpeg={`/${location}/${name}/300/${name}.jpeg`}
            fallback={`/${location}/${name}/300/${name}.png`}
            alt='A poster of the current tournament'
            onLoad={imageLoadingHandler}
            style={{ borderRadius: '0.5rem', width: '100%'}}
        />
        </Link>
        <Box sx={{textAlign: 'left', p: '1rem 0'}}>
            {imageLoading ?
                <Typography variant="h6"><Skeleton animation="wave" /></Typography> :
                <Typography variant="h6">{`${props.tournament.city}, ${props.tournament.diamond}`}</Typography>
            }
            {imageLoading ?
                <Typography variant="p"><Skeleton animation="wave" /></Typography> :
                <p aria-hidden="true" className={styles.price}> {`$${Number(props.tournament.cost).toFixed(2)}`}</p>
            }
            {imageLoading ?
                <Typography variant="p"><Skeleton animation="wave" /></Typography> :
                props.tournament.Notes && <p className="small m-0">{`Note: ${props.tournament.Notes}`}</p>
            }
        </Box>
        <RegisterButton tournament={props.tournament} onClick={register} />
        {startReg && <Register tournament={props.tournament} close={register} />}
    </Box>
}
export default TournamentCard;




// tournament = { tournaments }
// registrations = { registrations }
// user = { props.user }
// userRegistrations = { props.userRegistrations }