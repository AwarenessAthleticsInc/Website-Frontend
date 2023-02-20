import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { visuallyHidden } from '@mui/utils';
import { useSelector } from 'react-redux';
import TournamentRow from './TournamentRow';
import TournamentGridRow from './TournamentGridRow';
import { Grid } from '@mui/material';

const TournamentList = (props) => {
    const tournaments = useSelector(state => state.convener.tournaments);
    const ItemsPerRow = props.ItemsPerRow || [25, 50, 100, 150, 250]
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(ItemsPerRow[0]);

    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    function getComparator(order, orderBy) {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    // This method is created for cross-browser compatibility, if you don't
    // need to support IE11, you can use Array.prototype.sort() directly
    function stableSort(array, comparator) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) {
                return order;
            }
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = props.data.map((item) => item._id);
            props.onClick && props.onClick(event, newSelecteds);
            return;
        }
        props.onClick && props.onClick(event, []);
    };

    const handleClick = (event, id, row) => {
        const selectedIndex = props.selected.indexOf(id);
        let newSelected = [];
        let newRow = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(props.selected, id);
            newRow = newRow.concat(props.selectedRow, row);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(props.selected.slice(1));
            newRow = newRow.concat(props.selectedRow.slice(1));
        } else if (selectedIndex === props.selected.length - 1) {
            newSelected = newSelected.concat(props.selected.slice(0, -1));
            newRow = newRow.concat(props.selectedRow.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                props.selected.slice(0, selectedIndex),
                props.selected.slice(selectedIndex + 1),
            );
            newRow = newRow.concat(
                props.selectedRow.slice(0, selectedIndex),
                props.selectedRow.slice(selectedIndex + 1)
            );
        }
        props.onClick && props.onClick(event, newSelected, newRow);
    };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value));
        setPage(0);
    };

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - props.data.length) : 0;

    const TableHeader = (props) => {
        const { onSelectAllClick, order, orderBy, onRequestSort } =
            props;
        const createSortHandler = (property) => (event) => {
            onRequestSort(event, property);
        };
        const headers = [
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
                id: 'min',
                numeric: false,
                disablePadding: true,
                label: 'Minimum',
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
                id: 'cancellation',
                numeric: false,
                disablePadding: true,
                label: 'Cancellation Date',
            },
            {
                id: 'details',
                numeric: false,
                disablePadding: true,
                label: 'Details',
            },
        ]
        return (
            <TableHead sx={{ display: { xs: 'none', md: 'flex' } }}>
                <TableRow>
                    {headers.map((headCell) => (
                        <TableCell
                            key={headCell.id}
                            align={props.align || 'center'}
                            padding='normal'
                            sortDirection={orderBy === headCell.id ? order : false}
                        >
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={createSortHandler(headCell.id)}
                            >
                                {headCell.label}
                                {orderBy === headCell.id ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </Box>
                                ) : null}
                            </TableSortLabel>
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
        );
    }
    return <Box>
        <Typography variant="h4" component="h4">{props.title}</Typography>
        {props.children}
            {stableSort(tournaments, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((event, index) => {
                    const row = event._doc;
                    const labelId = `table-checkbox-${index}`;
                    const registration = event.registrations.filter((reg) => {
                        return row._id === reg.tournament._id;
                    });
                    return <TournamentGridRow key={index}
                        registrations={registration}
                        labelId={labelId}
                        row={row}
                    />
                })}
    </Box>
}
export default TournamentList;