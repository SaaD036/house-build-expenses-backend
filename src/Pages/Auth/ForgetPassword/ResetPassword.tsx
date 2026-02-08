import React, { useState } from 'react';
import { connect } from 'react-redux';

import CustomInput from '../../../Components/Custom/CustomInput';
import ButtonSection from '../../../Components/Custom/CustomButton/ButtonSection';
import CustomButton from '../../../Components/Custom/CustomButton';

import { resetPassword } from '../../../Redux/actions/authAction';

import { ResetPasswordPagePropsType } from './interfaces';

import styles from './styles.module.css';

const ResetPassword = (props: ResetPasswordPagePropsType) => {
    const { email, makeSentEmailFlagFalse, resetPassword } = props;

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

    const onResetButtonClick = async () => {
        try {
            const resetPasswordResponse = await resetPassword(
                email,
                `HBE-${resetCode}`,
                newPassword
            );

            if (resetPasswordResponse === 'fail') {
                throw new Error();
            }
        } catch (error) {
            //
        }
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
                type="password"
                onChange={(e: string) => setNewPassword(e)}
            />
            <CustomInput
                label="Confirm Password"
                value={confirmPassword}
                type="password"
                onChange={(e: string) => setConfirmPassword(e)}
            />
            <ButtonSection>
                <CustomButton onClick={onBackButtonClick} disabled={false}>
                    Back
                </CustomButton>
                <div style={{ width: '5px' }}></div>
                <CustomButton onClick={onResetButtonClick} disabled={isSubmitButtonDisabled()}>
                    Reset
                </CustomButton>
            </ButtonSection>
        </div>
    );
};

const mapDispatchToProps = {
    resetPassword,
};

export default connect(null, mapDispatchToProps)(ResetPassword);
