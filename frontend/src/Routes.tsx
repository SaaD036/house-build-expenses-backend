import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import ProtectedRoutes from './RoutesProtection';

import Layout from './Components/Layouts';

import LoginPage from './Pages/Auth/Login';
import ForgetPasswordPage from './Pages/Auth/ForgetPassword';

import HousePage from './Pages/Houses';
import DOpage from './Pages/DOs';
import ExpensesPage from './Pages/Expenses';
import HomePage from './Pages/Home';
import UsersPage from './Pages/Users';
import AccountPage from './Pages/Account';

import { UserRole } from './Constants/Users';
import { SIDEBAR_ITEMS_LAYER } from './Components/Layouts/Sidebar/constants';

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <ProtectedRoutes auth>
                <Layout sidebarItemsLayer={SIDEBAR_ITEMS_LAYER.HOME}>
                    <HousePage />
                </Layout>
            </ProtectedRoutes>
        ),
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
        path: 'house/:houseOd',
        children: [
            {
                index: true,
                element: (
                    <ProtectedRoutes auth>
                        <Layout sidebarItemsLayer={SIDEBAR_ITEMS_LAYER.HOUSE}>
                            <HomePage />
                        </Layout>
                    </ProtectedRoutes>
                ),
            },
            {
                path: 'transaction',
                element: (
                    <ProtectedRoutes auth>
                        <Layout sidebarItemsLayer={SIDEBAR_ITEMS_LAYER.HOUSE}>
                            <ExpensesPage />
                        </Layout>
                    </ProtectedRoutes>
                ),
            },
            {
                path: 'do',
                element: (
                    <ProtectedRoutes auth>
                        <Layout sidebarItemsLayer={SIDEBAR_ITEMS_LAYER.HOUSE}>
                            <DOpage />
                        </Layout>
                    </ProtectedRoutes>
                ),
            },
            {
                path: 'albums',
                element: (
                    <ProtectedRoutes auth>
                        <Layout sidebarItemsLayer={SIDEBAR_ITEMS_LAYER.HOUSE}>Album page</Layout>
                    </ProtectedRoutes>
                ),
            },
        ],
    },
    {
        path: '/users',
        element: (
            <ProtectedRoutes auth role={[UserRole.ADMIN, UserRole.VISITOR]}>
                <Layout sidebarItemsLayer={SIDEBAR_ITEMS_LAYER.HOME}>
                    <UsersPage />
                </Layout>
            </ProtectedRoutes>
        ),
    },
    {
        path: '/account',
        element: (
            <ProtectedRoutes auth>
                <Layout sidebarItemsLayer={SIDEBAR_ITEMS_LAYER.HOME}>
                    <AccountPage />
                </Layout>
            </ProtectedRoutes>
        ),
    },
]);

export default router;
