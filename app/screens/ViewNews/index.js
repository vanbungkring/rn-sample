'use strict';
import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, ScrollView,
  StatusBar,
  Dimensions,
  Linking,
  Platform,
} from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';

import GlobalStyles from '../../constants/Styles';
import Colors from '../../constants/Colors';
// https://github.com/TylerLH/react-native-timeago
// import TimeAgo from 'react-native-timeago';
import Moment from 'moment';
// import Striptags from 'striptags';
import HTMLView from 'react-native-htmlview';
import ParallaxScrollView from 'react-native-parallax-scroll-view';

import BackButton from '../../components/Buttons/BackButton';
import ShareButton from '../../components/Buttons/ShareButton';
import NavBarTitleImage from '../../components/NavBarTitleImage';


export default class ViewNews extends Component {

  handleClick(url){
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        // console.log('Don\'t know how to open URI: ' + url);
      }
    });
  }

  render() {
    const { onScroll = () => {} } = this.props;
    let data = this.props.post;
    let PARALLAX_HEADER_HEIGHT = (data.thumbnail) ? 180 : 70;
    let bgColor = (data.thumbnail) ? 'rgba(0,0,0,0.1)' : Colors.themeRed;
    let listNewsByCat = () => {
      Actions.ListNewsByCat({
        catId: data.categories[0].id,
        title: data.categories[0].title,
        type: ActionConst.RESET});
    };

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
              { (data.thumbnail) &&
              <Image source={{uri: data.thumbnail_images.medium.url,
                              backgroundColor: Colors.themeRed,
                              width: window.width,
                              height: PARALLAX_HEADER_HEIGHT}}/>
              }
              <View style={{position: 'absolute',
                            top: 0,
                            width: window.width,
                            backgroundColor: bgColor,
                            height: PARALLAX_HEADER_HEIGHT}}/>

            </View>
          )}

          renderForeground={() => (
            <View key="parallax-header" style={ [{backgroundColor: bgColor}, styles.parallaxHeader] }>
              <Text style={ styles.sectionTitleText }>
              </Text>
            </View>
          )}

          renderStickyHeader={() => (
            <View key="sticky-header" style={styles.stickySection}>
            { (data.thumbnail) &&
              <NavBarTitleImage />
            }
            </View>
          )}

          renderFixedHeader={() => (
            <FixedHeader data={data}/>
          )}
          >

          <View style={styles.content}>
            <View style={styles.header}>
              <Text onPress={listNewsByCat} style={styles.category}>{data.categories[0].title.toUpperCase()}</Text>
              <Text style={styles.date}>{Moment(data.date).format('D/M/YYYY')}</Text>
            </View>
            <Text style={styles.title}>
              <HTMLView style={styles.title} value={data.title}/>
            </Text>
            <HTMLView
              value={data.content.replace(/\r?\n|\r/g, '')}
              stylesheet={htmlViewStyles}
              onLinkPress={(url) => this.handleClick(url) }
            />
          </View>
        </ParallaxScrollView>

      </View>

    );
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
        { (!data.thumbnail) &&
          <View style={[GlobalStyles.row, styles.center]}>
            <NavBarTitleImage style={styles.navbarImage}/>
          </View>
        }
        <View style={[GlobalStyles.row, styles.right]}>
          <ShareButton
            title={data.title}
            url={data.url}
            message={data.title}
            subject={data.title}
            style={styles.shareButton}
          />
        </View>
      </View>
    );
  }
}

const window = Dimensions.get('window');

// const AVATAR_SIZE = 120;
// const PARALLAX_HEADER_HEIGHT = 180;
const STICKY_HEADER_HEIGHT = 70;

var htmlViewStyles = StyleSheet.create({
  // a: {
  //   color: '#3b5998',
  // },
  p: {
    borderWidth: 1,
    padding:0,
    marginBottom:0,
    color: Colors.defaultTextColor,
  },
});

var styles = StyleSheet.create({
  // container: {
  //   // borderWidth:1,
  //   // borderColor: 'red',
  // },
  content:{
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 12,
    color: '#333',
  },
  // center: {
  //   borderWidth: 1,
  // },
  navbarImage: {
    top: 0,
  },
  right: {
    alignItems: 'flex-end'
  },
  container: {
    flex: 1,
    backgroundColor: Colors.themeRed
  },
  header: {
    flexDirection: 'row',
    paddingTop: 10,
  },
  category: {
    color: Colors.themeRed,
    fontWeight: '700',
    marginRight: 15,
  },
  date: {
    color: '#555'
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
    // justifyContent: 'center',
    backgroundColor: Colors.themeRed,
    // alignItems: 'center',
    paddingTop: (Platform.OS === 'ios') ? 0 : 10,

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
    paddingTop: 100,
    // backgroundColor: bgColor,
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
  shareButton:{
    marginRight: 10,
  }
});
