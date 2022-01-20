import React, { Component } from 'react';
import { createPost, deletePost, getAllPosts } from '../services/postService';
import { PostList } from './PostList';
import { PostFilter } from './PostFilter';
import { PostCreate } from './PostCreate';
import { Provider } from 'react-redux';
import store from '../store';
import { setNewPost, setOnlyPosts, setPosts, unsetPost } from '../store/posts';
import logo from '../logo.svg';

export class PostContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            allPosts: [],
            posts: [],
            attempt: true,
            search: ''
        }
    }

    async componentDidMount() {
        const posts = await getAllPosts().catch(() => {
            alert('Error cargando la informacion')
        });
        
        if(posts.status) {
            store.dispatch(setPosts(posts.posts));
            this.setState({allPosts: posts.posts, attempt: false, posts: posts.posts});
        } else {
            alert(posts.message);
        }
    }

    handleCreate = async (event) => {
        if(event.name.length < 1) {
            alert('El nombre no puede estar vacio');
            return;
        }
        if(event.description.length < 1) {
            alert('La descripcion no puede estar vacia');
            return;
        }
        const post = await createPost(event);
        store.dispatch((setNewPost({...post.post, search: this.state.search})));
        this.setState({allPosts: [...this.state.allPosts, post.post]})
        if(post.post.name.toLowerCase().includes(this.state.search)) {
            this.setState({posts: [...this.state.posts, post.post]})
        }
    }

    handleDelete = async (event) => {
        const postDelete = await deletePost(event);
        if(!postDelete.status) {
            alert(postDelete.message);
        }
        store.dispatch((unsetPost(postDelete.post)));
        const allPost = this.state.allPosts.filter((post) => Number(post.id) !== Number(postDelete.post.id));
        const posts = this.state.posts.filter((post) => Number(post.id) !== Number(postDelete.post.id));

        this.setState({allPost, posts});
    }

    handleFilter = async (event) => {
        this.setState({search: event.trim()})
        if(event.length < 1) {
            store.dispatch(setPosts(store.getState().postsReducer.allPosts));
            this.setState({posts: this.state.allPosts});
        } else {
            let postFilters = [];
            event.trim();
            event = event.toLowerCase();
            for await(const post of store.getState().postsReducer.allPosts) {
                if(post.name.toLowerCase().includes(event)) {
                    postFilters.push(post);
                }
            }
            store.dispatch(setOnlyPosts(postFilters));
            this.setState({posts: postFilters, allPost: postFilters});
        }
    }

    render() {
        const { attempt } = this.state;
        if(!attempt) {
            return (
                    <section className='posts-container'>
                        <div className='header'>
                            <img className='image' src={logo} alt='Logo react' />
                            <h1 className='title'>Challenge TCIT</h1>
                            <img className='image' src={logo} alt='Logo react' />
                        </div>
                        <hr></hr>
                        <Provider store={store}>
                            <PostFilter handleFilter={this.handleFilter} />
                            <PostList handleDelete={this.handleDelete}/>
                            <PostCreate handleCreate={this.handleCreate} />
                        </Provider>
                    </section>
                
            )
        } else {
            return 'Cargando...'
        }
    }
}