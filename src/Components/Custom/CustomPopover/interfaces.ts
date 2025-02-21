export type CustomPopoverProps = {
    title: string | React.ReactNode;
    children: string | React.ReactNode;
    anchorEl: null | HTMLElement;
    onClose: () => void;
    className?: string;
    headerClassName?: string;
    bodyClassname?: string;
};

export type ConfirmationPopoverProps = {
    title?: string | React.ReactNode;
    confirmationMessage?: string | React.ReactNode;
    isDeletion?: boolean;
    anchorEl: null | HTMLElement;
    onClose: () => void;
    onCancel?: () => void;
    onYes: () => void;
};
