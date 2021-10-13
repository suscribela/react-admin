import React from 'react';
import { Icon } from '@chakra-ui/react';
import { MdBook } from 'react-icons/md';
import PostCreate from './PostCreate';
import PostEdit from './PostEdit';
import PostList from './PostList';
import PostShow from './PostShow';

//TODO: min-width: 56px, move out to theme instead of this      v
const BookIcon = props => <Icon as={MdBook} {...props} boxSize={6} />;

export default {
    list: PostList,
    create: PostCreate,
    edit: PostEdit,
    show: PostShow,
    icon: BookIcon,
};
