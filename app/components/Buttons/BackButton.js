'use strict';

import React from 'react';

import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

class BackButton extends React.Component {
  render() {
    let onPress = () => Actions.pop();
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
      marginLeft: 8,
      // flex: 1,
    },
    buttonImg: {
      tintColor: 'white',
      marginTop: 2,
    }
});

export default BackButton;
