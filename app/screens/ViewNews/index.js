import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';

import GlobalStyles from '../../constants/Styles';
// https://github.com/TylerLH/react-native-timeago
import TimeAgo from 'react-native-timeago';
import Moment from 'moment';
import Striptags from 'striptags';
import HTMLView from 'react-native-htmlview';
import ParallaxScrollView from 'react-native-parallax-scroll-view';

export default class ViewNews extends Component {
  render() {
    let data = this.props.post;
    let parallaxHeaderHeight = (data.thumbnail) ? 180 : 0;
    return (
      <View style={GlobalStyles.container}>
        <ParallaxScrollView
          style={{ flex: 1, backgroundColor: 'hotpink', overflow: 'hidden' }}
          renderBackground={() => <Image source={{ uri: data.thumbnail, width: window.width, height: parallaxHeaderHeight }}/>}
          renderFixedHeader={() => <Text style={{ textAlign: 'right', color: 'white', padding: 5, fontSize: 10 }}></Text>}
          parallaxHeaderHeight={ parallaxHeaderHeight }>
          <View style={styles.content}>
            <Text style={styles.title}>{data.title}</Text>
            <HTMLView value={data.excerpt} />
          </View>
        </ParallaxScrollView>
      </View>

    )
  }
}



var styles = StyleSheet.create({
  container: {
    // borderWidth:1,
    // borderColor: 'red',
  },
  content:{
    paddingHorizontal: 15
  },
  title: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 12,
  },

});
