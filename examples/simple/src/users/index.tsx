import React from 'react';
import { Icon } from '@chakra-ui/react';
import { MdPeople } from 'react-icons/md';
import UserCreate from './UserCreate';
import UserEdit from './UserEdit';
import UserList from './UserList';
import UserShow from './UserShow';

//TODO: min-width: 56px (6em?), move out to theme instead of this          v
const PeopleIcon = props => <Icon as={MdPeople} {...props} boxSize={6} />;

export default {
    list: UserList,
    create: UserCreate,
    edit: UserEdit,
    show: UserShow,
    icon: PeopleIcon,
};
