import React from 'react';

import {
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Paper,
} from '@mui/material';
import {
    ImportExport as ImportExportIcon,
    ArrowDownward as DownArrowIcon,
    ArrowUpward as upArrowIcon,
    Cached as RefreshIcon,
} from '@mui/icons-material';

import CustomPagination from '../CustomPagination';
import TableFilterGroups from './TableFilterGroups';

import { CustomTablePropsType, CustomTableRowDataType } from './interfaces';
import styles from './styles.module.css';
import { TABLE_ROW_COUNT_OPTIONS } from './constants';

const CustomTable = (props: CustomTablePropsType) => {
    const {
        columns,
        rowData,
        showRefreshButton,
        pagination,
        sort,
        loadTableData,
        filterItems,
        onChangeFilterData,
    } = props;

    const onSortIconClick = (columnKey: string) => {
        if (!sort) {
            return;
        }

        const { sortData, setSortData } = sort;
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
        if (!sort) {
            return;
        }

        const { sortData } = sort;
        if (columnKey === sortData?.columnKey) {
            return sortData.sortType === 'ASC' ? DownArrowIcon : upArrowIcon;
        }

        return ImportExportIcon;
    };

    const getItemPerPageData = () => {
        if (!pagination || !pagination.sizePerPageData) {
            return;
        }

        return {
            itemsPerPageCount: TABLE_ROW_COUNT_OPTIONS,
            selectedItemsPerPage: pagination.sizePerPageData.sizePerPage,
            setItemsPerPageCount: pagination.sizePerPageData.setSizePerPage,
        };
    };

    const loadData = async () => {
        if (loadTableData) {
            await loadTableData();
        }
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

    const renderFiltersAndRefreshButton = () => {
        return (
            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'flex-end',
                    margin: '5px 1px',
                }}
            >
                <div style={{ flexGrow: '1' }}>
                    <TableFilterGroups
                        filterItems={filterItems || []}
                        loadTableData={loadTableData}
                        onChangeFilterData={onChangeFilterData}
                    />
                </div>
                {showRefreshButton && renderRefreshButton()}
            </div>
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
                                    {sortable && SortIcon && (
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

            if (typeof tableRowCellContent === 'string' && tableRowCellContent.length >= 20) {
                tableRowCellContent = (
                    <Tooltip title={tableRowCellContent}>
                        <div className="table-text">{tableRowCellContent}</div>
                    </Tooltip>
                );
            }

            return (
                <TableCell
                    key={`custom-table-row-cell-${columnKey}`}
                    align="center"
                    className={styles.tableRowCell}
                >
                    <div className={`table-text ${styles.tableRowCellContent}`}>
                        {tableRowCellContent}
                    </div>
                </TableCell>
            );
        });

        return tableRow;
    };

    return (
        <div>
            {renderFiltersAndRefreshButton()}
            <TableContainer component={Paper} className={styles.tableContainer}>
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
            {pagination && (
                <CustomPagination
                    page={pagination.page}
                    setPage={pagination.setPage}
                    itemsPerPage={getItemPerPageData()}
                    pageCount={pagination.totalPage}
                />
            )}
        </div>
    );
};

export default CustomTable;
