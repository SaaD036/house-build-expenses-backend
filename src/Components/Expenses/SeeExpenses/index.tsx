import React from 'react';
import CustomTable from '../../Custom/CustomTable';

const columns = [
    {
        key: 'title',
        label: 'Title',
        sortable: true,
    },
    {
        key: 'amount',
        label: 'Amount',
        sortable: true,
    },
    {
        key: 'description',
        label: 'Description',
    },
    {
        key: 'expense_time',
        label: 'Expense time',
        sortable: true,
    },
    {
        key: 'creator',
        label: 'Creator',
    },
];

const rows = [
    {
        title: {
            value: 'Rod',
        },
        amount: {
            value: 10,
        },
        description: {
            value: 'No description is needed',
        },
        expense_time: {
            value: '2024-12-01',
        },
        creator: {
            value: 'Kader khan',
        },
    },
    {
        title: {
            value: 'Cement',
        },
        amount: {
            value: 100,
        },
        description: {
            value: 'No description is needed',
        },
        expense_time: {
            value: '2024-12-01',
        },
        creator: {
            value: 'Kader khan',
        },
    },
    {
        title: {
            value: 'Sand',
        },
        amount: {
            value: 3.5,
        },
        description: {
            value: 'No description is needed',
        },
        expense_time: {
            value: '2024-12-01',
        },
        creator: {
            value: 'Kader khan',
        },
    },
    {
        title: {
            value: 'Bricks',
        },
        amount: {
            value: 5,
        },
        description: {
            value: 'No description is needed  jsh jhguyg jhgauyfg jshghuyfg ahguyfgds jhsgfuyg',
        },
        expense_time: {
            value: '2024-12-01',
        },
        creator: {
            value: 'Kader khan',
        },
    },
];

const SeeExpenses = () => {
    return <CustomTable columns={columns} rowData={rows} totalRowCount={100} />;
};

export default SeeExpenses;
