'use strict';

import React from 'react';

import { View, Text, Image, TouchableOpacity, StyleSheet, WebView } from 'react-native';

// https://github.com/EstebanFuentealba/react-native-share
import Share, {ShareSheet, Button} from 'react-native-share';

import GLOBAL from '../../constants/Global';

class MyWebview extends React.Component {
  render() {
    return (
      <WebView
        source={{uri: 'https://github.com/facebook/react-native'}}
        style={{marginTop: 20}}
      />
    );
  }

  _sharePost = () => {
    let shareOptions = {
      title: this.props.data.postMeta.title,
      message: this.props.data.postMeta.title,
      url: GLOBAL.PUBLIC_URL+'/'+this.props.data._id,
      subject: this.props.data.postMeta.title //  for email
    };
    //alert('hello!');
    Share.open(shareOptions);
  }

}

var styles = StyleSheet.create({
    button: {
      marginRight: 10,
    },
    buttonImg: {
      tintColor: 'white',
    }
});

export default MyWebview;
