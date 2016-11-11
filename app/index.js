'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
} from 'react-native';

import {
  Scene,
  Reducer,
  Router,
  // Switch,
  Modal,
  // Actions,
  ActionConst,
} from 'react-native-router-flux';

// import Button from 'react-native-button';

import GlobalStyles from './constants/Styles';

import NavigationDrawer from './screens/NavigationDrawer';
import ListNews from './screens/ListNews';
import ListNewsByCat from './screens/ListNews/ByCategory';
import ViewNews from './screens/ViewNews';
import NavBarTitleImage from './components/NavBarTitleImage';

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: 'transparent', justifyContent: 'center',
//     alignItems: 'center',
//   },
//   tabBarStyle: {
//     backgroundColor: '#eee',
//   },
//   tabBarSelectedItemStyle: {
//     backgroundColor: '#ddd',
//   },
// });

const reducerCreate = params => {
  const defaultReducer = new Reducer(params);
  return (state, action) => {
    // console.log('ACTION:', action);
    return defaultReducer(state, action);
  };
};

// define this based on the styles/dimensions you use
const getSceneStyle = (/* NavigationSceneRendererProps */ props, computedProps) => {
  const style = {
    flex: 1,
    backgroundColor: '#fff',
    shadowColor: null,
    shadowOffset: null,
    shadowOpacity: null,
    shadowRadius: null,
  };
  if (computedProps.isActive) {
    style.marginTop = computedProps.hideNavBar ? 0 : 64;
    style.marginBottom = computedProps.hideTabBar ? 0 : 50;
  }
  return style;
};

export default class App extends Component {
  render() {
    // const drawerIcon = require('./assets/icons/hamburger.png');

    return (
      <Router createReducer={reducerCreate} getSceneStyle={getSceneStyle}>
        <Scene key='modal' component={Modal} >
          <Scene key='root' hideNavBar hideTabBar>
            <Scene
              key='tabbar'
              component={NavigationDrawer} initial
            >
              <Scene
                key='main'
                navigationBarStyle={GlobalStyles.NavBar}
                hideNavBar={false}
                // drawerImage={<Image source={drawerIcon} style={styles.drawerIcon}/>}

              >
                <Scene key='ListNews' component={ListNews} renderTitle={()=><NavBarTitleImage />} type={ActionConst.RESET} initial={true} />
                <Scene key='ListNewsByCat' component={ListNewsByCat} titleStyle={styles.navBarTitle} title='Islami.co' type={ActionConst.REPLACE} />
              </Scene>
            </Scene>
            <Scene key='ViewNews' component={ViewNews} title='News Title' hideNavBar={true} />

          </Scene>
          <Scene key='error' component={Error} />
        </Scene>
      </Router>
    );
  }
}

var styles = StyleSheet.create({
  drawerIcon: {
    width: 30,
    height: 30,
  },
  navBarTitle: {
    color: 'white',
  }
});
