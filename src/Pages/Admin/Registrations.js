import { Box } from "@mui/system";
import { Tooltip, IconButton } from "@mui/material";
import RegistrationsList from "../../Components/Lists/Registrtaions/RegistrationList";
import { useEffect, useState } from "react";
import GeneralSearch from '../../Components/UI/GeneralSearch';
import GroupIconButtons from '../../Components/Layout/GroupIconButtons';
import PaymentsIcon from '@mui/icons-material/Payments';
import Edit from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PaymentForm from "../../Components/Forms/MakePaymentForm";
import RegistrationDetails from "../../Components/Lists/Registrtaions/RegistrationDetails";
import RegistrationInvoice from "../../Components/Reports/RegistrationInvoice";
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { registrationActions } from '../../Store/Slices/Registrations/registrationSlice';

const Registrations = (props) => {
    const dispatch = useDispatch();
    const [registrations, setRegistrations] = useState([]);
    let registrationArray = useSelector(state => state.registrations.registration);
    const token = useSelector(state => state.user.token);
    const Axios = axios.create({
        headers: { 'Authorization': `Bearer ${token}` }
    });
    useEffect(() => {
        setRegistrations(registrationArray);
    }, [registrationArray]);
    const [selected, setSelected] = useState([]);
    const [selectedRow, setSelectedRow] = useState([]);
    const [makePayment, setMakePayment] = useState(false);
    const [edit, setEdit] = useState(false);
    const [printRegistration, setPrintRegistration] = useState(false);

    const handleMakePayment = () => {
        setMakePayment(true);
    }
    const handleClosePaymentForm = () => {
        setMakePayment(false);
    }
    const deleteSelected = () => {
        var results = window.confirm("you're about to delete a registration. Are you sure you want to proceed?");
        if (results) {
            Axios.delete("/api/dashboard/registrations", {
                data: {
                    registrations: selected
                }
            }).then(() => {
                const selectionArray = [];
                for (const i in selected) {
                    const indexOfSelected = registrationArray.findIndex((reg) => {
                        return reg._id === selected[i];
                    });
                    selectionArray.push(indexOfSelected);
                }
                let newArray = registrationArray;
                selectionArray.map((index) => {
                    newArray = deleteArrayItem(index, newArray);
                });
                dispatch(registrationActions.populateArray(newArray));
                setSelected([]);
            }).catch((error) => {
                alert(error.message);
            });
        }
    }
    const handleClick = (event, array, items) => {
        setSelected(array);
        setSelectedRow(items);
    };
    const handleSearch = (array) => {
        setRegistrations(array);
    }
    const editClick = () => {
        setEdit(!edit);
        if(edit) {
            setSelected([]);
            setSelectedRow([]);
        }
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
            label: 'Tournament',
        },
        {
            id: 'team',
            numeric: false,
            disablePadding: true,
            label: 'Team',
        },
        {
            id: 'division',
            numeric: false,
            disablePadding: true,
            label: 'Division',
        },
        {
            id: 'balance',
            numeric: false,
            disablePadding: true,
            label: 'Balance',
        }
    ];
    const selectionButtons = [
        {
            title: 'Payment',
            icon: <PaymentsIcon color='success' />,
            onClick: handleMakePayment
        },
        {
            title: 'Delete',
            icon: <DeleteForeverIcon color='error' />,
            onClick: deleteSelected
        },
        {
            title: 'Print',
            icon: <LocalPrintshopIcon color='secondary' />,
            onClick: () => { setPrintRegistration(!printRegistration) }
        }
    ]
    return <Box sx={{ width: '100%' }} >

        <RegistrationsList title='Registrations' data={registrations} headers={headCells} align="left" onClick={handleClick} selected={selected} selectedRow={selectedRow}>
            <br />
            <Box sx={{ display: 'flex', width: '100%' }}>
                <GeneralSearch onSearch={handleSearch} title='Registrations' url='/api/dashboard/registrations' />
                {selected.length > 0 && <Box sx={{ width: 'auto', display: 'flex', marginLeft: 'auto' }}>
                    <GroupIconButtons buttons={selectionButtons} />
                    {selected.length < 2 && <Tooltip key='editRegButton_tooltip' title='Edit'>
                        <IconButton key='editRegButton_iconButton' onClick={editClick}>
                            <Edit color='secondary' />
                        </IconButton>
                    </Tooltip>}
                </Box>}
            </Box>
            {edit && <RegistrationDetails selected={selectedRow} onClick={editClick} />}
        </RegistrationsList>
        {printRegistration && <RegistrationInvoice payments={props.payments} close={() => { setPrintRegistration(!printRegistration) }} registrations={selectedRow} />}
        {makePayment && <PaymentForm selected={selected} handleClose={handleClosePaymentForm} makePayment={makePayment} />}
    </Box>
}
export default Registrations;

const deleteArrayItem = (index, arr) => {
    if (arr.length < 2) {
        return [];
    }
    arr.splice(index, 1);
    return arr;
}