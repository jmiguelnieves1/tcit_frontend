import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import logoDelete from '../assets/delete.svg';
import store from '../store';

export class PostList extends React.Component {

  getDescription(description) {
    if(description.length > 150) {
      return description.substr(0, 150) + '...';
    }
    return description;
  }

  render() {
    const { handleDelete } = this.props;
    const posts = store.getState().postsReducer.posts;
    if(posts.length > 0) {
      return (
        <div className='table-height'>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell><span className='header-table'>Nombre</span></TableCell>
                  <TableCell><span className='header-table'>Descripcion</span></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {posts.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <span className='header-table'>{row.name}</span>
                    </TableCell>
                    <TableCell>{this.getDescription(row.description)}</TableCell>
                    <TableCell><img src={logoDelete} className='logo-delete' alt='Eliminar post' onClick={() => handleDelete(row.id)}/></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div> 
      )  
    } else {
      return <span className='not-result'>No hay resultados para mostrar</span>;
    }
    
  }

}