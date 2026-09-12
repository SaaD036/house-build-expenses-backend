/* eslint-disable indent */
import { Dispatch } from 'react';
import { Method } from 'axios';
import { get, isArray } from 'lodash';

import { callAxiosAPI } from '../apiServices/calAPPI';
import { buildURL } from '../apiServices/buildURL';
import expenseAPIs from '../apiServices/APIs/expenseAPIs.json';

import { initiateToast } from '../../Components/Custom/CustomToast';

import {
    GET_ALL_EXPENSES,
    GET_DO_DETAILS_FOR_EXPENSE,
    GET_EXPENSE_EDIT_HISTORY,
    GET_SINGLE_EXPENSE,
    GET_TOTAL_EXPENSE,
} from '../types/expenses';

import { HTTP_STATUS_CODE } from '../../Constants/HTTP';
import ValidationError from '../../ErrorHandlers/ValidationError';

import {
    ExpenseType,
    ExpenseEditHistoryType,
    CreateExpenseFormDataType,
    ExpendeCreatorUpdaterType,
} from '../../Types/expenses';
import { DoDetailsType } from '../../Types/DOs';
import { ExpenseReducerStateType } from '../reducers/reducerDataType';
import { CustomTableLoadDataTypes } from '../../Components/Custom/CustomTable/interfaces';
// eslint-disable-next-line max-len
import { TotalExpenseFormDataType } from '../../Components/Home/HomePageComponentItems/TotalExpense/interfaces';

type DispatchType = { type: string; payload: Partial<ExpenseReducerStateType> };

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
                    creatorID: expense.creator.id,
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
                initiateToast({
                    type: 'error',
                    message: error.message.toString(),
                });
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

            initiateToast({
                type: 'success',
                message: 'Expense added successfully',
            });
        } catch (error) {
            if (error instanceof Error) {
                initiateToast({
                    type: 'error',
                    message: error.message.toString(),
                });
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

        initiateToast({
            type: 'success',
            message: 'Expense deleted successfully',
        });
    } catch (error) {
        if (error instanceof Error) {
            initiateToast({
                type: 'error',
                message: error.message.toString(),
            });
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

            initiateToast({ type: 'success', message: 'Expense edited successfully' });
        } catch (error) {
            if (error instanceof Error) {
                initiateToast({
                    type: 'error',
                    message: error.message.toString(),
                });
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
                throw new ValidationError('Can not fetch total expense-cost');
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
                initiateToast({
                    type: 'error',
                    message: error.message.toString(),
                });
            }
        }
    };

export const getSingleExpense = (id: number) => async (dispatch: Dispatch<DispatchType>) => {
    try {
        const { path, method } = expenseAPIs.GET_SINGLE_EXPENSE;
        const { UNAUTHENTICATED, INTERNAL_SERVER_ERROR } = HTTP_STATUS_CODE;

        const { status, data } = await callAxiosAPI({
            url: buildURL(path, { id }),
            method: method as Method,
        });

        if (status === UNAUTHENTICATED) {
            throw new ValidationError('User does not have access to expenses');
        } else if (status === INTERNAL_SERVER_ERROR) {
            throw new ValidationError('Can not fetch expense');
        }

        const expense = data.expense;
        const expenseData: ExpenseType = {
            id: expense.id,
            title: expense.title,
            description: expense.description,
            amount: expense.amount,
            expenseAt: new Date(expense.expenseAt),
            lastUpdatedAt: new Date(expense.updatedAt),
            attachmentURL: expense.attachmentURL,
            createdAt: expense.createdAt ? new Date(expense.createdAt) : undefined,
            creator: {
                creatorID: expense.creator.id,
                firstName: expense.creator.firstName,
                lastName: expense.creator.lastName,
            },
            lastUpdater: expense.lastUpdater
                ? {
                      creatorID: expense.lastUpdater.id,
                      firstName: expense.lastUpdater.firstName,
                      lastName: expense.lastUpdater.lastName,
                  }
                : undefined,
            do: expense.do
                ? {
                      id: expense.do.id,
                      shopName: expense.do.shopName,
                      amount: expense.do.amount,
                      doDatedoDate: new Date(expense.do.doDate),
                  }
                : undefined,
            expenseEditHistoryCount: get(expense, 'expenseEditHistory.history', []).length,
        };

        dispatch({
            type: GET_SINGLE_EXPENSE,
            payload: {
                expenseDetails: expenseData,
            },
        });
    } catch (error) {
        if (error instanceof Error) {
            initiateToast({
                type: 'error',
                message: error.message.toString(),
            });
        }
    }
};

export const getExpenseEditHistory = (id: number) => async (dispatch: Dispatch<DispatchType>) => {
    try {
        const { path, method } = expenseAPIs.GET_EXPENSE_EDIT_HISTORY;
        const { UNAUTHENTICATED, UNAUTHORIZED, INTERNAL_SERVER_ERROR } = HTTP_STATUS_CODE;

        const { status, data } = await callAxiosAPI({
            url: buildURL(path, { id }),
            method: method as Method,
        });

        if (status === UNAUTHENTICATED || status === UNAUTHORIZED) {
            throw new ValidationError('User does not have access to expense edit history');
        } else if (status === INTERNAL_SERVER_ERROR) {
            throw new ValidationError('Can not fetch expense edit history');
        }

        const expenseEditHistory = data.expenseEditHistory;
        const expenseEditHistoryData: {
            history: ExpenseEditHistoryType[];
            lastUpdater: ExpendeCreatorUpdaterType | null;
        } = {
            lastUpdater: expenseEditHistory?.lastUpdater
                ? {
                      creatorID: expenseEditHistory.lastUpdater.id,
                      firstName: expenseEditHistory.lastUpdater.firstName,
                      lastName: expenseEditHistory.lastUpdater.lastName,
                  }
                : null,
            history: expenseEditHistory?.history
                ? expenseEditHistory.history.map((item: any) => ({
                      task_type: item.task_type,
                      task_at: new Date(item.task_at),
                      field: item.field,
                      new_value: `${item.new_value ?? ''}`.trim(),
                      old_value: `${item.old_value ?? ''}`.trim(),
                      updater: {
                          creatorID: item.updater.id,
                          firstName: item.updater.firstName,
                          lastName: item.updater.lastName,
                      },
                  }))
                : [],
        };

        dispatch({
            type: GET_EXPENSE_EDIT_HISTORY,
            payload: {
                expenseEditHistory: expenseEditHistoryData,
            },
        });
    } catch (error) {
        if (error instanceof Error) {
            initiateToast({
                type: 'error',
                message: error.message.toString(),
            });
        }
    }
};

export const getDoDetailsForExpense = (id: number) => async (dispatch: Dispatch<DispatchType>) => {
    try {
        const { path, method } = expenseAPIs.GET_EXPENSE_DO_DETAILS;
        const { UNAUTHENTICATED, UNAUTHORIZED, INTERNAL_SERVER_ERROR } = HTTP_STATUS_CODE;

        const { status, data } = await callAxiosAPI({
            url: buildURL(path, { id }),
            method: method as Method,
        });

        if (status === UNAUTHENTICATED || status === UNAUTHORIZED) {
            throw new ValidationError('User does not have access to expense do');
        } else if (status === INTERNAL_SERVER_ERROR) {
            throw new ValidationError('Can not fetch expense do');
        }

        const expendeDoDetails = data.expendeDoDetails;
        const expendeDoDetailsData: DoDetailsType | null = expendeDoDetails
            ? {
                  id: expendeDoDetails.id,
                  shopName: expendeDoDetails.shopName,
                  shopAddress: expendeDoDetails.shopAddress,
                  doItem: expendeDoDetails.doItem,
                  description: expendeDoDetails.description,
                  amount: expendeDoDetails.amount,
                  doDate: expendeDoDetails.doDate,
                  doEditHistoryCount: get(expendeDoDetails, 'doEditHistoryCount', 0),
                  imageURL: expendeDoDetails.imageURL,
                  createdAt: expendeDoDetails.createdAt,
                  updatedAt: expendeDoDetails.updatedAt,
                  lastUpdater: expendeDoDetails.lastUpdater ?? null,
                  expenses: get(expendeDoDetails, 'expenses', []).map(
                      ({ id, amount, title, expenseAt }: any) => ({
                          id,
                          amount,
                          title,
                          expenseAt,
                      })
                  ),
                  otherExpenseCount: expendeDoDetails.otherExpenseCount ?? undefined,
              }
            : null;

        dispatch({
            type: GET_DO_DETAILS_FOR_EXPENSE,
            payload: {
                expenseDoDetails: expendeDoDetailsData,
            },
        });
    } catch (error) {
        if (error instanceof Error) {
            initiateToast({
                type: 'error',
                message: error.message.toString(),
            });
        }
    }
};
