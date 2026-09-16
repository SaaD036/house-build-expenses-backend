import React, { ReactNode } from 'react';
import { ShimmerCategoryItems, ShimmerSectionHeader } from 'shimmer-effects-react';

import styles from './styles.module.css';

const ShimmerLoader = (props: {
    itemCount?: number;
    loading: boolean;
    hasTitle?: boolean;
    hasText?: boolean;
    hasButton?: boolean;
    hasImage?: boolean;
    children: ReactNode;
    className?: string;
}) => {
    const { itemCount, loading, hasTitle, hasText, hasButton, hasImage, children, className } =
        props;

    return (
        <ShimmerCategoryItems
            mode="custom"
            items={itemCount ?? 1}
            imageRounded={60}
            hasTitle={!!hasTitle}
            hasText={!!hasText}
            hasButton={!!hasButton}
            hasImage={!!hasImage}
            from="#158901"
            via="#9ef48fff"
            to="#158901"
            loading={loading}
            className={`${className ?? ''} ${styles.loaderShimmer}`}
        >
            <>{children}</>
        </ShimmerCategoryItems>
    );
};

export const ShimmerCardLoader = (props: {
    line: number;
    hasTitle?: boolean;
    loading: boolean;
    children: ReactNode;
}) => {
    const { line, hasTitle, loading, children } = props;

    return (
        <ShimmerSectionHeader
            mode="custom"
            titleHeight={hasTitle ? 20 : 0}
            subtitleLine={line}
            subtitleHeight={10}
            from="#158901"
            via="#9ef48fff"
            to="#158901"
            loading={loading}
        >
            <>{children}</>
        </ShimmerSectionHeader>
    );
};

export default ShimmerLoader;
