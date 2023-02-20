import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import GroupIconButtons from '../../Components/Layout/GroupIconButtons';
import Edit from '@mui/icons-material/Edit';
import CheckTableList from '../../Components/Lists/Faq/CheckTableList';
import FaqDetailsCard from '../../Components/Lists/Faq/faqDetailsCard';
import { IconButton, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useSelector } from 'react-redux';
import axios from 'axios';
const Faq = (props) => {
    const [faq, setFaq] = useState([]);
    const faqArray = useSelector(state => state.faq.Faqs);
    useEffect(() => {
        setFaq(faqArray);
    }, [faqArray])
    const [edit, setEdit] = useState(false);
    const [newItem, setNew] = useState(false);
    const [selectedRow, setSelectedRow] = useState([]);
    const token = useSelector(state => state.user.token);
    const Axios = axios.create({
        headers: { 'Authorization': `Bearer ${token}` }
    });
    const handleSearch = (array) => {
        setFaq(array);
    }
    const headCells = [
        {
            id: 'question',
            numeric: false,
            disablePadding: true,
            label: 'Question',
        },
        {
            id: 'answer',
            numeric: false,
            disablePadding: false,
            label: 'Answer',
        },
    ];
    const editSelected = () => {
        setEdit(!edit);
    }
    const deleteSelected = () => {
        const result = window.confirm('Are you sure you want to delete this FAQ');
        if (!result) {
            return;
        }
        Axios.delete('/api/dashboard/faq', {
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
    const selectionButtons = [
        {
            title: 'Edit',
            icon: <Edit color='secondary' />,
            onClick: editSelected
        },
        {
            title: 'Delete',
            icon: <DeleteForeverIcon color='error' />,
            onClick: deleteSelected
        }
    ]
    const [selected, setSelected] = useState([]);

    const handleClick = (event, array, items) => {
        setSelected(array);
        setSelectedRow(items);
    };

    return <Box sx={{ width: '100%', pt: '1rem' }}>
        <CheckTableList title='FAQs' data={faq} headers={headCells} align="left" onClick={handleClick} selected={selected} selectedRow={selectedRow}>
            {/* <GeneralSearch onSearch={handleSearch} title='FAQs' url='/dashboard/faq' /> */}
            <Box sx={{ width: '100%', display: 'flex' }}>
                <Tooltip title='New Faq'>
                    <IconButton onClick={() => { setNew(!newItem) }}>
                        <AddIcon color='success' />
                    </IconButton>
                </Tooltip>
                {selected.length > 0 && <GroupIconButtons buttons={selectionButtons} />}
            </Box>
        </CheckTableList>
        {edit && <FaqDetailsCard faq={selectedRow[0]} close={() => { setEdit(!edit); }} />}
        {newItem && <FaqDetailsCard close={() => { setNew(!newItem) }} />}
    </Box>
}
export default Faq;