import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link, hashHistory } from 'react-router';
import query from '../queries/fetchSongs';

class SongCreate extends React.Component {

  constructor(props) {
    super(props);
    this.state={ title: '' };
  }

  onSubmit(e) {
    e.preventDefault();
    //mutate func returns a promise that's chainable
    this.props.mutate({
      variables: { title: this.state.title },
      refetchQueries: [{ query: query }] //can take variables for the queries too
      //or { query } - use ES 6
    }).then( () => hashHistory.push('/'))
      // .catch( () => )
      //due to refetch, will not fetch again
    ;
  }

  render() {

    return(
      <div>
        <Link to='/'>Back</Link>
        <h3>Create a New Song</h3>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label>Song Title</label>
          <input
            onChange={e => this.setState({ title: e.target.value })}
            value={this.state.title}
          />
        </form>
      </div>
    )
  }
}

const mutation = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      title
    }
  }
`;

export default graphql(mutation)(SongCreate);
