import * as React from 'react';
import { forwardRef, memo } from 'react';
import { Layout, AppBar, UserMenu, useLocale, useSetLocale } from 'react-admin';
import { MenuIcon, Flex } from '@chakra-ui/react';
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
        <Flex
            // ref={ref}
            // className={classes.menuItem}
            onClick={() => {
                setLocale(locale === 'en' ? 'fr' : 'en');
                // props.onClick();
            }}
            color="black" //theme.palette.text.secondary,
            alignItems="inherit"
        >
            <MenuIcon>
                <MdMenu />
            </MenuIcon>
            Switch Language
        </Flex>
    );
});

const MyUserMenu = props => (
    <UserMenu {...props}>
        <SwitchLanguage />
    </UserMenu>
);

const MyAppBar = memo(props => <AppBar {...props} userMenu={<MyUserMenu />} />);

export default props => <Layout {...props} appBar={MyAppBar} />;
