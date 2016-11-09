'use strict';

import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';

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

  addHttps(uri){
    return (uri?uri.replace("http", "https"):uri);
  }

  imgTransform(url, transform) {
      transform = transform == null ? 'h_100,q_80,c_fit' : transform;
      var pattern = /upload/i;
      var newPattern = 'upload/' + transform;
      //url = url !== null ? url.replace(pattern, newPattern) : url;
      if (typeof url !== "undefined") {
        url = url.replace(pattern, newPattern);
        url = url.replace("http", "https");
      } else {
        url = url
      }
      return url;
  }

  renderDonationProgress(){
    return(
      <View style={styles.donationProgress}>
        <Text style={styles.viewText}> 122 / 222</Text>
        <Text style={styles.viewText}> 122 / 222</Text>
      </View>
    );
  }

  renderFooter(data){
    // 3=project
    if (data.postType==3) {
      return(
        //{this.renderDonationProgress()}
        <View>
          <View style={styles.donationProgress}>
            <Text style={[styles.viewText, styles.progressAmt]}> $xx / ${data.project.fundRaisingMax}</Text>
            <Text style={styles.viewText}> raised by xx donors</Text>
            <Progress.Bar color={GLOBAL.COLOR.MP_GREEN} unfilledColor={'#ccc'} progress={0.9} borderRadius={2} width={320} height={5} borderWidth={0} style={styles.progressBar}/>
            <TouchableOpacity activeOpacity={0.8} style={[styles.btnDonate, styles.btnDonateProject]} onPress={this._goToDonate.bind(this, this.props)}>
              <Text style={styles.donateText}>DONATE TO THIS PROJECT</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.footer}>
            <View style={styles.leftContainer}>
              <TouchableOpacity activeOpacity={0.8} style={styles.btnShare} onPress={this._sharePost.bind(this, this.props)}>
                <Text style={styles.shareText}>SHARE</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.viewText}> {data.views} Views</Text>
          </View>
        </View>
      );
    } else {
      return(
        <View style={styles.footer}>
          <View style={styles.leftContainer}>
            <TouchableOpacity activeOpacity={0.8} underlayColor='#35b5ff' style={styles.btnShare} onPress={this._sharePost.bind(this, this.props)}>
              <Text style={styles.shareText}>SHARE</Text>
            </TouchableOpacity>
            <Text style={styles.viewText}> {data.views} Views</Text>
          </View>
          <TouchableOpacity activeOpacity={0.8} underlayColor='#35b5ff' style={styles.rightContainer,styles.btnDonate} onPress={this._goToDonate.bind(this, this.props)}>
            <Text style={styles.donateText}>DONATE NOW</Text>
          </TouchableOpacity>
        </View>
      );
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

  _postDetail(data) {
    this.props.navigator.push(Router.getRoute('postdetail', {data: data}));
  }

  _goToDonate(data) {
    this.props.navigator.push(Router.getRoute('donate', {data: data._creator}));
  }

  render(){
    var data = this.props;
    // console.log('data.attachments[0]==>' + JSON.stringify(data.attachments[0].images));
    var imageParent = data.attachments[0];
    console.log(imageParent);
    return(
      <View style={styles.container}>
        <TouchableOpacity activeOpacity={1} onPress={this._postDetail.bind(this, this.props)}>
          <Text style={styles.title}>{data.title}</Text>
          <Text style={styles.title}>{data.thumbnail}</Text>
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
