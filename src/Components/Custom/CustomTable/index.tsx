import React from 'react';

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
} from '@mui/material';

import { CustomTablePropsType, CustomTableRowDataType } from './interfaces';

const CustomTable = (props: CustomTablePropsType) => {
    const { columns, rowData } = props;

    const renderTableHead = () => {
        return (
            <TableHead sx={{ backgroundColor: '#158901' }}>
                <TableRow>
                    {columns.map((column, index) => {
                        const { key, label } = column;

                        return (
                            <TableCell
                                key={`custom-table-header-cell-${key}`}
                                align="center"
                                sx={{
                                    color: 'white',
                                    borderLeft: index === 0 ? null : '1px solid white',
                                }}
                            >
                                {label}
                            </TableCell>
                        );
                    })}
                </TableRow>
            </TableHead>
        );
    };

    const renderTableRow = (row: CustomTableRowDataType) => {
        const columnKeys = columns.map((column) => column.key);

        const tableRow = columnKeys.map((columnKey) => {
            let tableRowCellContent = row[columnKey].value;

            if (typeof tableRowCellContent === 'string' && tableRowCellContent.length >= 30) {
                tableRowCellContent = (
                    <Tooltip title={tableRowCellContent} style={{ cursor: 'pointer' }}>
                        <div>{`${tableRowCellContent.substring(0, 37)}...`}</div>
                    </Tooltip>
                );
            }

            return (
                <TableCell
                    key={`custom-table-row-cell-${columnKey}`}
                    align="center"
                    sx={{ borderColor: '#158901', maxWidth: '120px' }}
                >
                    <div>{tableRowCellContent}</div>
                </TableCell>
            );
        });

        return tableRow;
    };

    return (
        <TableContainer style={{ border: '1px solid #158901', borderRadius: '3px 3px 5px 5px' }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                {renderTableHead()}
                <TableBody>
                    {rowData.map((row) => (
                        <TableRow
                            key=""
                            sx={{
                                '&:last-child td, &:last-child th': { border: 0 },
                            }}
                        >
                            {renderTableRow(row)}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default CustomTable;
