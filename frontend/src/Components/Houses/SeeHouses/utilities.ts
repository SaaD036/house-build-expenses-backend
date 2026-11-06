export const getNoHouseWarningText = (houseTypes: string) => {
    {
        if (houseTypes === 'your_created') {
            return {
                cardContainerTitle: 'Your Houses',
                noHouseMessage: 'Your have not created any house',
            };
        }

        if (houseTypes === 'shared') {
            return {
                cardContainerTitle: 'Shared Houses',
                noHouseMessage: 'No hause is shared with you',
            };
        }

        if (houseTypes === 'requested') {
            return {
                cardContainerTitle: 'Unapproved Houses',
                noHouseMessage: 'You have no unapproved Houses',
            };
        }

        return {
            cardContainerTitle: '',
            noHouseMessage: '',
        };
    }
};
