'use strict';
import React, { PropTypes } from 'react';
import {StyleSheet, Text, View, StatusBar, ScrollView, Image} from 'react-native';
import Button from 'react-native-button';
import { Actions, ActionConst } from 'react-native-router-flux';

const contextTypes = {
  drawer: React.PropTypes.object,
};

const propTypes = {
  name: PropTypes.string,
  sceneStyle: View.propTypes.style,
  title: PropTypes.string,
};

const TabView = (props, context) => {
  const drawer = context.drawer;
  const json = require('./category.json');
  const categories = json.categories;
  // console.log('categories==> '+JSON.stringify(categories));
  const catIcon = require('../../assets/icons/category.png');
  const catItems = categories.map((cat, i) => {
    return (
      <View key={i} style={styles.catWrap}>
        <Image source={catIcon} style={styles.catIcon}/>
        <Button style={styles.catTitle} onPress={() => { drawer.close(); Actions.ListNewsByCat({catId: cat.id, title: cat.title, type: ActionConst.RESET}); }}>{cat.title}</Button>
      </View>
    );
  });
  return (
    <View style={[styles.container ]}>
      <StatusBar hidden={true} />
      <Button style={styles.home} onPress={() => { drawer.close(); Actions.ListNews(); }}>Home</Button>
      <Text style={styles.catHeader}>Category</Text>
      <ScrollView>
        {catItems}
      </ScrollView>
    </View>
  );
};

TabView.contextTypes = contextTypes;
TabView.propTypes = propTypes;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#22262B',
    // borderWidth: 1,
    borderColor: 'red',
  },
  home: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    paddingTop: 34,
  },
  catHeader: {
    backgroundColor: '#383C41',
    color: '#A8B2C0',
    paddingHorizontal: 10,
    paddingVertical: 10,
    // paddingTop: 32,
    fontSize: 18,
  },
  catWrap: {
    borderTopWidth: 1,
    borderTopColor: '#555',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#000000',
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: 'row'
  },
  catIcon: {
    width: 25,
    height: 25,
    tintColor: '#A8B2C0',
    marginRight: 10,
  },
  catTitle: {
    fontSize: 18,
    color: '#A8B2C0',
    alignSelf:'flex-start',
    fontWeight: 'normal',
  }
});

export default TabView;
