export type CustomTablePropsType = {
    columns: CustomTableColumnDataType[];
    rowData: CustomTableRowDataType[];
    totalRowCount: number;
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
