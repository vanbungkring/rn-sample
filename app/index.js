// import React, { Component } from 'react';
// import { Router, Scene } from 'react-native-router-flux';
// import NavigationDrawer from './screens/NavigationDrawer';
//
// import ListNews from './screens/ListNews';
// import ViewNews from './screens/ViewNews';
//
// export default class App extends Component {
//   render() {
//     return (
//       <Router>
//         <Scene key='root' component={NavigationDrawer}>
//           <Scene key='ListNews' component={ListNews} title='Islami.co' initial={true} />
//           <Scene key='ViewNews' component={ViewNews} title='News Title' hideNavBar={true} />
//         </Scene>
//       </Router>
//     )
//   }
// }

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

import {
  Scene,
  Reducer,
  Router,
  Switch,
  Modal,
  Actions,
  ActionConst,
} from 'react-native-router-flux';

import Button from 'react-native-button';

import GlobalStyles from './constants/Styles';

import NavigationDrawer from './screens/NavigationDrawer';
import ListNews from './screens/ListNews';
import ListNewsByCat from './screens/ListNews/ByCategory';
import ViewNews from './screens/ViewNews';

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
    console.log('ACTION:', action);
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

let currentSwitchPage = 'text1';

const SwitcherPage = (props) => (
  <View>
    <Text style={{ marginTop: 100, textAlign: 'center' }}>current page: {props.text}</Text>
    <Button
      onPress={() => {
        currentSwitchPage = currentSwitchPage === 'text1' ? 'text2' : 'text1';
        Actions.refresh({ key: 'switcher' });
      }}
    >
      Switch!
    </Button>
    <Button
      onPress={() => {
        Actions.launch({ type: ActionConst.RESET });
      }}
    >
      Exit
    </Button>
  </View>
);

export default class App extends Component {
  render() {
    return (
      <Router createReducer={reducerCreate} getSceneStyle={getSceneStyle}>
        <Scene key='modal' component={Modal} >
          <Scene key='root' hideNavBar hideTabBar>
            <Scene key='tabbar'  component={NavigationDrawer} initial>
              <Scene
                key='main'
                navigationBarStyle={GlobalStyles.NavBar}

              >
                <Scene key='ListNews' component={ListNews} renderTitle={()=><NavBarTitle />}  initial={true} />
                <Scene key='ListNewsByCat' component={ListNewsByCat} title='Islami.co' />
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

class NavBarTitle extends Component {
  render() {
    const navbarImage = require('./assets/images/logo.png');
    return(
      <Image source={navbarImage} style={GlobalStyles.navbarImage}/>
    )
  }
}
