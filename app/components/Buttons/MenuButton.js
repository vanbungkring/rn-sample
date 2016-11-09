'use strict';

import React, { Component } from 'react';

import {
  View, Text, Image, TouchableOpacity, StyleSheet, Modal,
  ListView,
  Animated,
} from 'react-native';

import {
  createRouter,
  NavigationProvider,
  StackNavigation,
  NavigationActions,
  withNavigation,
} from '@exponent/ex-navigation';

//https://github.com/react-native-community/react-native-navbar
import NavigationBar from 'react-native-navbar';
import GlobalStyles from '../../constants/Styles';
import Colors from '../../constants/Colors';
// import MenuList from '../../screens/MenuList';
import Store from '../../state/Store';
import Router from '../../navigation/Router';


class menuButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false
    };
  }

  openModal() {
    this.setState({modalVisible: true});
    // this.props.navigation.performAction(({ tabs, stacks }) => {
    //   tabs('main').jumpToTab('feed');
    //   // stacks('history').push(Router.getRoute('history'));
    // });
  }

  closeModal() {
    this.setState({modalVisible: false});
  }

  render() {
    const menuIcon = require('../../assets/icons/menu.png');
    const rightButtonConfig1 = {
      title: 'CLOSE',
      tintColor: 'white',
      handler: () => this.closeModal(),
    };
    const rightButtonConfig = <MenuClose callbackCloseModal={() => this.closeModal()} />;

    return (
      <View style={styles.button}>
        <TouchableOpacity onPress={() => this.openModal()}>
          <Image style={styles.buttonImg} source={menuIcon}/>
        </TouchableOpacity>
        <Modal
          animationType={"fade"}
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
          navigator={this.props.navigator}
          >
          <View style={[GlobalStyles.container, {backgroundColor:'rgba(0,0,0,0.85)'}]}>
            <NavigationBar style={GlobalStyles.NavBar}
              rightButton={rightButtonConfig}/>
            <View>
              <MenuList callbackParent={() => this.closeModal()} navigator={this.props.navigator} navigation={this.props.navigation} />
            </View>
         </View>
        </Modal>
      </View>
    );
  }

}

class MenuClose extends Component {
  constructor () {
    super()
    this.springValue = new Animated.Value(0.3)
  }
  spring () {
    this.springValue.setValue(0.3)
    Animated.spring(
      this.springValue,
      {
        toValue: 1,
        friction: 1,
        tension: 1
      }
    ).start()
  }
  _onPress(){
   this.props.callbackCloseModal();
  }
  componentDidMount () {
    this.spring();
  }
  render(){
    const closeIcon = require('../../assets/icons/close.png');
    return(
      <View style={styles.button}>
        <TouchableOpacity onPress={() => this._onPress()}>
          <Animated.Image style={[styles.buttonImg, { transform: [{scale: this.springValue}]}]} source={closeIcon}/>
        </TouchableOpacity>
      </View>
    )
  }

}

const menu = [
  { title: 'My Account',
    action: 'tab',
    route: 'account',
  },
  { title: 'Donation History',
    action: 'tab',
    route: 'history',
  },
  // { title: 'Shoping Cart',
  //   action: 'navigation',
  //   route: 'account',
  // },
  { title: 'Settings',
    action: 'navigation',
    route: 'settings',
  },

];

class MenuList extends Component {
  static route = {
    navigationBar: {
      visible: false,
    }
  }
  // Initialize the hardcoded data
  constructor(props) {
   super(props);
   const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
   this.state = {
     dataSource: ds.cloneWithRows(menu)
   };
  }
  _onPress(data){
   this.props.callbackParent();
  }
  render() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(data) => <Row {...data} callbackGrandParent={() => this._onPress()} navigator={this.props.navigator} navigation={this.props.navigation}/>}
        />
      </View>
    );
  }
}

@withNavigation
class Row extends Component {
  static route = {
    navigationBar: {
      visible: false,
    }
  }
  constructor(props) {
    super(props);
  }

  _onPress(data){
    //alert(data.title);
    // this.props.navigator.push(Router.getRoute('account'));
    this.props.callbackGrandParent();
    let navigatorUID = Store.getState().navigation.currentNavigatorUID;
    console.log('navigatorUID: '+navigatorUID);
    if (data.action==='tab') {
      // this.props.navigator.getNavigatorByUID('main').jumpToTab(Router.getRoute(data.route));
      // this.props.navigator.push(Router.getRoute(data.route));

      this.props.navigation.performAction(({ tabs, stacks }) => {
        tabs('main').jumpToTab(data.route);
        stacks(data.route).push(Router.getRoute(data.route));
      });
    } else {
      let masterNavigator = this.props.navigation.getNavigator('master');
      // masterNavigator.push(Router.getRoute(data.route));
      masterNavigator.immediatelyResetStack([Router.getRoute(data.route)], 0);
    }
  }

  render(){
    var data = this.props;
    return(
      <TouchableOpacity activeOpacity={1} onPress={() => this._onPress(data)} >
      <View>
        <Text style={styles.text}>
          {`${data.title}`}
        </Text>
      </View>
      </TouchableOpacity>
    );
  }
}

var styles = StyleSheet.create({
  container:{
    // borderTopColor: 'rgba(255,255,255,0.8)',
    // borderTopWidth: StyleSheet.hairlineWidth,
    backgroundColor: Colors.mpGreen,
    paddingBottom:10,
  },
  button: {
    marginRight: 10,
  },
  buttonImg: {
    tintColor: 'white',
    marginTop: 0,
  },
  text: {
    fontSize: 16,
    color: 'white',
    alignSelf: 'center',
    paddingVertical: 10,
  }
});

export default menuButton;
