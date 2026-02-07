import React, { useEffect, useState } from 'react';

import { Divider } from '@mui/material';

import LinearLoadingItem from '../../../Components/Custom/CustomLoadingItems/LinearLoadingItem';

import WelcomeTextImage from '../../../Assets/Images/welcome_text.png';
import styles from './styles.module.css';
import CustomInput from '../../../Components/Custom/CustomInput';
import ButtonSection from '../../../Components/Custom/CustomButton/ButtonSection';
import CustomButton from '../../../Components/Custom/CustomButton';
import { isEmailValid } from '../../../Utilities/String';

const FORGER_PASSWORD_PAGE_TITLE = 'Forget Password';

const ForgetPasswordPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [lastEmailSent, setLastEmailSent] = useState('');

    const [email, setEmail] = useState('');
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

    const onEmailChange = (email: string) => {
        setEmail(email.replace(' ', '').toLowerCase());
    };

    const onEmailSendButtonClick = async () => {
        setIsLoading(true);

        try {
            setLastEmailSent(email);
            setIsEmailSent(true);
            setIsLoading(false);
        } catch (err) {
            setIsEmailSent(false);
            setIsLoading(false);
        }
    };

    const onBackButtonClick = () => {
        setIsEmailSent(false);
        setResetCode('');
        setNewPassword('');
        setConfirmPassword('');
    };

    const renderWelcomeSection = () => {
        return (
            <div className={styles.welcomeSection}>
                <img src={WelcomeTextImage} className={styles.welcomeImage}></img>
            </div>
        );
    };

    const renderEmailInput = () => {
        const sendButtonTitle = !!email && email === lastEmailSent ? 'Resend Code' : 'Send Code';

        return (
            <div className={styles.forgotPasswordInput}>
                <div>
                    <CustomInput label="Email" value={email} onChange={onEmailChange} />
                    {sendButtonTitle === 'Resend Code' && (
                        <div className={`text-error ${styles.errorMessage}`}>
                            Code sent to this email already. Click <b>{sendButtonTitle}</b> button
                            to resend
                        </div>
                    )}
                </div>
                <ButtonSection>
                    <CustomButton
                        onClick={onEmailSendButtonClick}
                        disabled={!isEmailValid(email) || isLoading}
                    >
                        {sendButtonTitle}
                    </CustomButton>
                    {sendButtonTitle === 'Resend Code' && (
                        <>
                            <div style={{ width: '5px' }}></div>
                            <CustomButton
                                onClick={() => setIsEmailSent(true)}
                                disabled={!isEmailValid(email) || isLoading}
                            >
                                Next
                            </CustomButton>
                        </>
                    )}
                </ButtonSection>
            </div>
        );
    };

    const renderCodeInput = () => {
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

    const renderInputsSection = () => {
        return (
            <div className={styles.forgotPassInputSection}>
                {isEmailSent ? renderCodeInput() : renderEmailInput()}
            </div>
        );
    };

    const renderFooterSection = () => {
        // eslint-disable-next-line quotes
        const FOOTER_TEXT = "A SaaD's product";

        return (
            <div className={`center ${styles.footer}`}>
                <div className="center">
                    <span>{FOOTER_TEXT}</span>
                </div>
            </div>
        );
    };

    useEffect(() => {
        document.title = FORGER_PASSWORD_PAGE_TITLE;
    }, []);

    return (
        <>
            {isLoading && <LinearLoadingItem />}
            <div className={`center ${styles.forgotPasswordPage}`}>
                <div className={styles.header}></div>
                <div className={`center ${styles.forgotPasswordSectionContainer}`}>
                    {renderWelcomeSection()}
                    <Divider orientation="vertical" className={styles.divider} />
                    {renderInputsSection()}
                </div>
                <div className={`${styles.login} center`}>
                    <a href="/auth/login" className="text">
                        Back to Login page
                    </a>
                </div>
                {renderFooterSection()}
            </div>
        </>
    );
};

export default ForgetPasswordPage;
