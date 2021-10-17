import * as React from 'react';
import { Children, cloneElement, isValidElement, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslate, useGetIdentity } from 'ra-core';
import {
    //     Tooltip,
    //     IconButton,
    //     // Menu,
    //     // Button,
    //     Avatar,
    PopoverOrigin,
} from '@material-ui/core';
import {
    Menu,
    Button,
    MenuItem,
    Avatar,
    Flex,
    Tooltip,
    MenuButton,
    MenuList,
} from '@chakra-ui/react';
import { MdAccountCircle as AccountCircle } from 'react-icons/md';

const defaultIcon = <AccountCircle />;

// const useStyles = makeStyles(
//     theme => ({
//         user: {},
//         userButton: {
//             textTransform: 'none',
//         },
//         avatar: {
//             width: theme.spacing(4),
//             height: theme.spacing(4),
//         },
//     }),
//     { name: 'RaUserMenu' }
// );

const AnchorOrigin: PopoverOrigin = {
    vertical: 'bottom',
    horizontal: 'right',
};

const TransformOrigin: PopoverOrigin = {
    vertical: 'top',
    horizontal: 'right',
};
const CustomAvatar = ({ label, onClick, identity, icon, ...props }) => {
    const translate = useTranslate();
    return (
        <Flex // DEFAULT AVATAR
            aria-label={label && translate(label, { _: label })}
            color="inherit"
            // startIcon={
            //     identity.avatar ? (
            //         <Avatar
            //             className={classes.avatar}
            //             src={identity.avatar}
            //             alt={identity.fullName}
            //         />
            //     ) : (
            //         icon
            //     )
            // }
            onClick={onClick}
        >
            {identity.avatar ? (
                <Avatar
                    // className={classes.avatar}
                    src={identity.avatar}
                    alt={identity.fullName}
                />
            ) : (
                icon
            )}
            {identity.fullName}
        </Flex>
    );
};
const UserMenu = (props: UserMenuProps) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const translate = useTranslate();
    const { loaded, identity } = useGetIdentity();

    const {
        children,
        label = 'ra.auth.user_menu',
        icon = defaultIcon,
        logout,
    } = props;

    if (!logout && !children) return null;
    const open = Boolean(anchorEl);

    const handleMenu = event => setAnchorEl(event.currentTarget);
    const handleClose = () => alert('closing!');

    return (
        <Menu>
            {loaded && identity?.fullName ? (
                <MenuButton>
                    <CustomAvatar
                        {...{ label, onClick: handleClose, identity, icon }}
                        onClick={handleClose}
                    />
                </MenuButton>
            ) : (
                <Flex>
                    <MenuButton
                        aria-label={label && translate(label, { _: label })}
                        aria-owns={open ? 'menu-appbar' : null}
                        aria-haspopup={true}
                        color="inherit"
                        onClick={handleMenu}
                    >
                        <Tooltip
                            title={label && translate(label, { _: label })}
                        >
                            {icon}
                        </Tooltip>
                    </MenuButton>
                </Flex>
            )}
            <MenuList
                id="menu-appbar"
                // anchorEl={anchorEl}
                // anchorOrigin={AnchorOrigin}
                // transformOrigin={TransformOrigin}
                // Make sure the menu is display under the button and not over the appbar
                // See https://material-ui.com/components/menus/#customized-menus
                // getContentAnchorEl={null}
                // open={open}
                // onClose={handleClose}
            >
                {/* {Children.map(children, menuItem =>
                    isValidElement(menuItem) ? React.createElement(children, { onClick: () => handleClose()}) : null
                )} */}
                {/* <pre>{children}</pre> */}
                {Children.map(children, child =>
                    isValidElement(child) ? (
                        <MenuItem onClick={handleClose}>{child}</MenuItem>
                    ) : null
                )}
                {logout}
            </MenuList>
        </Menu>
    );
};

UserMenu.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object,
    label: PropTypes.string,
    logout: PropTypes.element,
    icon: PropTypes.node,
};

export interface UserMenuProps {
    children?: React.ReactNode;
    // classes?: ClassesOverride<typeof useStyles>;
    label?: string;
    logout?: React.ReactNode;
    icon?: React.ReactNode;
}

export default UserMenu;
