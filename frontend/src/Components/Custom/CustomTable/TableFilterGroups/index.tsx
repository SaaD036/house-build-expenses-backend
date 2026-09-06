import React from 'react';

import { Grid2 } from '@mui/material';

import Form from '../../Form';
import FormTextInput from '../../Form/FormComponent/FormTextInput';

import { getTableFilterFormInitialData } from '../utilities';

import {
    CustomTableFilterFormDataType,
    CustomTableFilterItemType,
    TableFilterGroupsPropsType,
} from '../interfaces';
import FormDate from '../../Form/FormComponent/FormDateInput';

const TableFilterGroups = (props: TableFilterGroupsPropsType) => {
    const { filterItems, onChangeFilterData } = props;

    const renderTableFilterFormItems = (item: CustomTableFilterItemType) => {
        const { key, label, type } = item;

        if (type === 'string') {
            return <FormTextInput id={key} name={key} label={label} />;
        }

        if (type === 'date') {
            return <FormDate id={key} name={key} label={label} />;
        }
    };

    if (filterItems.length === 0) {
        return <></>;
    }

    return (
        <Form
            initialValue={getTableFilterFormInitialData(filterItems)}
            validationObject={{}}
            onFormValueChange={(formValue: CustomTableFilterFormDataType) => {
                if (onChangeFilterData) {
                    onChangeFilterData(formValue);
                }
            }}
        >
            <Grid2 container columnSpacing={4} rowSpacing={1}>
                {filterItems.map((item) => (
                    <Grid2
                        key={`table-flter-item-${item.key}`}
                        size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 3 }}
                    >
                        {renderTableFilterFormItems(item)}
                    </Grid2>
                ))}
            </Grid2>
        </Form>
    );
};

export default TableFilterGroups;
