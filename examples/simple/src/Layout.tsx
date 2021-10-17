import * as React from 'react';
import { forwardRef, memo } from 'react';
import { Layout, AppBar, UserMenu, useLocale, useSetLocale } from 'react-admin';
// import { MenuItem, ListItemIcon } from '@material-ui/core';
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuIcon,
    MenuCommand,
    MenuDivider,
} from '@chakra-ui/react';
// import { makeStyles } from '@material-ui/core/styles';
import Language from '@material-ui/icons/Language';
import { MdMenu } from 'react-icons/md';

// const useStyles = makeStyles(theme => ({
//     menuItem: {
//         color: theme.palette.text.secondary,
//     },
//     icon: { minWidth: theme.spacing(5) },
// }));

const SwitchLanguage = forwardRef((props, ref) => {
    const locale = useLocale();
    const setLocale = useSetLocale();
    return (
        <div
            // ref={ref}
            // className={classes.menuItem}
            onClick={() => {
                setLocale(locale === 'en' ? 'fr' : 'en');
                // props.onClick();
            }}
        >
            <MenuIcon>
                <MdMenu />
            </MenuIcon>
            Switch Language
        </div>
    );
});

const MyUserMenu = props => (
    <UserMenu {...props}>
        <SwitchLanguage />
    </UserMenu>
);

const MyAppBar = memo(props => <AppBar {...props} userMenu={<MyUserMenu />} />);

export default props => <Layout {...props} appBar={MyAppBar} />;
