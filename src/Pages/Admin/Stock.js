import { Box } from "@mui/system";
import { Tooltip, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import GeneralSearch from '../../Components/UI/GeneralSearch';
import GroupIconButtons from '../../Components/Layout/GroupIconButtons';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import StockTable from "../../Components/Lists/Stock/StockTable";
import axios from "axios";
import { useSelector } from "react-redux";
const Stock = (props) => {
    const token = useSelector(state => state.user.token);
    const stockArray = useSelector(state => state.stock.stock);
    const Axios = axios.create({
        headers: { 'Authorization': `Bearer ${token}` }
    });
    const [stock, setStock] = useState([]);
    useEffect(() => {
        setStock(stockArray);
    }, [stockArray]);
    const [selected, setSelected] = useState([]);
    const [selectedRow, setSelectedRow] = useState([]);
    const deleteSelected = () => {
        var results = window.confirm("you're about to delete stock but not the product. Are you sure you want to proceed?");
        if (results) {
            Axios.delete('/api/dashboard/stock', {
                data: {
                    stock: selected
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
        setStock(array);
    }
    const selectionButtons = [
        {
            title: 'Delete',
            icon: <DeleteForeverIcon color='error' />,
            onClick: deleteSelected
        }
    ]

    return <Box sx={{ width: '100%' }} >
        <StockTable title='Stock' data={stock} stock={stock} setStock={props.setStock} align="left" onClick={handleClick} selected={selected} selectedRow={selectedRow}>
            <br />
            <Box sx={{ display: 'flex', width: '100%' }}>
                <GeneralSearch onSearch={handleSearch} title='Stock' url='/dashboard/stock' />
                {selected.length > 0 && <Box sx={{ width: 'auto', display: 'flex', marginLeft: 'auto' }}>
                    <GroupIconButtons buttons={selectionButtons} />
                </Box>}
            </Box>
        </StockTable>
    </Box>
}
export default Stock;