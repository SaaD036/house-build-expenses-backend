import React, { useEffect, useState } from 'react';

import { Container, Grid2 } from '@mui/material';

import Form from '../../Custom/Form';
import FormTextInput from '../../Custom/Form/FormComponent/FormTextInput';

import CardContainer from '../../CardContainer';
import TabComponentLoader from '../../Custom/CustomLoadingItems/TabComponentLoader';
import ButtonSection from '../../Custom/CustomButton/ButtonSection';

import {
    CREATE_USER_FORM_INITIAL_VALUE,
    CREATE_USER_FORM_ROLE_DROPDOWN_ITEM,
    CREATE_USER_FORM_VALIDATOR,
    CREATE_USER_FORM_ACCOUNT_STATUS_DROPDOWN_ITEM,
} from './constants';

import { CreateUserFormDataType, CreateUserPagePropsType } from './interfaces';

import styles from './styles.module.css';
import FormSelectInput from '../../Custom/Form/FormComponent/FormSelectInput';

const CreateUser = (props: CreateUserPagePropsType) => {
    const { disabledForm } = props;

    const [loading, setLoading] = useState<boolean>();
    const [createUserFormData, setCreateUserFormData] = useState<CreateUserFormDataType>(
        CREATE_USER_FORM_INITIAL_VALUE
    );

    useEffect(() => {
        console.log('SaaD : ', createUserFormData);
    }, [createUserFormData]);

    return (
        <div style={{ display: 'grid', gap: '25px' }}>
            <CardContainer title="Add User" />
            {loading && <TabComponentLoader />}
            {disabledForm && (
                <Container className="center">
                    <div className={styles.formDisabledMessage}>This form is disabled</div>
                </Container>
            )}
            <CardContainer>
                <div style={disabledForm ? { pointerEvents: 'none' } : undefined}>
                    <Form
                        initialValue={CREATE_USER_FORM_INITIAL_VALUE}
                        validationObject={CREATE_USER_FORM_VALIDATOR}
                        onFormValueChange={(data: CreateUserFormDataType) =>
                            setCreateUserFormData(data)
                        }
                        onSubmit={() => {}}
                    >
                        <Grid2 container spacing={3} marginTop={3}>
                            <Grid2 size={{ xs: 12, sm: 6 }}>
                                <FormTextInput id="firstName" name="firstName" label="First Name" />
                            </Grid2>
                            <Grid2 size={{ xs: 12, sm: 6 }}>
                                <FormTextInput id="lastName" name="lastName" label="Last Name" />
                            </Grid2>
                        </Grid2>
                        <FormTextInput id="email" name="email" label="Email" />
                        <Grid2 container spacing={3}>
                            <Grid2 size={{ xs: 12, sm: 6 }}>
                                <FormSelectInput
                                    id="role"
                                    name="role"
                                    label="Role"
                                    options={CREATE_USER_FORM_ROLE_DROPDOWN_ITEM}
                                />
                            </Grid2>
                            <Grid2 size={{ xs: 12, sm: 6 }}>
                                <FormSelectInput
                                    id="accountStatus"
                                    name="accountStatus"
                                    label="Account Status"
                                    options={CREATE_USER_FORM_ACCOUNT_STATUS_DROPDOWN_ITEM}
                                />
                            </Grid2>
                        </Grid2>

                        <ButtonSection className={styles.buttonSection}>
                            <button className="button" type="submit">
                                SUBMIT
                            </button>
                        </ButtonSection>
                    </Form>
                </div>
            </CardContainer>
        </div>
    );
};

export default CreateUser;
