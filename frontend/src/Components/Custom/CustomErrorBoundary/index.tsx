import React, { Component, ReactNode } from 'react';
import { Box, Typography } from '@mui/material';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

class CustomErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public render(): ReactNode {
        const { hasError } = this.state;
        const { fallback, children } = this.props;

        if (!hasError) {
            return children;
        }

        if (fallback) {
            return fallback;
        }

        return (
            <Box
                sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '200px',
                    p: 3,
                    borderRadius: 2,
                    backgroundColor: '#fff8f8',
                    textAlign: 'center',
                    gap: 2,
                }}
            >
                <Box sx={{ padding: '30px 40px', border: '1px solid red', borderRadius: '10px' }}>
                    <Typography variant="h6" color="error" fontWeight={600}>
                        Something went wrong
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ maxWidth: 400 }}>
                        An unexpected error occurred while loading this section. Please reload the
                        page or try again later
                    </Typography>
                </Box>
            </Box>
        );
    }
}

export default CustomErrorBoundary;
