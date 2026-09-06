export type CustomTabProps = {
    tabItems: CustomTabItem[];
    selectedTab: string;
    onTabSelect: (tabName: string) => void;
};

export type CustomTabItem = {
    label: string;
    value: string;
};
