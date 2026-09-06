export type CustomTablePropsType = {
    columns: CustomTableColumnDataType[];
    rowData: CustomTableRowDataType[];
    pagination?: {
        page: number;
        setPage: (page: number) => void;
        totalPage: number;
        sizePerPageData?: {
            sizePerPage: number;
            setSizePerPage: (sizePerPage: number) => void;
        };
    };
    sort?: {
        sortData?: CustomTableColumnSortDataType;
        setSortData: (sortData?: CustomTableColumnSortDataType) => void;
    };
    loadTableData?: (filterAndParams?: CustomTableLoadDataTypes) => Promise<void>;
    showRefreshButton?: boolean;
    filterItems?: CustomTableFilterItemType[];
    onChangeFilterData?: (data: CustomTableFilterFormDataType) => void;
};

export type TableFilterGroupsPropsType = {
    filterItems: CustomTableFilterItemType[];
    loadTableData?: (filterAndParams?: CustomTableLoadDataTypes) => Promise<void>;
    onChangeFilterData?: (data: CustomTableFilterFormDataType) => void;
};

export type CustomTableColumnDataType = {
    key: string;
    label: string | React.ReactNode;
    sortable?: boolean;
};

export type CustomTableRowDataType = Record<
    CustomTableColumnDataType['key'],
    {
        value: any;
    }
>;

export type CustomTableColumnSortDataType = {
    columnKey: string;
    sortType: 'ASC' | 'DES';
};

export type CustomTableLoadDataTypes = {
    page?: number;
    itemsPerPage?: number;
    sort?: CustomTableColumnSortDataType;
    filters?: CustomTableFilterFormDataType;
};

export type CustomTableFilterItemType = {
    key: string;
    label: string;
    type: 'string' | 'date' | 'boolean' | 'dropdown';
};

export type CustomTableFilterFormDataType = Record<CustomTableFilterItemType['key'], any>;
