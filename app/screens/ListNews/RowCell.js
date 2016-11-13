'use strict';

import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import { Actions, ActionConst } from 'react-native-router-flux';

import GlobalStyles from '../../constants/Styles';
import Layouts from '../../constants/Layouts';
import Colors from '../../constants/Colors';
// https://github.com/TylerLH/react-native-timeago
// import TimeAgo from 'react-native-timeago';
import Moment from 'moment';
// import Striptags from 'striptags';
import HTMLView from 'react-native-htmlview';
// import { BlurView, VibrancyView } from 'react-native-blur';

// https://github.com/oblador/react-native-progress
// import * as Progress from 'react-native-progress';
// https://github.com/EstebanFuentealba/react-native-share
// import Share, {ShareSheet} from 'react-native-share';

import ShareButton from '../../components/Buttons/ShareButton';


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

  render(){
    let data = this.props;
    // console.log('data.attachments[0]==>' + JSON.stringify(data.attachments[0].images));
    let viewNews = () => Actions.ViewNews({post: data});
    let listNewsByCat = () => {
      Actions.ListNewsByCat({
        catId: data.categories[0].id,
        title: data.categories[0].title,
        type: ActionConst.RESET});
    };
    let regex = /(<([^>]+)>)/ig;
    // var body = "<p>test</p>"
    // var result = body.replace(regex, "");
    return(
      <View style={styles.container}>
        <TouchableOpacity activeOpacity={1} onPress={viewNews}>
          <View style={[GlobalStyles.parentRow, styles.header]}>
            <View style={[GlobalStyles.row, styles.left]}>
              <Text onPress={listNewsByCat} style={styles.category}>{data.categories[0].title.toUpperCase()}</Text>
              <Text style={styles.date}>{Moment(data.date).format('D/M/YYYY')}</Text>
            </View>
            <View style={[GlobalStyles.row, styles.right]}>
              <ShareButton
                title={data.title}
                url={data.url}
                message={data.title}
                subject={data.title}
                style={[styles.shareButton]}
              />
            </View>
          </View>
          <Text style={styles.title}>
            <HTMLView value={data.title} />
          </Text>
          { (data.thumbnail) && <Image style={styles.imageContent} source={{uri:data.thumbnail_images.medium.url}}/>}
          <View style={styles.wrapContent}>
            <HTMLView
              value={data.excerpt.trim().replace(regex, '')}
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
    borderWidth: 1,
    padding:0,
    marginBottom:0,
    color: Colors.defaultTextColor,
  },
});

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
  header: {
    paddingHorizontal: 10,
    paddingTop: 8,
    paddingBottom: 10,
  },
  category: {
    color: Colors.themeRed,
    fontWeight: '700',
    marginRight: 15,
  },
  date: {
    color: '#555'
  },
  imageContent: {
    height: 150,
    width: Layouts.window.width,
    marginBottom: 10,
  },
  wrapContent: {
    paddingHorizontal: 10,
    paddingBottom: 15,
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
  shareButton: {
    tintColor: Colors.themeRed,
  },
  left: {
    flexDirection: 'row',
  },
  right: {
    // borderWidth: 1,
    flex: 0.25,
    alignItems: 'flex-end',
    top: -5,
    right: 0,
    position: 'absolute',
  }


});

export default Row;
