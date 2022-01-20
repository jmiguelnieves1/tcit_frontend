import React from 'react';
import PropTypes from 'prop-types';

export class PostFilter extends React.Component {

    constructor(props) {
        super(props)
        
        this.state = { search: '' }
    }

    handleChange = (e) => {
        this.setState({ search: e.target.value })
    }

    render() {
        const { handleFilter } = this.props;
        return (
            <div className='filter'>
                <input 
                    value={this.state.search}
                    onChange={this.handleChange}
                    className='filter-input' 
                    type='text' 
                    placeholder='Buscar por nombre'
                />
                <button className='filter-button' onClick={() => handleFilter(this.state.search)}>Buscar</button>
            </div>
        )
    }
}

PostFilter.propTypes = {
    handleFilter: PropTypes.func.isRequired
}