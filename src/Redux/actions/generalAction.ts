/* eslint-disable indent */
import { Dispatch } from 'react';

import { CURRENT_VIEW } from '../types/general';
import { CurrentViewType } from '../../Types';

export const setCurrentView =
    (currentView: CurrentViewType) => (dispatch: Dispatch<{ type: string; payload: any }>) => {
        dispatch({
            type: CURRENT_VIEW,
            payload: currentView,
        });
    };
