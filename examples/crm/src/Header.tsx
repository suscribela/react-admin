import React, { ReactElement } from 'react';
import { Link as ReactRouterLink, useRouteMatch } from 'react-router-dom';
import { UserMenu, Logout, LoadingIndicator } from 'react-admin';
import { Box, HStack, Center, Flex } from '@chakra-ui/react';

const LinkBox = ({
    children,
    to,
    ...props
}: {
    children: ReactElement | string;
    to: string;
    props?: Object;
}) => (
    <Flex
        as={ReactRouterLink}
        to={to}
        {...props}
        minH="100%"
        _hover={{ background: 'white', color: 'teal.500' }}
    >
        <Center>{children}</Center>
    </Flex>
);

const AppBar = ({
    children,
    ...props
}: {
    children: ReactElement | string;
    props?: Object;
}): ReactElement => <Box maxH="5em">{children}</Box>;

const Toolbar = ({
    children,
    ...props
}: {
    children: ReactElement | string;
    props?: Object;
}): ReactElement => (
    <Box maxH="5em" bg="tomato">
        {children}
    </Box>
);
const Typography = ({
    children,
    ...props
}: {
    children: ReactElement | string;
    props?: Object;
}): ReactElement => <div>{children}</div>;

const Header = () => {
    // const match = useRouteMatch(['/contacts', '/companies', '/deals']);
    // const currentPath = match?.path ?? '/';

    return (
        <nav>
            <AppBar>
                <Toolbar>
                    <Box flex={1} display="flex" justifyContent="space-between">
                        <Box display="flex" alignItems="center">
                            <img
                                src={
                                    'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg'
                                }
                                alt="Bosch Logo"
                            />
                            <Typography>Atomic CRM</Typography>
                        </Box>
                        <HStack minW="20em" minH="100%">
                            <LinkBox to="/">Dashboard</LinkBox>
                            <LinkBox to="/contacts">Contacts</LinkBox>
                            <LinkBox to="/companies">Companies</LinkBox>
                            <LinkBox to="/deals">Deals</LinkBox>
                        </HStack>
                        <HStack>
                            <LoadingIndicator />
                            <UserMenu logout={<Logout button />} />
                        </HStack>
                    </Box>
                </Toolbar>
            </AppBar>
        </nav>
    );
};

export default Header;
