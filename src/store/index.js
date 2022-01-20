import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './posts/index';

export default configureStore({
    reducer: {
        postsReducer,
    }
});