import * as React from 'react';
import { useCallback, FunctionComponent, ReactElement } from 'react';
import PropTypes from 'prop-types';
import {
    Menu,
    MenuItem,
    MenuList,
    MenuIcon,
    MenuProps,
    MenuItemProps,
    MenuListProps,
} from '@chakra-ui/react';

import ExitIcon from '@material-ui/icons/PowerSettingsNew';
import { useTranslate, useLogout } from 'ra-core';

interface Props {
    // className?: string;
    redirectTo?: string;
    icon?: ReactElement;
}

// const useStyles = makeStyles(
//     (theme: Theme) => ({
//         menuItem: {
//             color: theme.palette.text.secondary,
//         },
//         icon: { minWidth: theme.spacing(5) },
//     }),
//     { name: 'RaLogout' }
// );

/**
 * Logout button component, to be passed to the Admin component
 *
 * Used for the Logout Menu item in the sidebar
 */
const LogoutWithRef: FunctionComponent<
    Props & MenuItemProps // HACK: https://github.com/mui-org/material-ui/issues/16245
> = React.forwardRef(function Logout(props, ref) {
    const { className, redirectTo, icon, ...rest } = props;
    // const classes = useStyles(props);

    const translate = useTranslate();
    const logout = useLogout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleClick = useCallback(() => logout(null, redirectTo, false), [
        redirectTo,
        logout,
    ]);
    return (
        <MenuItem
            // className={classnames('logout', classes.menuItem, className)}
            onClick={handleClick}
            // ref={ref}
            // component={['span', 'li']}
            {...rest}
            color="black"
        >
            <MenuIcon
            // className={classes.icon}
            >
                {icon ? icon : <ExitIcon />}
            </MenuIcon>
            {translate('ra.auth.logout')}
        </MenuItem>
    );
});

LogoutWithRef.propTypes = {
    className: PropTypes.string,
    redirectTo: PropTypes.string,
    icon: PropTypes.element,
};

export default LogoutWithRef;
