import React from 'react';
import PropTypes from 'prop-types';

export class PostCreate extends React.Component {

    constructor(props) {
        super(props)
        
        this.state = { 
            name: '',
            description: ''
        }
    }

    clearFields() {
        this.setState({
            name: '',
            description: ''
        });
    }

    handleChange = (e) => {
        if(e.target.name === 'name') {
            this.setState({name: e.target.value})
        }

        if(e.target.name === 'description') {
            this.setState({description: e.target.value})
        }
    }

    // async createNewPost() {
    //     const post = await createPost(this.state);
    //     if(post.status) {
    //         store.dispatch(setNewPost(post.post));
    //     } else {
    //         alert(post.message);
    //     }
    // }

    render() {
        const { handleCreate } = this.props;
        return (
            <div className='filter'>
                <input 
                    value={this.state.name}
                    onChange={this.handleChange}
                    className='filter-input' 
                    type='text' 
                    placeholder='Nombre'
                    name='name'
                />
                <input 
                    value={this.state.description}
                    onChange={this.handleChange}
                    className='filter-input' 
                    type='text' 
                    placeholder='Descripcion'
                    name='description'
                />
                <button className='filter-button' onClick={
                    () => {
                        handleCreate(this.state);
                        this.clearFields();
                    }
                }>Crear</button>
                {/* <button className='filter-button' onClick={() => this.createNewPost()}>Crear</button> */}
            </div>
        )
    }
}

PostCreate.propTypes = {
    handleCreate: PropTypes.func.isRequired
}