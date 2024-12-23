import React, { useState } from 'react';

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
} from '@mui/material';
import {
    ImportExport as ImportExportIcon,
    ArrowDownward as DownArrowIcon,
    ArrowUpward as upArrowIcon,
} from '@mui/icons-material';

import {
    CustomTablePropsType,
    CustomTableRowDataType,
    CustomTableColumnSortDataType,
} from './interfaces';
import styles from './styles.module.css';

const CustomTable = (props: CustomTablePropsType) => {
    const { columns, rowData } = props;

    const [sortData, setSortData] = useState<CustomTableColumnSortDataType>();

    const onSortIconClick = (columnKey: string) => {
        if (sortData?.columnKey === columnKey) {
            setSortData((prevSortData) => ({
                columnKey,
                sortType: prevSortData?.sortType === 'ASC' ? 'DES' : 'ASC',
            }));

            return;
        }

        setSortData({
            columnKey,
            sortType: 'ASC',
        });
    };

    const getTitleSortIcon = (columnKey: string) => {
        if (columnKey === sortData?.columnKey) {
            return sortData.sortType === 'ASC' ? DownArrowIcon : upArrowIcon;
        }

        return ImportExportIcon;
    };

    const renderTableHead = () => {
        return (
            <TableHead sx={{ backgroundColor: '#158901' }}>
                <TableRow>
                    {columns.map((column, index) => {
                        const { key, label, sortable } = column;
                        const SortIcon = getTitleSortIcon(key);

                        return (
                            <TableCell
                                key={`custom-table-header-cell-${key}`}
                                align="center"
                                sx={{
                                    color: 'white',
                                    borderLeft: index === 0 ? null : '1px solid white',
                                }}
                            >
                                <div className="center">
                                    {label}
                                    {sortable && (
                                        <SortIcon
                                            className={styles.titleIcon}
                                            onClick={() => onSortIconClick(key)}
                                        />
                                    )}
                                </div>
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
