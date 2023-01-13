import React from 'react';
import { createBoard } from '@wixc3/react-board';
import Post from '../../../components/PublicPost/PublicPost.jsx';

export default createBoard({
    name: 'Post',
    Board: () => <Post />
});
