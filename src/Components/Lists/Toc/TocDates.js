import TournamentList from "../Tournaments/AdminPanel/TournamentsList";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const TocDates = (props) => {
    const tournamentArray = useSelector(state => state.tournaments.tournaments);
    const [tournaments, setTournaments] = useState([]);
    useEffect(() => {
        const filteredTournaments = tournamentArray.filter((tournament) => {
            return tournament.tournamentType === "TOC"
        });
        setTournaments(filteredTournaments);
    }, [tournamentArray]);
    const [selected, setSelected] = useState(props.selected ? props.selected : []);
    const [selectedRow, setSelectedRow] = useState(props.rows ? props.rows :[]);
    const [showDetails, setShowDetails] = useState(false);

    const showDetailsHandler = (tournament) => {
        setSelectedRow(tournament);
    }
    const handleClick = (event, array, items) => {
        setSelected(array);
        setSelectedRow(items);
        props.onSelect(array);
    };
    const handleSearch = (array) => {
        setTournaments(array);
    }
    const headCells = [
        {
            id: 'date',
            numeric: false,
            disablePadding: true,
            label: 'Date',
        },
        {
            id: 'tournament',
            numeric: false,
            disablePadding: true,
            label: 'Location',
        },
        {
            id: 'regCount',
            numeric: false,
            disablePadding: true,
            label: 'Registered',
        },
        {
            id: 'left',
            numeric: false,
            disablePadding: true,
            label: 'Spots Left',
        },
        {
            id: 'details',
            numeric: false,
            disablePadding: true,
            label: 'Details',
        }
    ];
    return <TournamentList 
        title='Select TOC dates'
        data={tournaments}
        headers={headCells}
        align="left"
        onClick={handleClick}
        selected={selected}
        selectedRow={selectedRow}
        showDetails={showDetailsHandler}
    ></TournamentList>
}
export default TocDates;