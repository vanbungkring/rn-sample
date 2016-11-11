'use strict';

import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
// import { Actions } from 'react-native-router-flux';

// import Colors from '../../constants/Colors';

class BackButton extends React.Component {
  render() {
    // let onPress = () => Actions.pop();
    return (
      <View style={styles.button}>
        <TouchableOpacity onPress={this.props.onPress}>
          <Image style={styles.buttonImg} source={require('../../assets/icons/leftArrow.png')}/>
        </TouchableOpacity>
      </View>
    );
  }
}

var styles = StyleSheet.create({
    button: {
      marginLeft: 5,
      // borderWidth: StyleSheet.hairlineWidth,
      // borderColor: 'rgba(0,0,0,0.2)',
      // backgroundColor: 'rgba(255,255,255,.6)',
      borderRadius: 16,
      width: 32,
      height: 32,
      justifyContent: 'center',
      alignItems: 'center',
      // shadowColor: "#000000",
      // shadowOpacity: 0.8,
      // shadowRadius: 1,
      // shadowOffset: {
      //   height: 1,
      //   width: 0
      // }
    },
    buttonImg: {
      tintColor: 'white',
      // marginTop: 2,
      // width: 20,
      // height: 20,

    }
});

export default BackButton;
