import React, { Component } from 'react';
import {
  View, Text,
  ListView,
  RefreshControl,
  ActivityIndicator,
  StyleSheet,
 } from 'react-native';
import { Actions } from 'react-native-router-flux';


import GLOBAL from '../../constants/Global';
import GlobalStyles from '../../constants/Styles';
import Row from './RowCell';

// var API_URL = 'https://facebook.github.io/react-native/movies.json'
var API_URL = 'http://islami.co/api/get_recent_posts/';


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
        });
      })
      .catch((error) => {
        console.error(error);
      })
      .done();
  }

  _onRefresh() {
    this.setState({refreshing: true});
    // fetchData().then(() => {
    //   this.setState({refreshing: false});
    // });
    this.fetchData();
    this.setState({refreshing: false});
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }
    const goToPageTwo = () => Actions.ViewNews({text: 'Hello World!'});
    return (
      <View style={{marginTop: 150}}>
        <Text onPress={goToPageTwo}>Press to go to next page</Text>
        <ListView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          }
          dataSource={this.state.dataSource}
          // renderRow={this.renderList}
          renderRow={(data) => <Row {...data} />}
          style={styles.listView}
        />
      </View>
    )
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

  renderList(data) {
    //console.log('gambar--'+data.postMeta.images[0]);
    return (
      <View style={styles.container}>
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{data.title}</Text>
          <Text style={styles.title}>{data.releaseYear}</Text>
        </View>
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
    marginTop:20,
    paddingTop: 3,
    backgroundColor: '#F5FCFF',
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    marginTop: 10,
  },
});
