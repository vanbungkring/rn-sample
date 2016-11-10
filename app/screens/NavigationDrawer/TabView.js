import React from 'react';
import {PropTypes} from "react";
import {StyleSheet, Text, View} from "react-native";
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    borderWidth: 2,
    borderColor: 'red',
  },
});

const TabView = (props, context) => {
  const drawer = context.drawer;
  const json = require('./category.json');
  const categories = json.categories;
  console.log('categories==> '+JSON.stringify(categories));
  const catItems = categories.map((cat, i) => {
    return (
      <Button key={cat.id} onPress={() => { drawer.close(); Actions.ListNewsByCat({cat: cat, title: cat.title}); }}>{cat.title}</Button>
    );
  });
  return (
    <View style={[styles.container ]}>
      <Text>Category</Text>
      {catItems}
    </View>
  );
};

TabView.contextTypes = contextTypes;
TabView.propTypes = propTypes;

export default TabView;
