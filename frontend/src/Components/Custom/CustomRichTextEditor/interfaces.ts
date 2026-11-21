export interface CustomRichTextEditorProps {
    value: string;
    onChange: (html: string) => void;
    placeholder?: string;
    error?: boolean;
    helperText?: string;
    minHeight?: number | string;
    disabled?: boolean;
    className?: string;
}
