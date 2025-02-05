import * as React from 'react';
import { ReactNode } from 'react';
import PropTypes from 'prop-types';
import { shallowEqual, useSelector } from 'react-redux';
import lodashGet from 'lodash/get';
// @ts-ignore
import { makeStyles } from '@material-ui/core/styles';
import DefaultIcon from '@material-ui/icons/ViewList';
import classnames from 'classnames';
import { useGetResourceLabel, getResources, ReduxState } from 'ra-core';

import DashboardMenuItem from './DashboardMenuItem';
import MenuItemLink from './MenuItemLink';
import { Box } from '@material-ui/core';

export const MENU_WIDTH = 240;
export const CLOSED_MENU_WIDTH = 55;

// const useStyles = makeStyles(
//     theme => ({
//         main: {
//             display: 'flex',
//             flexDirection: 'column',
//             justifyContent: 'flex-start',
//             marginTop: '0.5em',
//             marginBottom: '1em',
//             [theme.breakpoints.only('xs')]: {
//                 marginTop: 0,
//             },
//             transition: theme.transitions.create('width', {
//                 easing: theme.transitions.easing.sharp,
//                 duration: theme.transitions.duration.leavingScreen,
//             }),
//         },
//         open: {
//             width: lodashGet(theme, 'menu.width', MENU_WIDTH),
//         },
//         closed: {
//             width: lodashGet(theme, 'menu.closedWidth', CLOSED_MENU_WIDTH),
//         },
//     }),
//     { name: 'RaMenu' }
// );

const Menu = (props: MenuProps) => {
    const {
        classes: classesOverride,
        className,
        dense,
        hasDashboard,
        onMenuClick,
        logout,
        ...rest
    } = props;
    // const classes = useStyles(props);
    const open = useSelector((state: ReduxState) => state.admin.ui.sidebarOpen);
    const resources = useSelector(getResources, shallowEqual) as Array<any>;
    const getResourceLabel = useGetResourceLabel();
    const M_WIDTH = `${open ? MENU_WIDTH : CLOSED_MENU_WIDTH}px`;
    return (
        <Box
            // className={classnames(
            //     // classes.main,
            //     // {
            //     //     [classes.open]: open,
            //     //     [classes.closed]: !open,
            //     // },
            //     // className
            // )}
            // display={open ? "flex" : "none"}
            flexDirection="column"
            justifyContent="flex-start"
            marginTop="0.5em" //TODO: marginTop: 0 on xs
            marginBottom="1em"
            width={M_WIDTH}
            {...rest}
        >
            {hasDashboard && <DashboardMenuItem dense={dense} />}
            {resources
                .filter(r => r.hasList)
                .map(resource => (
                    <MenuItemLink
                        key={resource.name}
                        to={{
                            pathname: `/${resource.name}`,
                            state: { _scrollToTop: true },
                        }}
                        primaryText={getResourceLabel(resource.name, 2)}
                        leftIcon={
                            resource.icon ? <resource.icon /> : <DefaultIcon />
                        }
                        dense={dense}
                    />
                ))}
        </Box>
    );
};

export interface MenuProps {
    classes?: object;
    className?: string;
    dense?: boolean;
    hasDashboard?: boolean;
    /**
     * @deprecated
     */
    logout?: ReactNode;
    /**
     * @deprecated
     */
    onMenuClick?: () => void;
}

Menu.propTypes = {
    classes: PropTypes.object,
    className: PropTypes.string,
    dense: PropTypes.bool,
    hasDashboard: PropTypes.bool,
    logout: PropTypes.element,
    onMenuClick: PropTypes.func,
};

Menu.defaultProps = {
    onMenuClick: () => null,
};

export default Menu;
