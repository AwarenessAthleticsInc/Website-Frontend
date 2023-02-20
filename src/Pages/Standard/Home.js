import TournamentSlider from "../../Components/Slider/Tournaments/TournamentList";
import StoreSlider from "../../Components/Lists/Store/Products/StoreSlider";
import { Box } from "@mui/material";

const Home = (props) => {
    return <Box sx={{ p: { md: '1rem 5rem' }, textAlign: 'left' }}>
            <TournamentSlider />
            <hr />
            <StoreSlider />
        </Box>
}
export default Home;
