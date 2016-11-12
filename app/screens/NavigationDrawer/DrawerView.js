'use strict';
import React, { PropTypes } from 'react';
import {StyleSheet, Text, View, StatusBar, ScrollView, Image, TouchableOpacity} from 'react-native';
// import Button from 'react-native-button';
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
      <TouchableOpacity key={i} onPress={() => { drawer.close(); Actions.ListNewsByCat({catId: cat.id, title: cat.title, type: ActionConst.PUSH}); }}>
        <View style={styles.catWrap}>
          <Image source={catIcon} style={styles.catIcon}/>
          <Text style={styles.catTitle}>{cat.title}</Text>
        </View>
      </TouchableOpacity>
    );
  });
  return (
    <View style={[styles.container ]}>
      <StatusBar hidden={true} />
      <TouchableOpacity onPress={() => { drawer.close(); Actions.ListNews(); }}>
        <Text style={styles.home}>Depan</Text>
      </TouchableOpacity>

      <Text style={styles.catHeader}>Kategori</Text>
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
    color: 'white',
    fontSize: 18,
    alignSelf: 'center',
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
    width: 20,
    height: 20,
    tintColor: '#A8B2C0',
    marginRight: 15,
    marginLeft: 5,
  },
  catTitle: {
    fontSize: 18,
    color: '#A8B2C0',
    alignSelf:'flex-start',
    fontWeight: 'normal',
  }
});

export default TabView;
