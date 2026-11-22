import React from 'react';
import { useField } from 'formik';

import { Box, Typography } from '@mui/material';

import CustomRichTextEditor from '../../../CustomRichTextEditor';
import { CustomRichTextEditorProps } from '../../../CustomRichTextEditor/interfaces';

export interface FormRichTextEditorProps extends Omit<
    CustomRichTextEditorProps,
    'value' | 'onChange' | 'error' | 'helperText'
> {
    id: string;
    name: string;
    label?: string;
}

const FormRichTextEditor: React.FC<FormRichTextEditorProps> = ({
    id,
    name,
    label,
    placeholder,
    minHeight,
    disabled,
    ...rest
}) => {
    const [field, meta, helpers] = useField(name);

    const isError = Boolean(meta.touched && meta.error);
    const errorMessage = isError ? meta.error : '';

    const hasError = () => {
        if (id !== field.name) {
            return false;
        }

        return !!(meta.touched && meta.error);
    };

    const handleChange = (htmlContent: string) => {
        helpers.setValue(htmlContent);
        helpers.setTouched(true, false);
    };

    return (
        <Box sx={{ width: '100%' }}>
            {label && (
                <Typography
                    variant="body2"
                    sx={{
                        mb: 0.5,
                        fontWeight: 500,
                        color: isError ? 'error.main' : 'text.primary',
                    }}
                >
                    {label}
                </Typography>
            )}
            <CustomRichTextEditor
                value={field.value || ''}
                onChange={handleChange}
                placeholder={placeholder}
                minHeight={minHeight}
                disabled={disabled}
                error={isError}
                helperText={errorMessage}
                {...rest}
            />
        </Box>
    );
};

export default FormRichTextEditor;
