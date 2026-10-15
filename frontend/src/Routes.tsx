import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import ProtectedRoutes from './RoutesProtection';

import HomeLayout from './Components/Layouts/HomeLayout';
import HouseLayout from './Components/Layouts/HouseLayout';

import LoginPage from './Pages/Auth/Login';
import ForgetPasswordPage from './Pages/Auth/ForgetPassword';

import HousePage from './Pages/Houses';
import DOpage from './Pages/DOs';
import ExpensesPage from './Pages/Expenses';
import HomePage from './Pages/Home';
import UsersPage from './Pages/Users';
import AccountPage from './Pages/Account';

import { UserRole } from './Constants/Users';

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomeLayout />,
        children: [
            {
                index: true,
                element: <HousePage />,
            },
            {
                path: 'users',
                element: <UsersPage />,
                handle: { role: [UserRole.ADMIN, UserRole.VISITOR] },
            },
            {
                path: 'account',
                element: <AccountPage />,
            },
        ],
    },
    /**
     * @description AUTH ROUTES
     */
    {
        path: '/auth',
        children: [
            {
                path: 'login',
                element: (
                    <ProtectedRoutes>
                        <LoginPage />
                    </ProtectedRoutes>
                ),
            },
            {
                path: 'forget-password',
                element: (
                    <ProtectedRoutes>
                        <ForgetPasswordPage />
                    </ProtectedRoutes>
                ),
            },
        ],
    },
    /**
     * @description HOUSE ROUTES
     */
    {
        path: 'house/:houseSlug',
        element: <HouseLayout />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: 'transaction',
                element: <ExpensesPage />,
            },
            {
                path: 'do',
                element: <DOpage />,
            },
            {
                path: 'albums',
                element: <div>Album Page</div>,
            },
        ],
    },
]);

export default router;
