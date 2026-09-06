import React from 'react';

import { ContentCopy as CopyIcon } from '@mui/icons-material';

import CustomTooltip from '../../CustomTooltip';

import { initiateToast } from '../../CustomToast';

const CustomCopyIcon = ({
    textToCopy,
    toastMessage,
}: {
    textToCopy: string;
    toastMessage?: string;
}) => {
    return (
        <CustomTooltip title="Click here to copy">
            <div
                onClick={async () => {
                    await navigator.clipboard.writeText(textToCopy);

                    if (toastMessage) {
                        initiateToast({
                            type: 'success',
                            message: toastMessage,
                        });
                    }
                }}
            >
                <CopyIcon sx={{ cursor: 'pointer', fontSize: '14px' }} className="icon" />
            </div>
        </CustomTooltip>
    );
};

export default CustomCopyIcon;
