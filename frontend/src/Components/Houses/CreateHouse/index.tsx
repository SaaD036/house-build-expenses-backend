import React from 'react';
import { connect } from 'react-redux';
import { FormikHelpers } from 'formik';

import CardContainer from '../../CardContainer';
import ButtonSection from '../../Custom/CustomButton/ButtonSection';

import Form from '../../Custom/Form';
import FormTextInput from '../../Custom/Form/FormComponent/FormTextInput';
import FormNumberInput from '../../Custom/Form/FormComponent/FormNumberInput';
import FormRichTextEditor from '../../Custom/Form/FormComponent/FormRichTextEditor';

import {
    CREATE_HOUSE_FORM_VALIDATOR,
    INITIAL_CREATE_HOUSE_VALUES,
    CreateHouseFormValues,
} from './constants';

import styles from './styles.module.css';
import CustomErrorMessage from '../../Custom/CustomErrorMessage';

export interface CreateHouseProps {
    isFormDisabled?: boolean;
    onSubmit?: (values: CreateHouseFormValues) => void;
}

export const CreateHouse: React.FC<CreateHouseProps> = ({ isFormDisabled = true, onSubmit }) => {
    const onSubmitCreateExpenseForm = async (
        createExpenseFormData: any,
        formikHelpers: FormikHelpers<object>
    ) => {};

    return (
        <div style={{ display: 'grid', gap: '25px' }}>
            <CardContainer title="Create House" />
            <CustomErrorMessage errorMessage="You already have created two houses" />
            <CardContainer>
                <Form
                    initialValue={INITIAL_CREATE_HOUSE_VALUES}
                    validationObject={CREATE_HOUSE_FORM_VALIDATOR}
                    onSubmit={onSubmitCreateExpenseForm}
                >
                    <div className={styles.formRow}>
                        <div className={styles.flex3}>
                            <FormTextInput id="title" name="title" label="Title" />
                        </div>
                        <div className={styles.flex1}>
                            <FormNumberInput id="floors" name="floors" label="Floors" min={1} />
                        </div>
                    </div>
                    <div className={styles.formRow}>
                        <FormRichTextEditor
                            id="description"
                            name="description"
                            label="Description"
                            placeholder="Enter description..."
                            minHeight={150}
                        />
                    </div>
                    <div className={styles.formRow}>
                        <div className={styles.flex1}>
                            <FormTextInput
                                id="addressLine"
                                name="addressLine"
                                label="Address line"
                            />
                        </div>
                        <div className={styles.flex1}>
                            <FormTextInput id="area" name="area" label="Area" />
                        </div>
                    </div>
                    <div className={styles.formRow}>
                        <div className={styles.flex1}>
                            <FormTextInput id="upazilla" name="upazilla" label="Upazilla" />
                        </div>
                        <div className={styles.flex1}>
                            <FormTextInput id="district" name="district" label="District" />
                        </div>
                    </div>
                    <ButtonSection className={styles.buttonSection}>
                        <button className="button" type="submit">
                            SUBMIT
                        </button>
                    </ButtonSection>
                </Form>
            </CardContainer>
        </div>
    );
};

const mapStateToProps = (state: any) => ({});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CreateHouse);
