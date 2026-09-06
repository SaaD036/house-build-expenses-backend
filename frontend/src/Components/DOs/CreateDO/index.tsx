import React, { useState } from 'react';
import { FormikHelpers } from 'formik';
import { connect } from 'react-redux';

import { Container, Grid2 } from '@mui/material';

import Form from '../../Custom/Form';
import FormTextInput from '../../Custom/Form/FormComponent/FormTextInput';
import FormTextArea from '../../Custom/Form/FormComponent/FormTextAreaInput';
import FormCurrencyInput from '../../Custom/Form/FormComponent/FormCurrencyInput';
import FormDate from '../../Custom/Form/FormComponent/FormDateInput';

import CardContainer from '../../CardContainer';
import TabComponentLoader from '../../Custom/CustomLoadingItems/TabComponentLoader';
import ButtonSection from '../../Custom/CustomButton/ButtonSection';

import { createDo } from '../../../Redux/actions/doAction';

import { CREATE_DO_FORM_VALIDATION, CREATE_DO_INITIAL_VALUE } from './constants';

import { CreateDOformValueType, CreateDOpropsType } from './interfaces';

import styles from './styles.module.css';

const CreateDO = (props: CreateDOpropsType) => {
    const { disabledForm, createDo } = props;

    const [loading, setLoading] = useState(false);

    const onSubmit = async (
        formValue: CreateDOformValueType,
        formikHelpers: FormikHelpers<object>
    ) => {
        setLoading(true);

        await createDo(formValue);
        formikHelpers.setValues(CREATE_DO_INITIAL_VALUE);

        setLoading(false);
    };

    return (
        <div style={{ display: 'grid', gap: '25px' }}>
            <CardContainer title="Add DO" />
            {loading && <TabComponentLoader />}
            {disabledForm && (
                <Container className="center">
                    <div className="form-disabled-message">This form is disabled</div>
                </Container>
            )}
            <CardContainer>
                <div style={disabledForm ? { pointerEvents: 'none' } : undefined}>
                    <Form
                        initialValue={CREATE_DO_INITIAL_VALUE}
                        validationObject={CREATE_DO_FORM_VALIDATION}
                        onSubmit={onSubmit}
                    >
                        <Grid2 container spacing={2}>
                            <Grid2 size={{ xs: 12, md: 5 }}>
                                <FormTextInput id="shopname" name="shopname" label="Shop Name" />
                            </Grid2>
                            <Grid2 size={{ xs: 12, md: 4 }}>
                                <FormTextInput id="doItem" name="doItem" label="DO Item Name" />
                            </Grid2>
                            <Grid2 size={{ xs: 12, md: 3 }}>
                                <FormCurrencyInput
                                    id="amount"
                                    name="amount"
                                    label="Amount"
                                    min={1}
                                />
                            </Grid2>
                        </Grid2>
                        <FormTextArea id="description" name="description" label="Description" />
                        <Grid2 container spacing={2}>
                            <Grid2 size={{ xs: 6, md: 3 }}>
                                <FormTextInput id="area" name="area" label="Area" />
                            </Grid2>
                            <Grid2 size={{ xs: 6, md: 3 }}>
                                <FormTextInput id="ward" name="ward" label="Ward" />
                            </Grid2>
                            <Grid2 size={{ xs: 6, md: 3 }}>
                                <FormTextInput id="upazilla" name="upazilla" label="Upazilla" />
                            </Grid2>
                            <Grid2 size={{ xs: 6, md: 3 }}>
                                <FormTextInput id="district" name="district" label="District" />
                            </Grid2>
                        </Grid2>
                        <FormDate
                            id="doDate"
                            name="doDate"
                            label="DO add time"
                            maxDate={new Date()}
                        />
                        <ButtonSection className={styles.buttonSection}>
                            <button className="button" type="submit">
                                Create
                            </button>
                        </ButtonSection>
                    </Form>
                </div>
            </CardContainer>
        </div>
    );
};

const mapDispatchToProps = {
    createDo,
};

export default connect(null, mapDispatchToProps)(CreateDO);
