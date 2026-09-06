import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { connect } from 'react-redux';

import CustomToast from './Components/Custom/CustomToast';

import router from './Routes';

import { setLoggedinUserToken } from './Redux/actions/authAction';
import { setCurrentView } from './Redux/actions/generalAction';

import { cookieName, getCookie } from './Utilities/Cookies';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App(props: any) {
    const { user, currentView, setCurrentView, setLoggedinUserToken } = props;

    useEffect(() => {
        if (user) {
            return;
        }

        const loggedInUserTokenInCookie = getCookie(cookieName.USER_TOKEN);
        setLoggedinUserToken(loggedInUserTokenInCookie);
    }, [user]);

    useEffect(() => {
        if (currentView) {
            return;
        }

        setCurrentView('table');
    }, []);

    return (
        <div className="App">
            <CustomToast />
            <RouterProvider router={router} />
        </div>
    );
}

const mapStateToProps = (state: any) => ({
    user: state.auth.loggedInUser,
    currentView: state.general.currentView,
});

const mapDispatchToProps = {
    setLoggedinUserToken,
    setCurrentView,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
