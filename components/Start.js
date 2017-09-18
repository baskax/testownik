import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, AsyncStorage } from 'react-native';
import Questions from '../pytania.json';


export default class Start extends Component {

  constructor(props) {
    super(props);
    this.state = {
      questions: Questions.pytania,
      actual: {},
      chosen: '',
      done: 0,
      correct: 0,
      abtn:{backgroundColor: '#cfd8dc'},
      bbtn:{backgroundColor: '#cfd8dc'},
      cbtn:{backgroundColor: '#cfd8dc'},
      dbtn:{backgroundColor: '#cfd8dc'},
      atxt:{color: '#7b8d93'},
      btxt:{color: '#7b8d93'},
      ctxt:{color: '#7b8d93'},
      dtxt:{color: '#7b8d93'},
    };
    this.checkAnswer = this.checkAnswer.bind(this);
    this.getNext = this.getNext.bind(this);
    this.chooseOption = this.chooseOption.bind(this);
  }

  static navigationOptions = {
    title: "Test"
  };

  checkAnswer() {
    if(this.state.actual.poprawna === this.state.chosen) {
      this.setState({
        [this.state.actual.poprawna+'btn']:{backgroundColor:'#349434'},
        [this.state.actual.poprawna+'txt']:{color:'#FFFFFF'},
        correct:this.state.correct+1,
        done:this.state.done+1
      });
      this.saveProgress(this.state.actual.id);
    } else {
      this.setState({
        [this.state.actual.poprawna+'btn']:{backgroundColor:'#349434'},
        [this.state.actual.poprawna+'txt']:{color:'#FFFFFF'},
        [this.state.chosen+'btn']:{backgroundColor:'#943434'},
        [this.state.chosen+'txt']:{color:'#FFFFFF'},
        done:this.state.done+1
    });
    this.saveProgress();
    }

    this.getNext();
  }

  increaseCorrect() {
    AsyncStorage.getItem('correct').then((saved) => {
        AsyncStorage.setItem('correct', saved+1);
    }).catch((err) => {
        AsyncStorage.setItem('correct', 0);
    });
  }

  increaseAll() {
    AsyncStorage.getItem('all').then((saved) => {
        AsyncStorage.setItem('all', saved+1);
    }).catch((err) => {
        AsyncStorage.setItem('all', 0);
    });
  }

  saveProgress(qid = null) {
    if(qid) { //there is question id so the answer is correct
      this.increaseAll();
      this.increaseCorrect();
      qid = String(qid);
      AsyncStorage.getItem('qid').then((saved) => {
        console.log(saved);
        AsyncStorage.setItem('qid', saved+1);
      }).done().catch((err) => {
        console.log(err);
        AsyncStorage.setItem('qid', 0);
      })

      AsyncStorage.getItem('goodQuestions').then((saved) => {
        saved.push(qid);
        AsyncStorage.setItem('goodQuestions', saved);
      }).catch((err) => {
        var learnt = new Set(qid);
        AsyncStorage.setItem('goodQuestions', learnt);
      })
    } else {
      this.increaseAll();
    }




  }


  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  componentDidMount() {
    this.getRandomQuestion();
  }

  resetButtons() {
    this.setState({
      abtn:{backgroundColor: '#cfd8dc'},
      bbtn:{backgroundColor: '#cfd8dc'},
      cbtn:{backgroundColor: '#cfd8dc'},
      dbtn:{backgroundColor: '#cfd8dc'},
      atxt:{color: '#7b8d93'},
      btxt:{color: '#7b8d93'},
      ctxt:{color: '#7b8d93'},
      dtxt:{color: '#7b8d93'}});
  }

  chooseOption(option) {
    //ustaw jak bylo
    this.resetButtons();
    this.setState({
      chosen:option,
      [option+'btn']:{backgroundColor:'#7b8d93'},
      [option+'txt']:{color:'#FFFFFF'}
    });
  }

  getNext() {
    setTimeout(() => {this.getRandomQuestion()}, 2000)
  }

  getRandomQuestion() {
    this.resetButtons();
    let question = this.getRandomInt(0,this.state.questions.length);
    let actual = this.state.questions[question];
    actual.id = question
    this.setState({actual:actual});
  }

  render() {
    return(
      <View style={styles.container}>
      <Text style={styles.category}>{this.state.actual.kategoria}</Text>
      <View style={styles.questionbox}>
      <Text style={styles.question}>{this.state.actual.tresc}</Text>
      </View>
      <View style={styles.halfbox}>
      <TouchableHighlight style={[buttonStyles.button, buttonStyles.spacer, this.state.abtn]} underlayColor="#7b8d93" onPress={() => {this.chooseOption('a')}}><Text style={[buttonStyles.text, this.state.atxt]}>{this.state.actual.a}</Text></TouchableHighlight>
      <TouchableHighlight style={[buttonStyles.button, buttonStyles.spacer, this.state.bbtn]} underlayColor="#7b8d93" onPress={() => {this.chooseOption('b')}}><Text style={[buttonStyles.text, this.state.btxt]}>{this.state.actual.b}</Text></TouchableHighlight>
      <TouchableHighlight style={[buttonStyles.button, buttonStyles.spacer, this.state.cbtn]} underlayColor="#7b8d93" onPress={() => {this.chooseOption('c')}}><Text style={[buttonStyles.text, this.state.ctxt]}>{this.state.actual.c}</Text></TouchableHighlight>
      <TouchableHighlight style={[buttonStyles.button, buttonStyles.spacer, this.state.dbtn]} underlayColor="#7b8d93" onPress={() => {this.chooseOption('d')}}><Text style={[buttonStyles.text, this.state.dtxt]}>{this.state.actual.d}</Text></TouchableHighlight>
      </View>
      <View style={styles.checkContainer}>
      <TouchableHighlight style={[buttonStyles.button, buttonStyles.check, buttonStyles.spacer]} underlayColor="#7b8d93" onPress={() => {this.checkAnswer()}}><Text style={buttonStyles.text}>Sprawdź</Text></TouchableHighlight>
      </View>
      <Text style={[styles.footer, buttonStyles.spacer]}>Udzielonych odpowiedzi: {this.state.done}, poprawnych: {this.state.correct}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#f3f3f3',
  },
  questionbox: {
    flex: 1,
    position: 'absolute',
    top: 10
  },
  halfbox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  checkContainer: {
    position: 'absolute',
    bottom: 20
  },
  question: {
    color: '#7b8d93',
    fontSize: 20,
    textAlign: 'left',
    margin: 10,
  },
  category : {
    color: '#7b8d93',
    fontSize: 10,
    textAlign: 'right',
    fontWeight: 'bold',
    position: 'absolute',
    top: 0,
    right: 5

  },
  footer: {
    color: '#7b8d93',
    fontSize: 10,
    textAlign:'center'
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
    width: 250,
    alignItems: 'center'
  },
  check: {
    width: 150
  },
  spacer: {
    marginBottom: 15
  },
  text: {
    fontSize: 12,
    color: '#7b8d93'
  }
});
