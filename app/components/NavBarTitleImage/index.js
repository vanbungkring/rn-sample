'use strict';
import React, { Component } from 'react';
import { Image } from 'react-native';

import GlobalStyles from '../../constants/Styles';

export default class NavBarTitleImage extends Component {
  render() {
    const navbarImage = require('../../assets/images/logo.png');
    return(
      <Image source={navbarImage} style={[GlobalStyles.navbarImage, this.props.style]}/>
    );
  }
}
