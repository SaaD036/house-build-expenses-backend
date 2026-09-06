/* eslint-disable indent */
import { UserAccountEditHistoryType } from '../../Types/Users';

export const prepareUserEditHistoryFromAPIresponse = (
    response: any
): UserAccountEditHistoryType | undefined => {
    if (!response) {
        return;
    }

    const userEditHistory: UserAccountEditHistoryType = {
        lastResetPasswordTime: response.last_reset_pass_request_time
            ? new Date(response.last_reset_pass_request_time)
            : undefined,
        history: response.history
            ? (response.history || []).map((responseHistory: any) => ({
                  title: responseHistory.title,
                  createdAt: responseHistory.created_at
                      ? new Date(responseHistory.created_at)
                      : undefined,
              }))
            : undefined,
    };

    return userEditHistory;
};
