export type CustomPaginationType = {
    alignH?: 'center' | 'flex-start' | 'flex-end' | 'space-between';
    page: number;
    setPage: (page: number) => void;
    itemsPerPage?: {
        itemsPerPageCount: number[];
        selectedItemsPerPage: number;
        setItemsPerPageCount: (itemPerPageCount: number) => void;
    };
    pageCount: number;
};
