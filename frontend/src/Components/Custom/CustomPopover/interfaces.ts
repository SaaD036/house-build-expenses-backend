export type CustomPopoverProps = {
    id: string;
    title?: string | React.ReactNode;
    children: string | React.ReactNode;
    anchorEl: null | HTMLElement;
    onClose: () => void;
    className?: string;
    headerClassName?: string;
    bodyClassname?: string;
    placement?: 'top' | 'bottom' | 'left' | 'right';
};

export type ConfirmationPopoverProps = {
    id: string;
    isDeletion?: boolean;
    onClose: () => void;
    onCancel?: () => void;
    onYes: () => void;
    anchorEl: null | HTMLElement;
    title?: string | React.ReactNode;
    placement?: 'top' | 'bottom' | 'left' | 'right';
    confirmationMessage?: string | React.ReactNode;
};
