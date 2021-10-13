import * as React from 'react';
import { ReactElement } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
    useMediaQuery,
    Drawer,
    DrawerProps,
    useDisclosure,
    Box,
} from '@chakra-ui/react';

import { setSidebarVisibility, ReduxState, useLocale } from 'ra-core';

export const DRAWER_WIDTH = 240;
export const CLOSED_DRAWER_WIDTH = 55;

const Sidebar = (props: SidebarProps) => {
    const { children, closedSize, size, ...rest } = props;
    const dispatch = useDispatch();
    const [isXSmall] = useMediaQuery('(max-width: 720px)');
    const [isSmall] = useMediaQuery('(max-width: 980px)');
    const open = useSelector<ReduxState, boolean>(
        state => state.admin.ui.sidebarOpen
    );
    useLocale(); // force redraw on locale change
    const toggleSidebar = () => dispatch(setSidebarVisibility(!open));
    // const { drawerPaper, fixed, ...classes } = useStyles({
    //     ...props,
    //     open,
    // });

    return isXSmall ? (
        <Box
            variant="temporary"
            // display={ open ? "unset" : "none"}
            // PaperProps={{
            //     className: drawerPaper,
            // }}
            // onClose={toggleSidebar}
            // classes={classes}
            {...rest}
        >
            {children}
        </Box>
    ) : isSmall ? (
        <Box
            variant="permanent"
            // display={ open ? "unset" : "none"}
            // PaperProps={{
            //     className: drawerPaper,
            // }}
            // onClose={toggleSidebar}
            // classes={classes}
            {...rest}
        >
            <div>{children}</div>
        </Box>
    ) : (
        <Box
            variant="permanent"
            // display={ open ? "unset" : "none"}
            // PaperProps={{
            //     className: drawerPaper,
            // }}
            // onClose={toggleSidebar}
            // classes={classes}
            {...rest}
        >
            <div>{children}</div>
        </Box>
    );
};

Sidebar.propTypes = {
    children: PropTypes.node.isRequired,
};

// const useStyles = makeStyles(
//     theme => ({
//         root: {
//             height: 'calc(100vh - 3em)',
//         },
//         docked: {},
//         paper: {},
//         paperAnchorLeft: {},
//         paperAnchorRight: {},
//         paperAnchorTop: {},
//         paperAnchorBottom: {},
//         paperAnchorDockedLeft: {},
//         paperAnchorDockedTop: {},
//         paperAnchorDockedRight: {},
//         paperAnchorDockedBottom: {},
//         modal: {},
//         fixed: {
//             position: 'fixed',
//             height: 'calc(100vh - 3em)',
//             overflowX: 'hidden',
//             // hide scrollbar
//             scrollbarWidth: 'none',
//             msOverflowStyle: 'none',
//             '&::-webkit-scrollbar': {
//                 display: 'none',
//             },
//         },
//         drawerPaper: {
//             position: 'relative',
//             width: (props: { open?: boolean }) =>
//                 props.open
//                     ? lodashGet(theme, 'sidebar.width', DRAWER_WIDTH)
//                     : lodashGet(
//                           theme,
//                           'sidebar.closedWidth',
//                           CLOSED_DRAWER_WIDTH
//                       ),
//             transition: theme.transitions.create('width', {
//                 easing: theme.transitions.easing.sharp,
//                 duration: theme.transitions.duration.leavingScreen,
//             }),
//             backgroundColor: 'transparent',
//             borderRight: 'none',
//             [theme.breakpoints.only('xs')]: {
//                 marginTop: 0,
//                 height: '100vh',
//                 position: 'inherit',
//                 backgroundColor: theme.palette.background.default,
//             },
//             [theme.breakpoints.up('md')]: {
//                 border: 'none',
//             },
//             zIndex: 'inherit',
//         },
//     }),
//     { name: 'RaSidebar' }
// );

export interface SidebarProps extends DrawerProps {
    children: ReactElement;
    closedSize?: number;
    // classes: ClassesOverride<typeof useStyles>;
    size?:
        | (string & {})
        | 'sm'
        | 'md'
        | 'lg'
        | 'xl'
        | '2xl'
        | 'full'
        | 'xs'
        | '3xl'
        | '4xl'
        | '5xl'
        | '6xl';
}

export default Sidebar;
