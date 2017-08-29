import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

import SongList from './components/SongList';
import App from './components/App';
import SongCreate from './components/SongCreate';

const client = new ApolloClient({});
//ApolloClient assume server listens to graphql req on '/graphql'
//add more config if not using default assumptions

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path='/' component={App} >
          <IndexRoute component={SongList} />
        </Route>
        <Route path='/songs/new' component={SongCreate} />
      </Router>
    </ApolloProvider>
  )
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
