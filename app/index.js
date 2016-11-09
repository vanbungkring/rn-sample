import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';

import ListNews from './screens/ListNews';
import ViewNews from './screens/ViewNews';

export default class App extends Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="ListNews" component={ListNews} title="Islami.co" initial={true} />
          <Scene key="ViewNews" component={ViewNews} title="News Title" hideNavBar={true} />
        </Scene>
      </Router>
    )
  }
}
