'use strict';
import React, { PropTypes } from 'react';
import { Image, StyleSheet } from 'react-native';

import Drawer from 'react-native-drawer';
import { DefaultRenderer, Actions } from 'react-native-router-flux';

import DrawerView from './DrawerView';

const propTypes = {
  navigationState: PropTypes.object,
};

class NavigationDrawer extends React.Component {
  render() {
    const state = this.props.navigationState;
    const children = state.children;
    const drawerIcon = require('../../assets/icons/hamburger.png');

    return (
      <Drawer
        ref="navigation"
        type="displace"
        onOpen={() => Actions.refresh({ key: state.key, open: true })}
        onClose={() => Actions.refresh({ key: state.key, open: false })}
        content={<DrawerView />}
        tapToClose
        openDrawerOffset={0.2}
        panCloseMask={0.2}
        negotiatePan
        tweenHandler={(ratio) => ({
          main: { opacity: Math.max(0.54, 1 - ratio) },
        })}
        drawerImage={<Image source={drawerIcon} style={styles.drawerIcon}/>}
      >
        <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate} />
      </Drawer>
    );
  }
}

NavigationDrawer.propTypes = propTypes;

var styles = StyleSheet.create({
  drawerIcon: {
    width: 30,
    height: 30,
  }
});

export default NavigationDrawer;
