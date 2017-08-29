import React from 'react';
import gql from 'graphql-tag'; //allows writing query in component file
import { graphql } from 'react-apollo';
//creates the .data on this.props
import { Link } from 'react-router';
import query from '../queries/fetchSongs';

class SongList extends React.Component {



  renderSongs() {
    return this.props.data.songs.map( ({ id, title}) => {
      return (
        <li key={id} className='collection-item'>
          {title}
          <i style={{ cursor: 'pointer'}}
            className='material-icons'
            onClick={ () => this.onSongDelete(id) }
          >
            delete
          </i>
        </li>
      )
    })
  }

  render() {
    if ( this.props.data.loading) { return <div>loading...</div>}
    return (
      <div>
        <ul className='collection'>
          {this.renderSongs()}
        </ul>
        <Link to='/songs/new' className='btn-floating btn-large red right'>
          <i className='material-icons'>add</i>
        </Link>
      </div>
    )
  }
}

//below is defining the query/mutation only, NOT executing

const mutation = gql`
  mutation DeleteSong($id: ID) {
    deleteSong (id: $id) {
      id
    }
  }
`

export default graphql(mutation)(
  graphql(query)(SongList)
);
//graphql(query) returns a func, which is immediately called with (SongList)
//when comp render, query will be issued
//query complete - comp re-render with fetched data
//data is placed in component's props
