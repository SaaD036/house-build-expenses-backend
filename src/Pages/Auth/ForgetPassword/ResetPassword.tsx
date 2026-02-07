import React, { useState } from 'react';

import CustomInput from '../../../Components/Custom/CustomInput';
import ButtonSection from '../../../Components/Custom/CustomButton/ButtonSection';
import CustomButton from '../../../Components/Custom/CustomButton';

import { ResetPasswordPagePropsType } from './interfaces';

import styles from './styles.module.css';

const ResetPassword = (props: ResetPasswordPagePropsType) => {
    const { makeSentEmailFlagFalse } = props;

    const [resetCode, setResetCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const isSubmitButtonDisabled = () => {
        if (!resetCode || !newPassword || !confirmPassword) {
            return true;
        }

        if (newPassword !== confirmPassword) {
            return true;
        }

        return false;
    };

    const onBackButtonClick = () => {
        makeSentEmailFlagFalse();
        setResetCode('');
        setNewPassword('');
        setConfirmPassword('');
    };

    return (
        <div className={styles.forgotPasswordInput}>
            <CustomInput
                label="Code"
                type="number"
                value={resetCode}
                onChange={(e: string) => setResetCode(e)}
            />
            <CustomInput
                label="New Password"
                value={newPassword}
                onChange={(e: string) => setNewPassword(e)}
            />
            <CustomInput
                label="Confirm Password"
                value={confirmPassword}
                onChange={(e: string) => setConfirmPassword(e)}
            />
            <ButtonSection>
                <CustomButton onClick={onBackButtonClick} disabled={false}>
                    Back
                </CustomButton>
                <div style={{ width: '5px' }}></div>
                <CustomButton onClick={() => {}} disabled={isSubmitButtonDisabled()}>
                    Submit
                </CustomButton>
            </ButtonSection>
        </div>
    );
};

export default ResetPassword;
