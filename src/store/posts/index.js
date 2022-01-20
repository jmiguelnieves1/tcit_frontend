import { createSlice } from '@reduxjs/toolkit';

export const postSlice = createSlice({
    name: 'posts',
    initialState: {
        allPosts: [],
        posts: [],
    },
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload;
            state.allPosts = action.payload;
        },
        setOnlyPosts: (state, action) => {
            state.posts = action.payload;
        },
        setNewPost: (state, action) => {
            state.allPosts = [...state.allPosts, action.payload];
            if(action.payload.name.toLowerCase().includes(action.payload.search)) {
                state.posts = [...state.posts, action.payload]
            }
        },
        unsetPost: (state, action) => {
            state.allPosts = state.allPosts.filter((post) => Number(action.payload.id) !== Number(post.id));
            state.posts = state.posts.filter((post) => Number(action.payload.id) !== Number(post.id));
        }
    }
});

export const { setPosts, setNewPost, unsetPost, setOnlyPosts } = postSlice.actions;

export default postSlice.reducer;