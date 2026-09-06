import * as Yup from 'yup';

export const DISPLAY_TOTAL_EXPENSE_VALIDATOR = Yup.object({
    formDate: Yup.date(),
    toDate: Yup.date(),
});
