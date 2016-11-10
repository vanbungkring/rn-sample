import React from 'react';
import {PropTypes} from "react";
import {StyleSheet, Text, View, StatusBar, ScrollView} from "react-native";
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';

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
  console.log('categories==> '+JSON.stringify(categories));
  const catItems = categories.map((cat, i) => {
    return (
      <View key={cat.id} style={styles.catWrap}>
        <Button style={styles.catTitle} onPress={() => { drawer.close(); Actions.ListNewsByCat({cat: cat, title: cat.title}); }}>{cat.title}</Button>
      </View>
    );
  });
  return (
    <View style={[styles.container ]}>
      <StatusBar hidden={true} />
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
  catHeader: {
    backgroundColor: '#383C41',
    color: '#A8B2C0',
    paddingHorizontal: 10,
    paddingVertical: 15,
    fontSize: 18,
  },
  catWrap: {
    borderTopWidth: 1,
    borderTopColor: '#555',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#000000',
    paddingVertical: 10,
    paddingHorizontal: 10,

  },
  catTitle: {
    fontSize: 18,
    color: '#A8B2C0',
    alignSelf:'flex-start',
    fontWeight: 'normal',

  }
});

export default TabView;
