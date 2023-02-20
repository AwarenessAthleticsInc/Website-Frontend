import StaffTable from "../../Components/Lists/Staff/StaffTable";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { IconButton, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import GroupIconButtons from '../../Components/Layout/GroupIconButtons';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Edit from '@mui/icons-material/Edit';
import StaffDetailCard from "../../Components/Lists/Staff/StaffDetailCard";
import { useSelector } from "react-redux";
import axios from "axios";
const Staff = (props) => {
    const [staff, setStaff] = useState([]);
    const staffArray = useSelector(state => state.staff.staff);
    useEffect(() => {
      setStaff(staffArray);
    }, [staffArray]);
    const token = useSelector(state => state.user.token);
    const Axios = axios.create({
        headers: { 'Authorization': `Bearer ${token}` }
    });
    const [selected, setSelected] = useState([]);
    const [selectedRow, setSelectedRow] = useState([]);
    const [edit, setEdit] = useState(false);
    const [newItem, setNew] = useState(false);

    const showDetailsHandler = (toc) => {
        setSelectedRow(toc);
    }
    const handleClick = (event, array, items) => {
        setSelected(array);
        setSelectedRow(items);
    };
    const handleSearch = (array) => {
        setStaff(array);
    }
    const headCells = [
        {
            id: 'image',
            numeric: false,
            disablePadding: true,
            label: 'Image',
        },
        {
            id: 'name',
            numeric: false,
            disablePadding: true,
            label: 'Name',
        },
        {
            id: 'title',
            numeric: false,
            disablePadding: true,
            label: 'Title',
        },
        {
            id: 'email',
            numeric: false,
            disablePadding: true,
            label: 'E-mail Address',
        }
    ];
    const editSelected = () => {
        setEdit(!edit);
    }
    const deleteClick = () => {
        var result = window.confirm("You're about to DELETE a staff member, are you sure?");
        if (result) {
            Axios.delete('/api/dashboard/staff', {
                data: {
                    selected
                }
            }).then((response) => {
                alert(response.data);
                window.location.reload();
            }).catch((error) => {
                alert(error.message);
            });
        }

    }
    const selectionButtons = [
        {
            title: 'Edit',
            icon: <Edit color='secondary' />,
            onClick: editSelected
        },
        {
            title: 'Delete',
            icon: <DeleteForeverIcon color='error' />,
            onClick: deleteClick
        }
    ]

    return <Box sx={{ width: '100%', pt: '1rem' }}>
        <StaffTable
            title='Staff Members'
            data={staff}
            headers={headCells}
            align="left"
            onClick={handleClick}
            selected={selected}
            selectedRow={selectedRow}
            showDetails={showDetailsHandler}
        >
            <Box sx={{ width: '100%', display: 'flex' }}>
                <Tooltip title='Add Staff Member'>
                    <IconButton onClick={() => { setNew(!newItem) }}>
                        <AddIcon color='success' />
                    </IconButton>
                </Tooltip>
                {selected.length > 0 && <GroupIconButtons buttons={selectionButtons} />}
            </Box>
        </StaffTable>
        {edit && <StaffDetailCard close={() => {setEdit(!edit)}} staff={selectedRow[0]} />}
        {newItem && <StaffDetailCard close={() => { setNew(!newItem) }} />}
    </Box>
}
export default Staff;