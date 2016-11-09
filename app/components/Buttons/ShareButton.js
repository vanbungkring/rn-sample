'use strict';

import React from 'react';

import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

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
      marginRight: 10,
    },
    buttonImg: {
      tintColor: 'white',
      marginTop: 0,
    }
});

export default ShareButton;
