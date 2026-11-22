/* eslint-disable indent */
import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import { TextStyle } from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Link from '@tiptap/extension-link';
import { Extension } from '@tiptap/core';

import {
    Box,
    IconButton,
    Tooltip,
    Menu,
    MenuItem,
    Popover,
    TextField,
    Button,
    Typography,
    Divider,
    FormHelperText,
    MenuList,
    ListItemIcon,
    ListItemText,
} from '@mui/material';

import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import StrikethroughSIcon from '@mui/icons-material/StrikethroughS';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import FormatSizeIcon from '@mui/icons-material/FormatSize';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import ListIcon from '@mui/icons-material/List';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import CodeIcon from '@mui/icons-material/Code';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

import CustomPopover from '../CustomPopover';
import { CustomRichTextEditorProps } from './interfaces';
import { PRESET_COLORS, DEFAULT_MIN_HEIGHT, HEADING_LEVELS } from './constants';
import styles from './styles.module.css';

const ACTIVE_TOOLBAR_COLOR = '#158901';

const CustomRichTextEditor: React.FC<CustomRichTextEditorProps> = ({
    value,
    onChange,
    placeholder,
    error = false,
    helperText,
    minHeight = DEFAULT_MIN_HEIGHT,
    disabled = false,
    className,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const linkButtonRef = useRef<HTMLButtonElement>(null);
    const openLinkModalRef = useRef<() => void>(() => {});

    const [, setTick] = useState<number>(0);
    const [isFocused, setIsFocused] = useState<boolean>(false);

    const [headingAnchorEl, setHeadingAnchorEl] = useState<HTMLElement | null>(null);
    const [colorAnchorEl, setColorAnchorEl] = useState<HTMLElement | null>(null);
    const [listAnchorEl, setListAnchorEl] = useState<HTMLElement | null>(null);
    const [linkAnchorEl, setLinkAnchorEl] = useState<HTMLElement | null>(null);

    const [linkText, setLinkText] = useState<string>('');
    const [linkUrl, setLinkUrl] = useState<string>('');

    const LinkShortcutExtension = useMemo(() => {
        return Extension.create({
            name: 'customLinkShortcut',
            addKeyboardShortcuts() {
                return {
                    'Mod-k': () => {
                        openLinkModalRef.current();
                        return true;
                    },
                };
            },
        });
    }, []);

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3],
                },
            }),
            Underline,
            TextStyle,
            Color,
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    rel: 'noopener noreferrer',
                    target: '_blank',
                },
            }),
            LinkShortcutExtension,
        ],
        content: value || '',
        editable: !disabled,
        onUpdate: ({ editor: currentEditor }) => {
            const html = currentEditor.getHTML();
            onChange(html);
        },
        onSelectionUpdate: () => {
            setTick((t) => t + 1);
        },
        onTransaction: () => {
            setTick((t) => t + 1);
        },
        onFocus: () => setIsFocused(true),
        onBlur: () => setIsFocused(false),
    });

    const handleOpenLinkModal = (anchor?: HTMLElement | null) => {
        if (!editor) {
            return;
        }

        const { from, to } = editor.state.selection;
        const selectedText = editor.state.doc.textBetween(from, to, ' ');
        const existingUrl = (editor.getAttributes('link').href as string) || '';

        setLinkText(selectedText || '');
        setLinkUrl(existingUrl || '');
        setLinkAnchorEl(anchor || linkButtonRef.current || containerRef.current);
    };

    openLinkModalRef.current = () => {
        handleOpenLinkModal();
    };

    const handleSaveLink = () => {
        if (!editor) {
            return;
        }

        const trimmedUrl = linkUrl.trim();

        if (!trimmedUrl) {
            editor.chain().focus().unsetLink().run();
            setLinkAnchorEl(null);
            return;
        }

        const formattedUrl = trimmedUrl.match(/^https?:\/\//i)
            ? trimmedUrl
            : `https://${trimmedUrl}`;
        const { from, to } = editor.state.selection;
        const selectedText = editor.state.doc.textBetween(from, to, ' ');

        if (linkText && linkText !== selectedText) {
            editor
                .chain()
                .focus()
                .insertContent({
                    type: 'text',
                    text: linkText,
                    marks: [{ type: 'link', attrs: { href: formattedUrl } }],
                })
                .run();
        } else {
            editor.chain().focus().extendMarkRange('link').setLink({ href: formattedUrl }).run();
        }

        setLinkAnchorEl(null);
    };

    const handleRemoveLink = () => {
        if (!editor) return;
        editor.chain().focus().unsetLink().run();
        setLinkAnchorEl(null);
    };

    useEffect(() => {
        if (!editor) {
            return;
        }

        if (value === '' && editor.isEmpty) {
            return;
        }

        const currentHTML = editor.getHTML();

        if (value !== currentHTML) {
            editor.commands.setContent(value || '');
        }
    }, [value, editor]);

    useEffect(() => {
        if (!editor) {
            return;
        }

        editor.setEditable(!disabled);
    }, [disabled, editor]);

    if (!editor) {
        return null;
    }

    const containerClasses = [
        styles.editorContainer,
        isFocused ? styles.focused : '',
        error ? styles.error : '',
        disabled ? styles.disabled : '',
        className || '',
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <Box sx={{ width: '100%' }}>
            <div ref={containerRef} className={containerClasses}>
                {/* Editor Toolbar */}
                <div className={styles.toolbarContainer}>
                    {/* 1. Text Styles: Bold, Italic, Underline, Strikethrough */}
                    <Tooltip title="Bold (Ctrl+B)">
                        <span>
                            <IconButton
                                size="small"
                                onClick={() => editor.chain().focus().toggleBold().run()}
                                sx={{
                                    color: editor.isActive('bold')
                                        ? ACTIVE_TOOLBAR_COLOR
                                        : 'inherit',
                                }}
                                disabled={disabled}
                            >
                                <FormatBoldIcon fontSize="small" />
                            </IconButton>
                        </span>
                    </Tooltip>
                    <Tooltip title="Italic (Ctrl+I)">
                        <span>
                            <IconButton
                                size="small"
                                onClick={() => editor.chain().focus().toggleItalic().run()}
                                sx={{
                                    color: editor.isActive('italic')
                                        ? ACTIVE_TOOLBAR_COLOR
                                        : 'inherit',
                                }}
                                disabled={disabled}
                            >
                                <FormatItalicIcon fontSize="small" />
                            </IconButton>
                        </span>
                    </Tooltip>

                    <Tooltip title="Underline (Ctrl+U)">
                        <span>
                            <IconButton
                                size="small"
                                onClick={() => editor.chain().focus().toggleUnderline().run()}
                                sx={{
                                    color: editor.isActive('underline')
                                        ? ACTIVE_TOOLBAR_COLOR
                                        : 'inherit',
                                }}
                                disabled={disabled}
                            >
                                <FormatUnderlinedIcon fontSize="small" />
                            </IconButton>
                        </span>
                    </Tooltip>

                    <Tooltip title="Strikethrough (Ctrl+Shift+S)">
                        <span>
                            <IconButton
                                size="small"
                                onClick={() => editor.chain().focus().toggleStrike().run()}
                                sx={{
                                    color: editor.isActive('strike')
                                        ? ACTIVE_TOOLBAR_COLOR
                                        : 'inherit',
                                }}
                                disabled={disabled}
                            >
                                <StrikethroughSIcon fontSize="small" />
                            </IconButton>
                        </span>
                    </Tooltip>

                    <div className={styles.toolbarDivider} />

                    {/* 2. Text Color */}
                    <Tooltip title="Text Color">
                        <span>
                            <IconButton
                                size="small"
                                onClick={(e) => setColorAnchorEl(e.currentTarget)}
                                sx={{
                                    color: editor.getAttributes('textStyle')?.color
                                        ? ACTIVE_TOOLBAR_COLOR
                                        : 'inherit',
                                }}
                                disabled={disabled}
                            >
                                <ColorLensIcon fontSize="small" />
                            </IconButton>
                        </span>
                    </Tooltip>

                    {/* 3. Headings Dropdown */}
                    <Tooltip title="Headings">
                        <span>
                            <IconButton
                                size="small"
                                onClick={(e) => setHeadingAnchorEl(e.currentTarget)}
                                sx={{
                                    color:
                                        editor.isActive('heading', { level: 1 }) ||
                                        editor.isActive('heading', { level: 2 }) ||
                                        editor.isActive('heading', { level: 3 })
                                            ? ACTIVE_TOOLBAR_COLOR
                                            : 'inherit',
                                }}
                                disabled={disabled}
                            >
                                <FormatSizeIcon fontSize="small" />
                            </IconButton>
                        </span>
                    </Tooltip>

                    <div className={styles.toolbarDivider} />

                    {/* 4. Lists Dropdown */}
                    <Tooltip title="Lists">
                        <span>
                            <IconButton
                                size="small"
                                onClick={(e) => setListAnchorEl(e.currentTarget)}
                                sx={{
                                    color:
                                        editor.isActive('bulletList') ||
                                        editor.isActive('orderedList')
                                            ? ACTIVE_TOOLBAR_COLOR
                                            : 'inherit',
                                }}
                                disabled={disabled}
                            >
                                <ListIcon fontSize="small" />
                                <ExpandMoreIcon fontSize="inherit" sx={{ ml: -0.5 }} />
                            </IconButton>
                        </span>
                    </Tooltip>

                    {/* 5. Links */}
                    <Tooltip title="Insert / Edit Link (Ctrl+K)">
                        <span>
                            <IconButton
                                ref={linkButtonRef}
                                size="small"
                                onClick={(e) => handleOpenLinkModal(e.currentTarget)}
                                sx={{
                                    color: editor.isActive('link')
                                        ? ACTIVE_TOOLBAR_COLOR
                                        : 'inherit',
                                }}
                                disabled={disabled}
                            >
                                <InsertLinkIcon fontSize="small" />
                            </IconButton>
                        </span>
                    </Tooltip>

                    <div className={styles.toolbarDivider} />

                    {/* 6. Codeblock & Quotation */}
                    <Tooltip title="Code Block (Ctrl+Alt+C)">
                        <span>
                            <IconButton
                                size="small"
                                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                                sx={{
                                    color: editor.isActive('codeBlock')
                                        ? ACTIVE_TOOLBAR_COLOR
                                        : 'inherit',
                                }}
                                disabled={disabled}
                            >
                                <CodeIcon fontSize="small" />
                            </IconButton>
                        </span>
                    </Tooltip>

                    <Tooltip title="Blockquote (Ctrl+Shift+B)">
                        <span>
                            <IconButton
                                size="small"
                                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                                sx={{
                                    color: editor.isActive('blockquote')
                                        ? ACTIVE_TOOLBAR_COLOR
                                        : 'inherit',
                                }}
                                disabled={disabled}
                            >
                                <FormatQuoteIcon fontSize="small" />
                            </IconButton>
                        </span>
                    </Tooltip>

                    {/* Reserved structural room to add an Image upload button later */}
                </div>

                {/* Editor Content Area */}
                <div
                    className={styles.editorContent}
                    style={{ minHeight }}
                    onClick={() => editor.chain().focus().run()}
                >
                    <EditorContent editor={editor} />
                </div>
            </div>

            {/* Error Helper Text */}
            {helperText && (
                <FormHelperText error={error} sx={{ mx: 1.5, mt: 0.5 }}>
                    {helperText}
                </FormHelperText>
            )}

            {/* Color Palette Popover */}
            <Popover
                open={Boolean(colorAnchorEl)}
                anchorEl={colorAnchorEl}
                onClose={() => setColorAnchorEl(null)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            >
                <Box
                    sx={{ p: 1.5, display: 'flex', flexDirection: 'column', gap: 1.5, width: 220 }}
                >
                    <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                        Preset Colors
                    </Typography>
                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 1 }}>
                        {PRESET_COLORS.map((color) => (
                            <Box
                                key={color}
                                onClick={() => {
                                    editor.chain().focus().setColor(color).run();
                                    setColorAnchorEl(null);
                                }}
                                sx={{
                                    width: 24,
                                    height: 24,
                                    borderRadius: '4px',
                                    backgroundColor: color,
                                    cursor: 'pointer',
                                    border: '1px solid #ccc',
                                    '&:hover': {
                                        transform: 'scale(1.15)',
                                        borderColor: '#222',
                                    },
                                    transition: 'transform 0.1s ease',
                                }}
                            />
                        ))}
                    </Box>
                    <Divider />
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Typography
                            variant="caption"
                            sx={{ fontWeight: 600, color: 'text.secondary' }}
                        >
                            Custom Color:
                        </Typography>
                        <input
                            type="color"
                            value={editor.getAttributes('textStyle').color || '#000000'}
                            onChange={(e) => {
                                editor.chain().focus().setColor(e.target.value).run();
                            }}
                            style={{
                                cursor: 'pointer',
                                width: 34,
                                height: 28,
                                border: 'none',
                                borderRadius: 4,
                                padding: 0,
                                background: 'none',
                            }}
                        />
                    </Box>
                    <Divider />
                    <Button
                        size="small"
                        variant="text"
                        color="inherit"
                        onClick={() => {
                            editor.chain().focus().unsetColor().run();
                            setColorAnchorEl(null);
                        }}
                        fullWidth
                    >
                        Reset Color
                    </Button>
                </Box>
            </Popover>

            {/* Headings Menu */}
            <Menu
                anchorEl={headingAnchorEl}
                open={Boolean(headingAnchorEl)}
                onClose={() => setHeadingAnchorEl(null)}
            >
                {HEADING_LEVELS.map(({ label, level }) => {
                    const isSelected =
                        level === 0
                            ? editor.isActive('paragraph')
                            : editor.isActive('heading', { level: level as 1 | 2 | 3 });

                    return (
                        <MenuItem
                            key={level}
                            selected={isSelected}
                            sx={{
                                ...(isSelected && {
                                    color: ACTIVE_TOOLBAR_COLOR,
                                }),
                            }}
                            onClick={() => {
                                if (level === 0) {
                                    editor.chain().focus().setParagraph().run();
                                } else {
                                    editor
                                        .chain()
                                        .focus()
                                        .toggleHeading({ level: level as 1 | 2 | 3 })
                                        .run();
                                }
                                setHeadingAnchorEl(null);
                            }}
                        >
                            <Typography
                                variant={
                                    level === 1
                                        ? 'h6'
                                        : level === 2
                                          ? 'subtitle1'
                                          : level === 3
                                            ? 'subtitle2'
                                            : 'body2'
                                }
                                sx={{
                                    fontWeight: level > 0 ? 600 : 400,
                                    fontSize:
                                        level === 1 ? '1.15rem' : level === 2 ? '1rem' : '0.9rem',
                                    color: isSelected ? ACTIVE_TOOLBAR_COLOR : 'inherit',
                                }}
                            >
                                {label}
                            </Typography>
                        </MenuItem>
                    );
                })}
            </Menu>

            {/* Lists CustomPopover */}
            <CustomPopover
                id="rich-text-list-popover"
                anchorEl={listAnchorEl}
                onClose={() => setListAnchorEl(null)}
                placement="bottom"
            >
                <MenuList dense sx={{ minWidth: 160, py: 0.5 }}>
                    <MenuItem
                        selected={editor.isActive('bulletList')}
                        sx={{
                            ...(editor.isActive('bulletList') && {
                                color: ACTIVE_TOOLBAR_COLOR,
                            }),
                        }}
                        onClick={() => {
                            editor.chain().focus().toggleBulletList().run();
                            setListAnchorEl(null);
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 32,
                                color: editor.isActive('bulletList')
                                    ? ACTIVE_TOOLBAR_COLOR
                                    : 'inherit',
                            }}
                        >
                            <ListIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Bullet List" />
                    </MenuItem>
                    <MenuItem
                        selected={editor.isActive('orderedList')}
                        sx={{
                            ...(editor.isActive('orderedList') && {
                                color: ACTIVE_TOOLBAR_COLOR,
                            }),
                        }}
                        onClick={() => {
                            editor.chain().focus().toggleOrderedList().run();
                            setListAnchorEl(null);
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 32,
                                color: editor.isActive('orderedList')
                                    ? ACTIVE_TOOLBAR_COLOR
                                    : 'inherit',
                            }}
                        >
                            <FormatListNumberedIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Numbered List" />
                    </MenuItem>
                </MenuList>
            </CustomPopover>

            {/* Links CustomPopover */}
            <CustomPopover
                id="rich-text-link-popover"
                title={editor.isActive('link') ? 'Edit Link' : 'Insert Link'}
                anchorEl={linkAnchorEl}
                onClose={() => setLinkAnchorEl(null)}
                placement="bottom"
            >
                <Box
                    component="form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSaveLink();
                    }}
                    sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1.5, minWidth: 260 }}
                >
                    <TextField
                        label="Display Text"
                        size="small"
                        value={linkText}
                        onChange={(e) => setLinkText(e.target.value)}
                        placeholder="Link label"
                        fullWidth
                    />
                    <TextField
                        label="URL"
                        size="small"
                        value={linkUrl}
                        onChange={(e) => setLinkUrl(e.target.value)}
                        placeholder="https://example.com"
                        fullWidth
                        autoFocus
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 0.5 }}>
                        {editor.isActive('link') && (
                            <Button
                                size="small"
                                color="error"
                                variant="outlined"
                                onClick={handleRemoveLink}
                            >
                                Remove
                            </Button>
                        )}
                        <Button
                            size="small"
                            variant="contained"
                            type="submit"
                            disabled={!linkUrl.trim()}
                        >
                            Save
                        </Button>
                    </Box>
                </Box>
            </CustomPopover>
        </Box>
    );
};

export default CustomRichTextEditor;
