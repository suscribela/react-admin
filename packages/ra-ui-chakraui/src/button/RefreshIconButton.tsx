import * as React from 'react';
import { useCallback, ReactElement } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import Tooltip from '@material-ui/core/Tooltip';
import NavigationRefresh from '@material-ui/icons/Refresh';
import { refreshView, useTranslate } from 'ra-core';
import {
    Icon,
    createIcon,
    IconButton,
    IconButtonProps,
} from '@chakra-ui/react';

const RefreshIcon = createIcon({
    displayName: 'refreshIcon',
    viewBox: '0 0 24 24',
    path: (
        <path
            fill="currentColor"
            d="M13.5 2c-5.621 0-10.211 4.443-10.475 10h-3.025l5 6.625 5-6.625h-2.975c.257-3.351 3.06-6 6.475-6 3.584 0 6.5 2.916 6.5 6.5s-2.916 6.5-6.5 6.5c-1.863 0-3.542-.793-4.728-2.053l-2.427 3.216c1.877 1.754 4.389 2.837 7.155 2.837 5.79 0 10.5-4.71 10.5-10.5s-4.71-10.5-10.5-10.5z"
        />
    ),
});

const RefreshIconButton = (props: RefreshIconButtonProps) => {
    const {
        label = 'ra.action.refresh',
        icon = defaultIcon,
        onClick,
        className,
        ...rest
    } = props;
    const dispatch = useDispatch();
    const translate = useTranslate();
    const handleClick = useCallback(
        event => {
            event.preventDefault();
            dispatch(refreshView());
            if (typeof onClick === 'function') {
                onClick(event);
            }
        },
        [dispatch, onClick]
    );

    return (
        <IconButton icon={<RefreshIcon />} onClick={handleClick} {...rest} />
    );
};

const defaultIcon = <NavigationRefresh />;

interface Props {
    className?: string;
    icon?: ReactElement;
    label?: string;
    onClick?: (e: MouseEvent) => void;
}

export type RefreshIconButtonProps = Props & IconButtonProps;

RefreshIconButton.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    icon: PropTypes.element,
};

export default RefreshIconButton;
