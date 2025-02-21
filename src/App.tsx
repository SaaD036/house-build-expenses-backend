import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer, Bounce } from 'react-toastify';
import { connect } from 'react-redux';

import router from './Routes';

import { setLoggedinUserToken } from './Redux/actions/authAction';

import { cookieName, getCookie } from './Utilities/Cookies';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App(props: any) {
    const { user, setLoggedinUserToken } = props;

    useEffect(() => {
        if (user) {
            return;
        }

        const loggedInUserTokenInCookie = getCookie(cookieName.USER_TOKEN);
        setLoggedinUserToken(loggedInUserTokenInCookie);
    }, [user]);

    return (
        <div className="App">
            <ToastContainer
                position="bottom-left"
                autoClose={5000}
                pauseOnFocusLoss
                pauseOnHover
                transition={Bounce}
            />
            <RouterProvider router={router} />
        </div>
    );
}

const mapStateToProps = (state: any) => ({
    user: state.auth.loggedInUser,
});

const mapDispatchToProps = {
    setLoggedinUserToken,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
