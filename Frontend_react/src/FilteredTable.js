import { useState } from 'react';
import './App.css';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';

export default function FilteredTable(props) {
    const [page, setPage] = useState(0);
    const rowsPerPage = 5;
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    return (
        <div className='table'>
            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Tweet</TableCell>
                            <TableCell align="right">Topic</TableCell>
                            <TableCell align="right">Sentiment</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.filteredCorpus.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) =>
                            <TableRow key={index}>
                                <TableCell component="th" scope="row">
                                    {row.tweet_text}
                                </TableCell>
                                <TableCell align="right">{row.topic}</TableCell>
                                <TableCell align="right">{row.sentiment}</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                component="div"
                count={props.filteredCorpus.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
            />
        </div>
    );
}
