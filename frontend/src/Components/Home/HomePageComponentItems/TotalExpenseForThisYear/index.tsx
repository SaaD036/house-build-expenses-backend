import React from 'react';
import { ShimmerTitle } from 'shimmer-effects-react';

import CardContainer from '../../../CardContainer';

import styles from './styles.module.css';

const TotalExpenseForThisYear = () => {
    const renderTitleForTotalExpense = () => {
        return <div className={styles.totalExpenseTitle}>Total Expense for this Year</div>;
    };

    return (
        <div style={{ height: '100%' }}>
            <CardContainer title={renderTitleForTotalExpense()}>
                <ShimmerTitle
                    mode="custom"
                    line={2}
                    gap={5}
                    className={styles.loaderShimmer}
                    from="#158901"
                    via="#9ef48fff"
                    to="#158901"
                    loading={false}
                >
                    <h2>
                        <b className="text">20,00,000 BDT</b>
                    </h2>
                </ShimmerTitle>
            </CardContainer>
        </div>
    );
};

export default TotalExpenseForThisYear;
