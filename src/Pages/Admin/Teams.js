import * as React from 'react';
import {
    Box,
    Typography,
    Paper,
    Backdrop,
    Button,
    Tooltip,
    IconButton
} from '@mui/material';
import {
    DeleteForever,
    Edit
} from '@mui/icons-material';
import TeamList from '../../Components/Lists/Teams/teamList';
import GeneralSearch from '../../Components/UI/GeneralSearch';
import TeamDetailCard from '../../Components/Lists/Teams/teamDetailCard';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Teams = (props) => {
    const token = useSelector(state => state.user.token);
    const Axios = axios.create({
        headers: { 'Authorization': `Bearer ${token}` }
    });
    const [teams, setTeams] = React.useState([]);
    const teamArray = useSelector(state => state.teams.team);
    React.useEffect(() => {
        setTeams(teamArray)
    }, [teamArray]);
    const [selected, setSelected] = React.useState([]);
    const [selectedRow, setSelectedRow] = React.useState([]);
    const [edit, setEdit] = React.useState(false);
    const deleteSelected = () => {
        var results = window.confirm("you're about to delete a team. Are you sure you want to proceed?");
        if (results) {
            Axios.delete('/api/dashboard/teams', {
                data: {
                    teams: selected
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
    const handleClick = (event, array, items) => {
        setSelected(array);
        setSelectedRow(items);
    };
    const handleSearch = (array) => {
        setTeams(array);
    }
    return (
        <Box sx={{ width: '100%' }} >
            <TeamList title='Teams' data={teams} align="left" onClick={handleClick} selected={selected} selectedRow={selectedRow}>
                <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', marginRight: 'auto', alignItems: 'center' }}>
                        {selected.length === 1 && <Tooltip title='Edit Team'>
                            <IconButton onClick={() => { setEdit(!edit) }}>
                                <Edit color='secondary' />
                            </IconButton>
                        </Tooltip>}
                        {selected.length > 0 && <Tooltip title='Delete Team(s)'>
                            <IconButton onClick={deleteSelected}>
                                <DeleteForever color='error' />
                            </IconButton>
                        </Tooltip>}
                    </Box>
                    <GeneralSearch onSearch={handleSearch} title='Teams' url='/dashboard/teams' />
                </Box>
            </TeamList>
            {edit && <TeamDetailCard close={() => { setEdit(!edit) }} team={selectedRow[0]} />}
        </Box>
    );
}


export default Teams;