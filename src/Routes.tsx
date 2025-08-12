import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import ProtectedRoutes from './protectedRoutes';

import Layout from './Layouts';
import LoginPage from './Pages/Auth/Login';
import ExpensesPage from './Pages/Expenses';
import HomePage from './Pages/Home';
import UsersPage from './Pages/Users';

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <ProtectedRoutes auth>
                <Layout>
                    <HomePage />
                </Layout>
            </ProtectedRoutes>
        ),
    },
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
        ],
    },
    {
        path: '/transaction',
        element: (
            <ProtectedRoutes auth>
                <Layout>
                    <ExpensesPage />
                </Layout>
            </ProtectedRoutes>
        ),
    },
    {
        path: '/users',
        element: (
            <ProtectedRoutes auth>
                <Layout>
                    <UsersPage />
                </Layout>
            </ProtectedRoutes>
        ),
    },
    {
        path: '/account',
        element: (
            <ProtectedRoutes auth>
                <Layout>Account page</Layout>
            </ProtectedRoutes>
        ),
    },
    {
        path: '/albums',
        element: (
            <ProtectedRoutes auth>
                <Layout>Album page</Layout>
            </ProtectedRoutes>
        ),
    },
]);

export default router;
