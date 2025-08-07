/* eslint-disable indent */
import { Dispatch } from 'react';
import { toast } from 'react-toastify';
import { Method } from 'axios';
import { get, isArray } from 'lodash';

import { callAxiosAPI } from '../apiServices/calAPPI';
import { buildURL } from '../apiServices/buildURL';
import expenseAPIs from '../apiServices/APIs/expenseAPIs.json';

import { GET_ALL_EXPENSES, GET_TOTAL_EXPENSE } from '../types/expenses';

import { HTTP_STATUS_CODE } from '../../Constants/HTTP';
import ValidationError from '../../ErrorHandlers/ValidationError';

import { ExpenseType, CreateExpenseFormDataType } from '../../Types/expenses';
import { CustomTableLoadDataTypes } from '../../Components/Custom/CustomTable/interfaces';
import { TotalExpenseFormDataType } from '../../Components/Home/HomePageComponentItems/TotalExpense/interfaces';

type DispatchType = { type: string; payload: any };

export const getAllExpenses =
    (filters?: CustomTableLoadDataTypes) => async (dispatch: Dispatch<DispatchType>) => {
        try {
            const { path, method } = expenseAPIs.GET_ALL_EXPENSES;
            const { UNAUTHENTICATED, INTERNAL_SERVER_ERROR } = HTTP_STATUS_CODE;
            const URLwithVarsANDparams = buildURL(
                path,
                {},
                {
                    page: filters?.page,
                    limit: filters?.itemsPerPage,
                }
            );

            const { status, data } = await callAxiosAPI({
                url: URLwithVarsANDparams,
                method: method as Method,
            });

            if (status === UNAUTHENTICATED) {
                throw new ValidationError('User does not have access to expenses');
            } else if (status === INTERNAL_SERVER_ERROR) {
                throw new ValidationError('Can not fetch expenses');
            }

            const expenseData: ExpenseType[] = (data.expenses || []).map((expense: any) => ({
                id: expense.id,
                amount: expense.amount,
                title: expense.title,
                description: expense.description,
                expenseAt: expense.expenseAt,
                lastUpdatedAt: expense.updatedAt,
                creator: {
                    creatorID: expense.createdBy,
                    firstName: expense.creator.firstName,
                    lastName: expense.creator.lastName,
                },
            }));

            dispatch({
                type: GET_ALL_EXPENSES,
                payload: {
                    expenses: expenseData,
                    expensesCount: isNaN(Number(data.expensesCount))
                        ? null
                        : Number(data.expensesCount),
                },
            });
        } catch (error) {
            if (error instanceof Error) {
                toast(error.message.toString());
            }
        }
    };

export const createExpense =
    (payloadData: CreateExpenseFormDataType) => async (dispatch: Dispatch<DispatchType>) => {
        try {
            const { path, method } = expenseAPIs.CREATE_EXPENSE;
            const { BAD_REQUEST, UNAUTHENTICATED } = HTTP_STATUS_CODE;
            const { status, data } = await callAxiosAPI({
                url: buildURL(path),
                method: method as Method,
                data: payloadData,
            });

            if (status === UNAUTHENTICATED) {
                throw new ValidationError('User does not have access to expenses');
            } else if (status === BAD_REQUEST) {
                const errorMessage = get(data, 'error.message', null);

                if (typeof errorMessage === 'string') {
                    throw new ValidationError(errorMessage);
                }

                if (isArray(errorMessage) && errorMessage.length > 0) {
                    throw new ValidationError(errorMessage[0]);
                }

                throw new ValidationError('Can not add expenses');
            } else if (status > 299) {
                throw new ValidationError('Can not add expenses');
            }

            toast('Expense added successfully');
        } catch (error) {
            if (error instanceof Error) {
                toast(error.message.toString());
            }
        }
    };

export const deleteSingleExpense = (id: number) => async (dispatch: Dispatch<DispatchType>) => {
    try {
        const { path, method } = expenseAPIs.DELETE_SINGLE_EXPENSE;
        const { BAD_REQUEST, UNAUTHENTICATED, NOT_FOUND } = HTTP_STATUS_CODE;

        const { status, data } = await callAxiosAPI({
            url: buildURL(path, { id }),
            method: method as Method,
        });

        if (status === UNAUTHENTICATED) {
            throw new ValidationError('User does not have access to delete expense.');
        } else if (status === NOT_FOUND) {
            throw new ValidationError('Expense not found.');
        } else if (status === BAD_REQUEST) {
            const errorMessage = get(data, 'error.message', null);

            if (typeof errorMessage === 'string') {
                throw new ValidationError(errorMessage);
            }

            if (isArray(errorMessage) && errorMessage.length > 0) {
                throw new ValidationError(errorMessage[0]);
            }

            throw new ValidationError('Can not delete expense.');
        } else if (status > 299) {
            throw new ValidationError('Can not delete expense.');
        }

        toast('Expense deleted successfully');
    } catch (error) {
        if (error instanceof Error) {
            toast(error.message.toString());
        }
    }
};

export const editExpense =
    (id: number, payloadData: CreateExpenseFormDataType) =>
    async (dispatch: Dispatch<DispatchType>) => {
        try {
            const { path, method } = expenseAPIs.EDIT_SINGLE_EXPENSE;
            const { BAD_REQUEST, UNAUTHENTICATED, NOT_FOUND } = HTTP_STATUS_CODE;

            const { status, data } = await callAxiosAPI({
                url: buildURL(path, { id }),
                method: method as Method,
                data: payloadData,
            });

            if (status === UNAUTHENTICATED) {
                throw new ValidationError('User does not have access to delete expense.');
            } else if (status === NOT_FOUND) {
                throw new ValidationError('Expense not found.');
            } else if (status === BAD_REQUEST) {
                const errorMessage = get(data, 'error.message', null);

                if (typeof errorMessage === 'string') {
                    throw new ValidationError(errorMessage);
                }

                if (isArray(errorMessage) && errorMessage.length > 0) {
                    throw new ValidationError(errorMessage[0]);
                }

                throw new ValidationError('Can not edit expense.');
            } else if (status > 299) {
                throw new ValidationError('Can not edit expense.');
            }

            toast('Expense edited successfully');
        } catch (error) {
            if (error instanceof Error) {
                toast(error.message.toString());
            }
        }
    };

export const getTotalExpense =
    (filters: TotalExpenseFormDataType) => async (dispatch: Dispatch<DispatchType>) => {
        try {
            const { path, method } = expenseAPIs.GET_TOTAL_EXPENSE;
            const { UNAUTHENTICATED, INTERNAL_SERVER_ERROR } = HTTP_STATUS_CODE;
            const params: any = {
                fromDate: filters.formDate ? filters.formDate.toISOString() : '',
                toDate: filters.toDate ? filters.toDate.toISOString() : '',
            };

            const URLwithVarsANDparams = buildURL(path, {}, params);
            const { status, data } = await callAxiosAPI({
                url: URLwithVarsANDparams,
                method: method as Method,
            });

            if (status === UNAUTHENTICATED) {
                throw new ValidationError('User does not have access to expenses');
            } else if (status === INTERNAL_SERVER_ERROR) {
                throw new ValidationError('Can not fetch expenses');
            }

            dispatch({
                type: GET_TOTAL_EXPENSE,
                payload: {
                    totalExpenses: isNaN(get(data, 'totalExpense', null))
                        ? null
                        : Number(get(data, 'totalExpense', 0)),
                },
            });
        } catch (error) {
            if (error instanceof Error) {
                toast(error.message.toString());
            }
        }
    };
