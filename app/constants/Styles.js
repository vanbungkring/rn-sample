'use strict';

import React from 'react';
import { StyleSheet,Platform } from 'react-native';
import GLOBAL from '../constants/Global';
import Colors from '../constants/Colors';
import Layouts from '../constants/Layouts';

const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 0,
    margin: 0,
    marginTop: 40,
  },
  NavBar: {
    height: (Platform.OS === 'ios') ? Layouts.navBarHeight : (Layouts.navBarHeight-2),
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: GLOBAL.COLOR.MP_GREEN,
    // flexDirection: 'row',
    paddingTop: (Platform.OS === 'ios') ? 23 : 20,
    marginTop: (Platform.OS === 'ios') ? -20 : 0,
  },
  NavBarModal: {
    backgroundColor: GLOBAL.COLOR.MP_GREY,
  },
  titleNavBar: {
    fontSize: 16,
    paddingTop: (Platform.OS === 'ios') ? 20 : 10,
    fontWeight: 'bold',
    justifyContent: 'center',
    // flex:0.5,
    borderWidth: 0,
    borderColor: 'red',
    paddingHorizontal:5,
    marginHorizontal: 25,
  },
  tabBarUnderlineStyle: {
    backgroundColor: GLOBAL.COLOR.MP_GREEN
  },
  activityIndicator: {
      alignItems: 'center',
      justifyContent: 'center',
  },
  padHorBody: {
    paddingHorizontal: 10,
  },
  parentRow: {
    flex: 1,
    flexDirection: 'row',
  },
  row: {
    flex: 1,
    alignSelf: 'stretch',
  },
  link: {
    color: GLOBAL.COLOR.MP_GREEN,
  },
  dotPostImage: {
    backgroundColor: '#fff',
    width: 8,
    height: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(0,0,0,0.8)',
    borderRadius: 4,
    marginLeft: 4,
    marginRight: 4,
    marginTop: 10,
    marginBottom: 0,
  },
  activeDotPostImage: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    width: 7, height: 7,
    borderRadius: 4,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,1)',
    marginLeft: 4,
    marginRight: 4,
    marginTop: 10,
    marginBottom: 0,
  }

});

export default GlobalStyles;
