import './style/style.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

import SongList from './components/SongList';
import App from './components/App';
import SongCreate from './components/SongCreate';
import SongDetail from './components/SongDetail';
const client = new ApolloClient({
  dataIdFromObject: o => o.id //o is short for object
  //takes all data fetched by apollo and run through this func
  //the result of this func is used to identify that data in apollo store
  //only works if all ids are unique
  //we need to provide the id - the graphql id 
});
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
        <Route path='/songs/:id' component={SongDetail} />
      </Router>
    </ApolloProvider>
  )
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
