import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import TournamentList from "../../Components/Lists/Tournaments/AdminPanel/TournamentsList";
import GeneralSearch from "../../Components/UI/GeneralSearch";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Tooltip, IconButton, Button } from "@mui/material";
import GroupIconButtons from "../../Components/Layout/GroupIconButtons";
import Edit from '@mui/icons-material/Edit';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import TournamentCard from "../../Components/Lists/Tournaments/AdminPanel/TournamentCard";
import axios from "axios";
import { useSelector } from "react-redux";

const Tournaments = (props) => {
    const token = useSelector(state => state.user.token);
    const tournamentArray = useSelector(state => state.tournaments.tournaments);
    const Axios = axios.create({
        headers: { 'Authorization': `Bearer ${token}` }
    });
    const [tournaments, setTournaments] = useState([]);
    useEffect(() => {
      setTournaments(tournamentArray);   
    }, [tournamentArray]);
    const [selected, setSelected] = useState([]);
    const [selectedRow, setSelectedRow] = useState([]);
    const [edit, setEdit] = useState(false);
    const [newTournament, setNew] = useState(false);
    const newTournamentHandler = () => {
        setNew(!newTournament);
    }
    const editClick = () => {
        setEdit(!edit);
    }
    const showDetailsHandler = (tournament) => {
        setSelectedRow(tournament);
    }
    const handleClick = (event, array, items) => {
        setSelected(array);
        setSelectedRow(items);
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
            id: 'convener',
            numeric: false,
            disablePadding: true,
            label: 'Convener Assigned',
        },
        {
            id: 'details',
            numeric: false,
            disablePadding: true,
            label: 'Registrations',
        }
    ];

    const [manualRegistration, setManualRegistrtion] = useState(false);
    const manualRegistrationHandler = () => {
        if (!manualRegistration) {
            setManualRegistrtion(true);
            return;
        }
        setManualRegistrtion(false);
    }
    const deleteSelected = () => {
        const result = window.confirm("You're about to Delete a tournament and all registrations with their payments. Are you sure you want to proceed?");
        if (result) {
            Axios.delete("/api/dashboard/tournaments",{
                data: {
                    tournaments: selected
                }
            }).then((response) => {
                alert(response.data);
                window.location.reload();
            }).catch((error) => {
                alert(error.message);
                window.location.reload();
            });
        }
    }

    const selectionButtons = [
        {
            title: 'Delete',
            icon: <DeleteForeverIcon color='error' />,
            onClick: deleteSelected
        }
    ]
    return <Box sx={{ width: '100%', pt: '1rem' }} >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button onClick={newTournamentHandler} color='secondary' variant='outlined' startIcon={<AddCircleOutlineIcon />} sx={{ borderRadius: '50rem' }}>New Tournament</Button>
        </Box>
        <TournamentList registrations={props.registrations}
            payments={props.payments}
            title='Tournaments'
            data={tournaments}
            headers={headCells}
            align="center"
            onClick={handleClick}
            selected={selected}
            selectedRow={selectedRow}
            showDetails={showDetailsHandler}
        >
            <Box sx={{ display: 'flex', width: '100%', paddingTop: '1rem' }}>
                <GeneralSearch onSearch={handleSearch} title='Tournaments' url='/api/dashboard/tournaments' />
                {selected.length > 0 && <Box sx={{ width: 'auto', display: 'flex', marginLeft: 'auto' }}>
                    <GroupIconButtons buttons={selectionButtons} />
                    {selected.length < 2 && <Tooltip key='editRegButton_tooltip' title='Edit'>
                        <IconButton key='editRegButton_iconButton' onClick={editClick}>
                            <Edit color='secondary' />
                        </IconButton>
                    </Tooltip>}
                </Box>}
            </Box>
        </TournamentList>
        {newTournament && <TournamentCard users={props.users} onClick={() => setNew(!newTournament)} />}
        {edit && <TournamentCard users={props.users} tournament={selectedRow[0]} onClick={() => setEdit(!edit)} />}
    </Box>
}
export default Tournaments;