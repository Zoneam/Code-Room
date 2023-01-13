import React from 'react';
import { createBoard } from '@wixc3/react-board';
import AllPostsPage from '../../../pages/AllPostsPage/AllPostsPage.jsx';

export default createBoard({
    name: 'AllPostsPage',
    Board: () => <AllPostsPage />
});
