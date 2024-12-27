import React from 'react';

import { Pagination, PaginationItem, PaginationRenderItemParams, Stack } from '@mui/material';

import { CustomPaginationType } from './interfaces';
import styles from './styles.module.css';

const CustomPagination = (props: CustomPaginationType) => {
    const { alignH = 'center', page, setPage, itemsPerPage, pageCount } = props;

    const renderSelectPaginatedItemSection = () => {
        if (!itemsPerPage) {
            return;
        }

        const { itemsPerPageCount, selectedItemsPerPage, setItemsPerPageCount } = itemsPerPage;

        return (
            <select
                className={styles.selectItemsPerPage}
                value={selectedItemsPerPage}
                onChange={(e) => {
                    setPage(1);

                    if (isNaN(Number(e.target.value))) {
                        setItemsPerPageCount(itemsPerPageCount[0] || 0);
                        return;
                    }

                    setItemsPerPageCount(Number(e.target.value));
                }}
            >
                {(itemsPerPageCount || []).map((itemPerPage) => (
                    <option
                        key={`custom-pagination-item-per-page-${itemPerPage}`}
                        className={styles.selectItemsPerPageOptions}
                    >
                        {itemPerPage}
                    </option>
                ))}
            </select>
        );
    };

    const renderPaginationItem = (paginationItemParams: PaginationRenderItemParams) => {
        const { page: itemPage, type } = paginationItemParams;
        let sx: any = {};
        let className = styles.paginationItem;

        if (type === 'previous' || type === 'next') {
            sx = {
                ...sx,
                color: '#fff',
                backgroundColor: '#158901',
            };
            className = styles.paginationItemArrow;
        }

        if (page === itemPage) {
            sx = {
                ...sx,
                border: '1.5px solid #158901',
                color: '#158901',
                backgroundColor: 'transparent',
            };
            className = styles.paginationItemSelected;
        }

        return <PaginationItem sx={sx} {...paginationItemParams} className={className} />;
    };

    return (
        <Stack spacing={2} direction="row" sx={{ justifyContent: alignH, margin: '5px 0px' }}>
            {renderSelectPaginatedItemSection()}
            <Pagination
                page={page}
                count={pageCount}
                variant="outlined"
                shape="rounded"
                sx={{ width: 'fit-content' }}
                renderItem={renderPaginationItem}
                onChange={(event: React.ChangeEvent<unknown>, page: number) => setPage(page)}
            />
        </Stack>
    );
};

export default CustomPagination;
