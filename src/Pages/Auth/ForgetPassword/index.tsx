import React, { useEffect, useState } from 'react';

import { Divider } from '@mui/material';

import LinearLoadingItem from '../../../Components/Custom/CustomLoadingItems/LinearLoadingItem';

import WelcomeTextImage from '../../../Assets/Images/welcome_text.png';
import styles from './styles.module.css';

const FORGER_PASSWORD_PAGE_TITLE = 'Forget Password';

const ForgetPasswordPage = () => {
    const [isLoading, setIsLoading] = useState(false);

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
                    <div className={styles.forgotPassInputSection}>Forgot password input here</div>
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
