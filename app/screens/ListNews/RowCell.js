'use strict';

import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';

import { Actions } from 'react-native-router-flux';

import GLOBAL from '../../constants/Global';
// https://github.com/TylerLH/react-native-timeago
import TimeAgo from 'react-native-timeago';
import Moment from 'moment';
import Striptags from 'striptags';
import HTMLView from 'react-native-htmlview';

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

    return(
      <View style={styles.container}>
        <TouchableOpacity activeOpacity={1} onPress={viewNews}>
          { (data.thumbnail) && <Image style={styles.imageContent} source={{uri:data.thumbnail}}/>}
          <Text style={styles.title}>{data.title}</Text>
          <HTMLView
            value={data.excerpt}
          />
        </TouchableOpacity>
      </View>

    );
  }
}

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    borderWidth: StyleSheet.hairlineWidth,
    margin: 5,
    padding: 5,
    borderColor: '#ccc',
    borderBottomColor: '#bbb',
    borderBottomWidth: 1.5,
    borderRadius: 3
  },
  imageContent: {
    height: 100,
    width: 200,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    height:50,
    padding: 4,
  },
  accThumbnail: {
    width: 35,
    height: 35,
    borderRadius: 17,
    // backgroundColor: 'gray',
    marginRight: 8,
    marginTop: 0,
  },
  accName: {
    fontSize:13,
    color:'#777'
  },
  publishDate: {
    color: '#999',
    fontSize:11,
    marginTop:2,
  },
  title: {
    fontSize: 14,
    marginBottom: 8,
    textAlign: 'left',
    color: '#666',
  },
  image: {
    height: 150,
    // paddingHorizontal: -15,
    marginHorizontal: -5,
  },
  donationProgress: {
    // flex: 1,
    alignItems:'center',
    paddingVertical: 8,
    //alignSelf: 'stretch',
    // borderColor: 'red',
    // borderWidth: 1,

  },
  progressBar: {
    marginVertical: 6,
    alignItems: 'stretch',
    flexDirection: 'row',
  },

  footer: {
    flex:1,
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'center',
    borderTopColor: '#E5E4E2',
    borderTopWidth: StyleSheet.hairlineWidth,
    height: 40,
    // justifyContent: 'space-between',
    paddingTop: 4,
    paddingHorizontal: 7
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    // backgroundColor: 'green',
    width: 100,
  },
  centerContainer: {
    fontSize: 12,
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'row',
    width: 5,

  },
  shareText: {
    marginRight: 20,
    fontSize: 12,
    color: GLOBAL.COLOR.MP_GREEN

  },
  donateText: {
    fontSize: 10,
    alignItems: 'center',
    color: 'white'
  },
  viewText: {
    fontSize: 12,
    color: GLOBAL.COLOR.MP_GREY
  },

  btnDonate: {
    backgroundColor: GLOBAL.COLOR.MP_ORANGE,
    height: 26,
    borderRadius:15,
    justifyContent: 'center',
    paddingHorizontal: 10
  },
  btnDonateProject: {
    paddingHorizontal: 50,
  },
  progressAmt: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#555'
  }



});

export default Row;
