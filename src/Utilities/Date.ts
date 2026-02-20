import { FormatDateType } from '../Types/Date';

const getDayMonthInTwoDigit = (data: number) => {
    if (data > 9) {
        return `${data}`;
    }

    return `0${data}`;
};

export const formatDate = (date: string | Date, format: FormatDateType) => {
    const newDate = typeof date === 'string' ? new Date(date) : date;

    const day = newDate.getDay();
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();
    const monthName = newDate.toLocaleString('default', { month: 'long' });

    if (format === 'MM-DD-YYYY') {
        return `${getDayMonthInTwoDigit(month)}-${getDayMonthInTwoDigit(day)}-${year}`;
    }

    if (format === 'DD-MM-YYYY') {
        return `${getDayMonthInTwoDigit(day)}-${getDayMonthInTwoDigit(month)}-${year}`;
    }

    if (format === 'D,M,Y') {
        return `${day} ${monthName}, ${year}`;
    }

    if (format === 'M,D,Y') {
        return `${monthName.substring(0, 3)} ${day}, ${year}`;
    }

    return newDate.toISOString();
};
