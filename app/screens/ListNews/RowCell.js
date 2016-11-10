'use strict';

import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';

import { Actions } from 'react-native-router-flux';

import GLOBAL from '../../constants/Global';
import Layouts from '../../constants/Layouts';
// https://github.com/TylerLH/react-native-timeago
import TimeAgo from 'react-native-timeago';
import Moment from 'moment';
import Striptags from 'striptags';
import HTMLView from 'react-native-htmlview';
// import { BlurView, VibrancyView } from 'react-native-blur';

// https://github.com/oblador/react-native-progress
// import * as Progress from 'react-native-progress';
// https://github.com/EstebanFuentealba/react-native-share
// import Share, {ShareSheet} from 'react-native-share';

// import Button from '../../components/Buttons/Button';

class Row extends Component {
  constructor(props) {
    super(props);
  }
  timeAgo(date){
    //return Moment(date).fromNow();
    //return date;
    var end = Moment(date);
    var now = Moment();
    var endYr = Moment(date).format('YYYY');
    var nowYr = Moment().format('YYYY');
    var d = end.diff(now, 'd');

    //console.log(d);
    if (d > -8) {
        return Moment(date).fromNow();
    } else if (endYr == nowYr) {
        return Moment(date).format('MMM D');
    } else {
        return Moment(date).format('MMM D, YYYY');
    }

  }

  _sharePost = (data) => {
    let shareOptions = {
      title: data.postMeta.title,
      message: data.postMeta.title,
      url: GLOBAL.PUBLIC_URL+'/'+data._id,
      subject: data.postMeta.title //  for email
    };
    //alert('hello!');
    Share.open(shareOptions);
  }



  render(){
    let data = this.props;
    // console.log('data.attachments[0]==>' + JSON.stringify(data.attachments[0].images));
    let imageParent = data.attachments[0];
    let viewNews = () => Actions.ViewNews({post: data});
    console.log(imageParent);
    const background = 'http://iphonewallpapers-hd.com/thumbs/firework_iphone_wallpaper_5-t2.jpg';

    return(
      <View style={styles.container}>
        <TouchableOpacity activeOpacity={1} onPress={viewNews}>
          <Text style={styles.title}>
            <HTMLView value={data.title} />
          </Text>
          { (data.thumbnail) && <Image style={styles.imageContent} source={{uri:data.thumbnail}}/>}
          <View style={styles.wrapContent}>
            <HTMLView
              value={data.excerpt}
              stylesheet={content}
            />
          </View>

        </TouchableOpacity>
      </View>

    );
  }
}

var content = StyleSheet.create({
  p: {
    padding: 10,
  }

})

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    borderWidth: StyleSheet.hairlineWidth,
    marginVertical: 5,
    paddingTop: 10,
    borderColor: '#ccc',
    borderBottomColor: '#bbb',
    borderBottomWidth: 1.5,
    borderRadius: 0
  },
  imageContent: {
    height: 150,
    width: Layouts.window.width,
    marginBottom: 10,
  },
  wrapContent: {
    paddingHorizontal: 10,
  },
  publishDate: {
    color: '#999',
    fontSize:11,
    marginTop:2,
  },
  title: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'left',
    color: '#222',
    paddingHorizontal: 10,
    fontWeight: '700',
  },
  image: {
    height: 150,
    // paddingHorizontal: -15,
    marginHorizontal: -5,
  },
  content: {
    paddingHorizontal: 10,
  },

  shareText: {
    marginRight: 20,
    fontSize: 12,
    color: GLOBAL.COLOR.MP_GREEN

  },



});

export default Row;
