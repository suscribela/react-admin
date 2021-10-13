import React from 'react';
import { Icon } from '@chakra-ui/react';
import { MdChatBubble } from 'react-icons/md';
import CommentCreate from './CommentCreate';
import CommentEdit from './CommentEdit';
import CommentList from './CommentList';
import { ShowGuesser } from 'react-admin';

//TODO: min-width: 56px, move out to theme instead of this      v
const ChatBubbleIcon = props => (
    <Icon as={MdChatBubble} {...props} boxSize={6} />
);

export default {
    list: CommentList,
    create: CommentCreate,
    edit: CommentEdit,
    show: ShowGuesser,
    icon: ChatBubbleIcon,
};
