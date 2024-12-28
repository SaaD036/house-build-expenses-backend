/* eslint-disable indent */
import { Dispatch } from 'react';
import { toast } from 'react-toastify';
import { Method } from 'axios';

import { callAxiosAPI } from '../apiServices/calAPPI';
import { buildURL } from '../apiServices/buildURL';
import expenseAPIs from '../apiServices/APIs/expenseAPIs.json';

import { GET_ALL_EXPENSES } from '../types/expenses';

import { HTTP_STATUS_CODE } from '../../Constants/HTTP';
import ValidationError from '../../ErrorHandlers/ValidationError';

import { ExpenseType } from '../../Types/expenses';

export const getAllExpenses =
    (filters: any) => async (dispatch: Dispatch<{ type: string; payload: any }>) => {
        try {
            const { path, method } = expenseAPIs.GET_ALL_EXPENSES;
            const { UNAUTHENTICATED, INTERNAL_SERVER_ERROR } = HTTP_STATUS_CODE;
            const { status, data } = await callAxiosAPI({
                url: buildURL(path),
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
                        ? Number(data.expensesCount)
                        : null,
                },
            });
        } catch (error) {
            if (error instanceof Error) {
                toast(error.message.toString());
            }
        }
    };
