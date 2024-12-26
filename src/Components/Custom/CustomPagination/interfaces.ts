export type CustomPaginationType = {
    alignH?: 'center' | 'flex-start' | 'flex-end' | 'space-between';
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    itemsPerPage?: {
        itemsPerPageCount: number[];
        selectedItemsPerPage: number;
        setItemsPerPageCount: React.Dispatch<React.SetStateAction<number>>;
    };
    pageCount: number;
};
