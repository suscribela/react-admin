import * as React from 'react';
import { Heading, Text } from '@chakra-ui/react';

// const useStyles = makeStyles(theme => ({
//     root: {
//         [theme.breakpoints.up('sm')]: {
//             width: 200,
//             margin: '1em',
//         },
//         [theme.breakpoints.down('sm')]: {
//             width: 0,
//             overflowX: 'hidden',
//             margin: 0,
//         },
//     },
// }));

const Aside = () => {
    return (
        <div>
            <Heading as="h6">App Users</Heading>
            <Text>
                Eiusmod adipisicing tempor duis qui. Ullamco aliqua tempor
                incididunt aliquip aliquip qui ad minim aliqua. Aute et magna
                quis pariatur irure sunt. Aliquip velit consequat dolore ullamco
                laborum voluptate cupidatat. Proident minim reprehenderit id
                dolore elit sit occaecat ad amet tempor esse occaecat enim.
                Laborum aliqua excepteur qui ipsum in dolor et cillum est.
            </Text>
        </div>
    );
};

export default Aside;
