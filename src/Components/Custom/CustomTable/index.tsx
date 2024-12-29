import React, { useState } from 'react';

import {
    Stack,
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
    Cached as RefreshIcon,
} from '@mui/icons-material';

import CustomPagination from '../CustomPagination';

import {
    CustomTablePropsType,
    CustomTableRowDataType,
    CustomTableColumnSortDataType,
} from './interfaces';
import styles from './styles.module.css';
import { TABLE_ROW_COUNT_OPTIONS } from './constants';

const CustomTable = (props: CustomTablePropsType) => {
    const { columns, rowData, totalRowCount, loadTableData = () => {}, showRefreshButton } = props;

    const [page, setPage] = useState(1);
    const [sortData, setSortData] = useState<CustomTableColumnSortDataType>();
    const [tableRowCount, setTableRowCount] = useState(TABLE_ROW_COUNT_OPTIONS[0]);

    const onSortIconClick = (columnKey: string) => {
        const sortType =
            sortData?.columnKey === columnKey
                ? sortData?.sortType === 'ASC'
                    ? 'DES'
                    : 'ASC'
                : 'ASC';

        setSortData({
            columnKey,
            sortType,
        });
    };

    const getTitleSortIcon = (columnKey: string) => {
        if (columnKey === sortData?.columnKey) {
            return sortData.sortType === 'ASC' ? DownArrowIcon : upArrowIcon;
        }

        return ImportExportIcon;
    };

    const loadData = async () => {
        await loadTableData();
    };

    const renderRefreshButton = () => {
        return (
            <Stack className={styles.refreshButtonContainer} alignItems="flex-end">
                <Tooltip title="Refresh">
                    <RefreshIcon className={`icon ${styles.refreshIcon}`} onClick={loadData} />
                </Tooltip>
            </Stack>
        );
    };

    const renderTableHead = () => {
        return (
            <TableHead className="bg-color-green">
                <TableRow>
                    {columns.map((column, index) => {
                        const { key, label, sortable } = column;
                        const SortIcon = getTitleSortIcon(key);

                        return (
                            <TableCell
                                key={`custom-table-header-cell-${key}`}
                                align="center"
                                className={styles.tableheaderCell}
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
                    <Tooltip title={tableRowCellContent} className={styles.tableRowCellContent}>
                        <div>{tableRowCellContent}</div>
                    </Tooltip>
                );
            }

            return (
                <TableCell
                    key={`custom-table-row-cell-${columnKey}`}
                    align="center"
                    className={styles.tableRowCell}
                >
                    <div>{tableRowCellContent}</div>
                </TableCell>
            );
        });

        return tableRow;
    };

    return (
        <div>
            {showRefreshButton && renderRefreshButton()}
            <TableContainer className={styles.tableContainer}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    {renderTableHead()}
                    <TableBody>
                        {rowData.map((row, index) => (
                            <TableRow
                                key={`custom-table-row-${index}`}
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
            <CustomPagination
                page={page}
                setPage={setPage}
                itemsPerPage={{
                    itemsPerPageCount: TABLE_ROW_COUNT_OPTIONS,
                    selectedItemsPerPage: tableRowCount,
                    setItemsPerPageCount: setTableRowCount,
                }}
                pageCount={Math.ceil(totalRowCount / tableRowCount)}
            />
        </div>
    );
};

export default CustomTable;
