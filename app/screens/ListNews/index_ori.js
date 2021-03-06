'use strict';
import React, { Component } from 'react';
import {
  View,
  ListView,
  RefreshControl,
  ActivityIndicator,
  StyleSheet,
  StatusBar
 } from 'react-native';
// import { Actions } from 'react-native-router-flux';


import Api from '../../helper/Api';
import GlobalStyles from '../../constants/Styles';
import Row from './RowCell';

// var API_URL = 'https://facebook.github.io/react-native/movies.json'
var API_URL = Api.getRecentPosts;


export default class ListNews extends Component {
  constructor(props) {
      super(props);
      this.state = {
        dataSource: new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2,
        }),
        loaded: false,
        refreshing: false,
      };
      this._onRefresh = this._onRefresh.bind(this);
      this._onEndReached = this._onEndReached.bind(this);
    }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch(API_URL, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        // 'Authorization': 'Basic ' + base64.encode(USERNAME+':'+PASSWORD),
      },
      // body: JSON.stringify({
        // username: USERNAME,
        // basicAuthKey: PASSWORD,
      // })
    })
      .then((response) => response.json())
      .then((responseData) => {
        // console.log(responseData.posts);
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.posts),
          loaded: true,
          refreshing: false,
        });
      })
      .catch((error) => {
        console.error(error);
      })
      .done();
  }

  _onRefresh() {
    this.setState({refreshing: true});
    // this.fetchData().then(() => {
    //   this.setState({refreshing: false});
    // });
    this.fetchData();
  }

  _onEndReached() {
    // this.setState({refreshing: true});
    // this.fetchData();
    // alert('end')
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }
    return (
      <View style={GlobalStyles.container}>
        <StatusBar hidden={false} barStyle="light-content" />
        <ListView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
          dataSource={this.state.dataSource}
          renderRow={(data) => <Row {...data} />}
          onEndReached={this._onEndReached}
          style={styles.listView}
        />
      </View>
    );
  }

  renderLoadingView() {
    return (
      <View style={GlobalStyles.container}>
        <ActivityIndicator
          animating={!this.state.loaded}
          style={[styles.centering]}
          size="large"
        />
      </View>
    );
  }


}




var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  rightContainer: {
    flex: 1,
  },
  title: {
    fontSize: 12,
    marginBottom: 8,
    textAlign: 'left',
  },
  year: {
    textAlign: 'center',
  },
  thumbnail: {
    width: 53,
    height: 81,
  },
  listView: {
    marginTop: 0,
    paddingTop: 3,
    backgroundColor: '#eee',
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    marginTop: 10,
  },
});
