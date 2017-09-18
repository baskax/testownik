/**
* Sample React Native App
* https://github.com/facebook/react-native
* @flow
*/

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  BackHandler
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Start from './components/Start';

class TestownikScreen extends Component {
  static navigationOptions = {
    title: "Testownik"
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.halfbox}>
          <Text style={styles.title}>TESTOWNIK</Text>
        </View>
        <View style={styles.halfbox}>
          <TouchableHighlight style={[buttonStyles.button, buttonStyles.spacer]} underlayColor="#7b8d93" onPress={() => navigate('Start')}><Text style={buttonStyles.text}>START</Text></TouchableHighlight>
          <TouchableHighlight style={[buttonStyles.button, buttonStyles.spacer]} underlayColor="#7b8d93" onPress={() => {}}><Text style={buttonStyles.text}>TESTOWNIKI</Text></TouchableHighlight>
          <TouchableHighlight style={[buttonStyles.button, buttonStyles.spacer]} underlayColor="#7b8d93" onPress={() => {}}><Text style={buttonStyles.text}>POSTĘPY</Text></TouchableHighlight>
          <TouchableHighlight style={[buttonStyles.button, buttonStyles.spacer]} underlayColor="#7b8d93" onPress={() => {BackHandler.exitApp()}}><Text style={buttonStyles.text}>WYJDŹ</Text></TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#262d2f',
  },
  halfbox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: '#f5f5f5',
    fontSize: 48,
    textAlign: 'center',
    margin: 10,
  }
});
const buttonStyles = StyleSheet.create({
  button: {
    borderWidth: 0,
    backgroundColor: '#cfd8dc',
    borderRadius: 5,
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    width: 150,
    alignItems: 'center'
  },
  spacer: {
    marginBottom: 15
  },
  text: {
    fontSize: 20,
    color: '#262d2f'
  }
});

export default Testownik = StackNavigator({
  Menu: { screen: TestownikScreen },
  Start: { screen: Start }
});

AppRegistry.registerComponent('Testownik', () => Testownik);
