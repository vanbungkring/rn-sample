'use strict';

import React from 'react';

import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

import Colors from '../../constants/Colors';

// https://github.com/EstebanFuentealba/react-native-share
import Share, {ShareSheet, Button} from 'react-native-share';

import GLOBAL from '../../constants/Global';

class ShareButton extends React.Component {
  render() {
    return (
      <View style={styles.button}>
        <TouchableOpacity onPress={this._sharePost.bind(this)}>
          <Image style={styles.buttonImg}source={require('../../assets/icons/share.png')}/>
        </TouchableOpacity>
      </View>
    );
  }

  _sharePost = () => {
    let shareOptions = {
      title: this.props.title,
      message: this.props.title,
      url: this.props.url,
      subject: this.props.title //  for email
    };
    // alert(JSON.stringify(shareOptions));
    Share.open(shareOptions);
  }

}

var styles = StyleSheet.create({
    button: {
      marginRight: 15,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: 'rgba(0,0,0,0.2)',
      backgroundColor: 'rgba(255,255,255,.6)',
      borderRadius: 16,
      width: 32,
      height: 32,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonImg: {
      marginTop: 0,
      tintColor: Colors.themeRed,
      // marginTop: 2,
      width: 20,
      height: 20,
      marginLeft: 5,
    }
});

export default ShareButton;
