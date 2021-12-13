import * as React from 'react';
import { useSelector } from 'react-redux';
import { Spinner } from '@chakra-ui/react';
import { ReduxState, useRefreshWhenVisible } from 'ra-core';
import RefreshIconButton from '../button/RefreshIconButton';

const LoadingIndicator = (props: LoadingIndicatorProps) => {
    const { color, colorScheme, width = '40px' } = props;
    useRefreshWhenVisible();
    const loading = useSelector<ReduxState>(state => state.admin.loading > 0);
    return loading ? (
        <Spinner size="xl" minW={width} minH={width} color={color} />
    ) : (
        <RefreshIconButton
            aria-label="Refresh page"
            size="xl"
            minW={width}
            minH={width}
            colorScheme={colorScheme}
        />
    );
};

interface LoadingIndicatorProps {
    color?: string;
    colorScheme?: string;
    width?: string;
}

export default LoadingIndicator;
