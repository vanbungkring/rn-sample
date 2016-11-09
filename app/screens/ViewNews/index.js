import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, ScrollView,
  StatusBar,
  Dimensions,
  Linking,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import GlobalStyles from '../../constants/Styles';
import Colors from '../../constants/Colors';
// https://github.com/TylerLH/react-native-timeago
import TimeAgo from 'react-native-timeago';
import Moment from 'moment';
import Striptags from 'striptags';
import HTMLView from 'react-native-htmlview';
import ParallaxScrollView from 'react-native-parallax-scroll-view';

import BackButton from '../../components/Buttons/BackButton';
import ShareButton from '../../components/Buttons/ShareButton';

export default class ViewNews extends Component {
  render() {
    const { onScroll = () => {} } = this.props;
    let data = this.props.post;
    let PARALLAX_HEADER_HEIGHT = (data.thumbnail) ? 180 : 70;
    return (
      <View style={GlobalStyles.containerNoNavBar}>
        <StatusBar hidden={true} />
        <ParallaxScrollView
          onScroll={onScroll}

          headerBackgroundColor={Colors.themeRed}
          stickyHeaderHeight={ STICKY_HEADER_HEIGHT }
          parallaxHeaderHeight={ PARALLAX_HEADER_HEIGHT }
          backgroundSpeed={10}

          renderBackground={() => (
            <View key="background" style={{backgroundColor: Colors.themeRed}}>
              <Image source={{uri: data.thumbnail,
                              backgroundColor: 'green',
                              width: window.width,
                              height: PARALLAX_HEADER_HEIGHT}}/>
              <View style={{position: 'absolute',
                            top: 0,
                            width: window.width,
                            backgroundColor: 'rgba(0,0,0,.2)',
                            height: PARALLAX_HEADER_HEIGHT}}/>
            </View>
          )}

          renderForeground={() => (
            <View key="parallax-header" style={ styles.parallaxHeader }>
              <Text style={ styles.sectionTitleText }>
              </Text>
            </View>
          )}

          renderStickyHeader={() => (
            <View key="sticky-header" style={styles.stickySection}>
              <Text style={styles.stickySectionText}></Text>
            </View>
          )}

          renderFixedHeader={() => (
            <FixedHeader data={data}/>
          )}
          >

          <View style={styles.content}>
            <Text style={styles.title}>
              <HTMLView style={styles.title} value={data.title}/>
            </Text>
            <HTMLView value={data.content} />
          </View>
        </ParallaxScrollView>

      </View>

    )
  }
}

class FixedHeader extends Component {

  render(){
    let data = this.props.data;
    let goBack = () => Actions.pop();
    return(
      <View key="fixed-header" style={[GlobalStyles.parentRow, styles.fixedSection]}>
        <View style={[GlobalStyles.row]}>
          <BackButton onPress={goBack} />
        </View>
        <View style={[GlobalStyles.row, styles.right]}>
          <ShareButton
            title={data.title}
            url={data.url}
            message={data.title}
            subject={data.title}
          />
        </View>
      </View>
    )
  }
}

const window = Dimensions.get('window');

// const AVATAR_SIZE = 120;
// const PARALLAX_HEADER_HEIGHT = 180;
const STICKY_HEADER_HEIGHT = 70;

var styles = StyleSheet.create({
  // container: {
  //   // borderWidth:1,
  //   // borderColor: 'red',
  // },
  content:{
    paddingHorizontal: 15
  },
  title: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 12,
  },
  right: {
    alignItems: 'flex-end'
  },
  container: {
    flex: 1,
    backgroundColor: Colors.themeRed
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: window.width,
    // height: PARALLAX_HEADER_HEIGHT,
    // backgroundColor: 'green'
  },
  stickySection: {
    height: STICKY_HEADER_HEIGHT,
    // width: 300,
    justifyContent: 'flex-end',
    backgroundColor: Colors.themeRed,
  },
  stickySectionText: {
    color: 'white',
    fontSize: 20,
    margin: 0
  },
  fixedSection: {
    position: 'absolute',
    bottom: 20,
    // right: 10,
    // backgroundColor: 'red',

  },
  fixedSectionText: {
    color: '#999',
    fontSize: 20
  },
  parallaxHeader: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    paddingTop: 100
  },
  // avatar: {
  //   marginBottom: 10,
  //   borderRadius: AVATAR_SIZE / 2
  // },
  sectionSpeakerText: {
    color: 'white',
    fontSize: 24,
    paddingVertical: 5
  },
  sectionTitleText: {
    color: 'white',
    fontSize: 18,
    paddingVertical: 5
  },
});
