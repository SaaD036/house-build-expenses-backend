import React from 'react';

import Header from '../../Components/Header';
import HomePageComponent from '../../Components/Home/HomePageComponent';

import styles from './styles.module.css';

const HomePage = () => {
    return (
        <div className={`pageComponent center ${styles.homePage}`}>
            <Header components={<div></div>} />
            <HomePageComponent />
        </div>
    );
};

export default HomePage;
