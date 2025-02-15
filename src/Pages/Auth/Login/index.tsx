import React, { useState } from 'react';
import { connect } from 'react-redux';

import { Divider } from '@mui/material';

import CustomInput from '../../../Components/Custom/CustomInput';
import CustomButton from '../../../Components/Custom/CustomButton';
import ButtonSection from '../../../Components/Custom/CustomButton/ButtonSection';
import LinearLoadingItem from '../../../Components/Custom/CustomLoadingItems/LinearLoadingItem';

import { login } from '../../../Redux/actions/authAction';

import { isEmailValid } from '../../../Utilities/String';

import WelcomeTextImage from '../../../Assets/Images/welcome_text.png';

import { LoginPagePropTypes } from './interfaces';
import styles from './styles.module.css';

const Login = (props: LoginPagePropTypes) => {
    const { login } = props;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onEmailChange = (email: string) => {
        setEmail(email.replace(' ', '').toLowerCase());
    };

    const isLoginButtonDisabled = () => {
        let isDisabled = !(isEmailValid(email) && !!password);

        if (isLoading) {
            isDisabled = true;
        }

        return isDisabled;
    };

    const onLoginButtonClick = async () => {
        setIsLoading(true);
        await login(email, password);
        setIsLoading(false);
    };

    const renderWelcomeSection = () => {
        return (
            <div className={styles.welcomeSection}>
                <img src={WelcomeTextImage} className={styles.welcomeImage}></img>
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

    const renderLoginInputs = () => {
        return (
            <div className={styles.loginInputSection}>
                <CustomInput label="Email" value={email} onChange={onEmailChange} />
                <CustomInput
                    label="Password"
                    value={password}
                    onChange={(pass: string) => setPassword(pass)}
                    type="password"
                />
                <ButtonSection>
                    <CustomButton onClick={onLoginButtonClick} disabled={isLoginButtonDisabled()}>
                        LOGIN
                    </CustomButton>
                </ButtonSection>
            </div>
        );
    };

    return (
        <>
            {isLoading && <LinearLoadingItem />}
            <div className={`center ${styles.loginPage}`}>
                <div className={styles.header}></div>
                <div className={`center ${styles.loginSectionContainer}`}>
                    {renderWelcomeSection()}
                    <Divider orientation="vertical" className={styles.divider} />
                    {renderLoginInputs()}
                </div>
                {renderFooterSection()}
            </div>
        </>
    );
};

const mapStateToProps = (state: any) => ({
    loggedInUser: state.auth.loggedInUser,
});

const mapDispatchToProps = {
    login,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
