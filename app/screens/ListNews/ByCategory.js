'use strict';
import React, { Component } from 'react';
import {
  View, Text,
  ListView,
  RefreshControl,
  ActivityIndicator,
  StyleSheet,
 } from 'react-native';
// import { Actions } from 'react-native-router-flux';


import Api from '../../helper/Api';
import GlobalStyles from '../../constants/Styles';
import Row from './RowCell';

// var API_URL = 'https://facebook.github.io/react-native/movies.json'
var API_URL = Api.getCategoryPostsById;

export default class ListNews extends Component {
  constructor(props) {
      super(props);
      this.state = {
        dataSource: new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2,
        }),
        loaded: false,
        refreshing: false,
        catId: this.props.catId,
        catTitle: this.props.title,
        currentPage: 0,
        totalPages: 0,
      };
      this._onRefresh = this._onRefresh.bind(this);
      this._onEndReached = this._onEndReached.bind(this);

    }

  componentDidMount() {
    this.setState({ catId: this.props.catId });
    this.fetchData(true);
  }

  // componentWillReceiveProps() {
  //   // console.log('Item count on componentWillReceiveProps:', props.items.length);
  //   // this.setState({ catId: this.props.catId});
  //   // console.log('catId==> '+this.state.catId);
  // }

  fetchData(refresh) {
    if(refresh){
      this.nextPage = 1;
    }
    // get the data url of next page
    var nextDataUrl = API_URL+this.state.catId + '&page=' + this.nextPage;
    fetch(nextDataUrl, {
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
        let newRows;
        let result = (responseData.count>0) ? responseData.posts : [];
        this.setState({totalPages : responseData.pages});
        // console.log('page/totpage==>' +this.nextPage+'/'+this.state.totalPages);
        if (refresh) {
          newRows = result;
        } else {
          // add new rows into dataSource
          if (this.nextPage<= this.state.totalPages) {
            newRows = this.getRows().concat(result);
          } else {
            newRows = this.getRows();
            // alert(this.state.totalPages);
          }
        }
        this.setState({currentPage : this.nextPage});

        var newDataSource = this.state.dataSource.cloneWithRows(newRows);
        this.setState({
          dataSource: newDataSource,
          loaded: true,
          refreshing: false,
        });
        this.nextPage++;

      })
      .catch((error) => {
        console.error(error);
      })
      .done();
  }

  // get all rows of dataSource
  getRows() {
    var result = this.state.dataSource && this.state.dataSource._dataBlob && this.state.dataSource._dataBlob.s1;
    return result ? result : [];
  }

  // whether no row in dataSource
  isEmpty(){
    return this.getRows().length == 0;
  }

  _onRefresh() {
    this.setState({refreshing: true});
    this.fetchData(true);
    // this.fetchData().then(() => {
    //   this.setState({refreshing: false});
    // });
  }

  _onEndReached() {
    this.setState({refreshing: true});
    this.fetchData(false);
    // alert('end')
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }
    if(this.isEmpty()){
      return (
        <View style={GlobalStyles.container}>
          <Text style={styles.emptyTxt}>Tidak ada artikel dalam kategori {this.state.catTitle}.</Text>
        </View>
      );
    }
    return (
      <View style={GlobalStyles.container}>
        <ListView
          ref='scrollView'
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
          dataSource={this.state.dataSource}
          renderRow={(data) => <Row {...data} />}
          onEndReached={this._onEndReached}
          renderFooter={() => this._renderFooter() }
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

  _backToTop() {
    // this.refs.scrollView.scrollTo(0);
  }

  _renderFooter(){
    return(
      <Text style={styles.footer} onPress={this._backToTop}>
        { (this.state.currentPage>=this.state.totalPages) && '--o0o--' }
        { (this.state.currentPage>1 && !this.state.loaded) && 'Memuat ...' }
      </Text>

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
  emptyTxt: {
    alignSelf: 'center',
    paddingVertical: 30,
    paddingHorizontal: 30,
    textAlign: 'center',
  },
  footer: {
    paddingVertical: 10,
    paddingBottom: 20,
    color: '#888',
    alignSelf: 'center'
  }
});
