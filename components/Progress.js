import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, AsyncStorage } from 'react-native';
import Questions from '../pytania.json';

export default class Progress extends Component {

  constructor(props) {
    super(props);
    this.state = {
      questions: Questions.pytania,
      done: 0
    }
  }

  componentDidMount() {
    AsyncStorage.getItem('correct').then((saved) => {
      if(saved !== null) this.setState({done:saved});
    }).done();
  }

  static navigationOptions = {
    title: "Postępy"
  };

  render() {
    return(
      <View><Text>Tu sie kurwa cos dzieje! {this.state.done}</Text></View>
    );
  }
}
