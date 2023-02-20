import TournamentCard from "./TournamentCard";
import Carousel from "../../Layout/Carousel";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const TournamentList = (props) => {
    const tournaments = useSelector(state => state.tournaments.tournaments);
    const registrations = useSelector(state => state.user.registrations);
    return <section id="Tournaments" className="p-2">
        <Link to="/tournaments"><h4>Tournaments <i className="far fa-hand-pointer" aria-hidden="true"></i></h4></Link>
        <Carousel>
            {tournaments.slice(0, 14).map((tournament) => {
                const registration = registrations.filter((event) => {
                    return event.tournament._id === tournament._id;
                });
                var type = tournament.tournamentType.replace(" ", "");
                if (type.includes('TOC')) {
                    return;
                }
                return <TournamentCard
                    key={tournament._id}
                    tournament={tournament}
                    registrations={registration}
                />
            })}
        </Carousel>
    </section>
}
export default TournamentList;

