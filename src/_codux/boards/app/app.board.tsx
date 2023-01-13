import React from 'react';
import { createBoard } from '@wixc3/react-board';
import App from '../../../pages/App/App';

export default createBoard({
    name: 'App',
    Board: () => <App />
});
