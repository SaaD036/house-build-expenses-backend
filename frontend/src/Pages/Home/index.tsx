import React, { useEffect } from 'react';

import Header from '../../Components/Header';
import HomePageComponent from '../../Components/Home/HomePageComponent';

import styles from './styles.module.css';

const HOME_PAGE_TITLE = 'HBE';

const HomePage = () => {
    useEffect(() => {
        document.title = HOME_PAGE_TITLE;
    }, []);

    return (
        <div className={`pageComponent center ${styles.homePage}`}>
            <Header components={<div></div>} />
            <HomePageComponent />
        </div>
    );
};

export default HomePage;
