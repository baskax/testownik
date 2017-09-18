import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, AsyncStorage } from 'react-native';
import Questions from '../pytania.json';

export default class Progress extends Component {

  constructor(props) {
    super(props);
    this.state = {
      questions: Questions.pytania,
    }
  }

  static navigationOptions = {
    title: "Postępy"
  };

  render() {
    return(
      <View/>
    );
  }
}
