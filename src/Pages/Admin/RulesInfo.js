import DocumentTable from "../../Components/Lists/Documents/DocumentTable";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { IconButton, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import GroupIconButtons from '../../Components/Layout/GroupIconButtons';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Edit from '@mui/icons-material/Edit';
import DocumentInfoCard from "../../Components/Lists/Documents/DocumentInfoCard";
import { useSelector } from "react-redux";
import axios from "axios";
const RulesInfo = (props) => {
    const [docs, setDocs] = useState([]);
    const documents = useSelector(state => state.documents.documents);
    useEffect(() => {
        setDocs(documents);
    }, [documents]);
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
        setDocs(array);
    }
    const headCells = [
        {
            id: 'title',
            numeric: false,
            disablePadding: true,
            label: 'Title',
        },
        {
            id: 'imageLocation',
            numeric: false,
            disablePadding: true,
            label: 'Image Location',
        },
        {
            id: 'docCount',
            numeric: true,
            disablePadding: true,
            label: 'Document Count',
        },
        {
            id: 'description',
            numeric: false,
            disablePadding: true,
            label: 'Description',
        }
    ];
    const editSelected = () => {
        setEdit(!edit);
    }
    const deleteClick = () => {
        var result = window.confirm("You're about to DELETE a document, are you sure?");
        if (result) {
            Axios.delete('/api/dashboard/info', {
                selected
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
        <DocumentTable
            title='Documents & Info'
            data={docs}
            headers={headCells}
            align="left"
            onClick={handleClick}
            selected={selected}
            selectedRow={selectedRow}
            showDetails={showDetailsHandler}
        >
            <Box sx={{ width: '100%', display: 'flex' }}>
                <Tooltip title='New Document'>
                    <IconButton onClick={() => { setNew(!newItem) }}>
                        <AddIcon color='success' />
                    </IconButton>
                </Tooltip>
                {selected.length > 0 && <GroupIconButtons buttons={selectionButtons} />}
            </Box>
        </DocumentTable>
        {edit && <DocumentInfoCard close={() => { setEdit(!edit) }} doc={selectedRow[0]} />}
        {newItem && <DocumentInfoCard close={() => { setNew(!newItem) }} />}
    </Box>
}
export default RulesInfo;