import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Alert,
  Dimensions
} from "react-native";
import axios from "axios";
import { decode } from "base-64";
import * as Colors from "../colors";
import { Button, Divider } from "react-native-elements";

type Props = {};
export default class Trivia extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      trivia: [
        {
          category: "",
          type: "",
          difficulty: "",
          question: "",
          correct_answer: "",
          incorrect_answers: ["", "", ""]
        }
      ],
      lastQuestion: 1,
      index: 0,
      possibleAnswers: [" ", "", " ", " "],
      correctAnswer: "",
      color0: Colors.bottomDefaultColor,
      color1: Colors.bottomDefaultColor,
      color2: Colors.bottomDefaultColor,
      color3: Colors.bottomDefaultColor,
      alreadyAnswered: false,
      score: 0
    };
  }

  getDifficultyLevel(level) {
    switch (level) {
      case 1:
        return "easy";
        break;
      case 2:
        return "medium";
        break;
      case 3:
        return "hard";
        break;

      default:
        break;
    }
  }

  componentDidMount() {
    const { navigation } = this.props;
    const difficulty = this.getDifficultyLevel(
      navigation.getParam("difficulty", 1)
    );
    const questionsQty = navigation.getParam("questionsQty", 10);
    const token = navigation.getParam("token", 10);
    const url = `https://opentdb.com/api.php?amount=${questionsQty}&difficulty=${difficulty}&token=${token}&type=multiple&encode=base64`;

    axios
      .get(url)
      .then(res => {
        const trivia = res.data.results;
        this.setState({ trivia, lastQuestion: trivia.length });
        this.getAnwers();
      })
      .catch(err => {
        Alert.alert(err.message);
      });
  }

  verify(answer) {
    const { navigation } = this.props;
    const difficulty = navigation.getParam("difficulty", 1);

    if (!this.state.alreadyAnswered) {
      this.setState({ alreadyAnswered: true });
      var correct =
        this.state.possibleAnswers[answer] == this.state.correctAnswer;

      var newColor = correct ? Colors.correct : Colors.wrong;
      switch (answer) {
        case 0:
          this.setState({ color0: newColor });
          setTimeout(() => {
            this.setState({ color0: Colors.bottomDefaultColor });
            this.nextQuestion();
          }, 1500);
          break;
        case 1:
          this.setState({ color1: newColor });
          setTimeout(() => {
            this.setState({ color1: Colors.bottomDefaultColor });
            this.nextQuestion();
          }, 1500);
          break;
        case 2:
          this.setState({ color2: newColor });
          setTimeout(() => {
            this.setState({ color2: Colors.bottomDefaultColor });
            this.nextQuestion();
          }, 1500);
          break;
        case 3:
          this.setState({ color3: newColor });
          setTimeout(() => {
            this.setState({ color3: Colors.bottomDefaultColor });
            this.nextQuestion();
          }, 1500);
          break;
        default:
          break;
      }

      correct ? this.setState({ score: this.state.score + difficulty }) : false;
    }
  }

  nextQuestion() {
    if (this.state.index + 1 != this.state.lastQuestion) {
      this.setState({ alreadyAnswered: false, index: this.state.index + 1 });
      this.getAnwers();
    } else {
      this.setState({ index: this.state.lastQuestion - 1 });
      this.endGame();
    }
  }

  endGame() {
    this.props.navigation.navigate("EndGame", {
      finalScore: this.state.score
    });
  }

  getQuestion() {
    if (this.state.index < this.state.lastQuestion) {
      return decode(this.state.trivia[this.state.index].question);
    } else {
      return decode(this.state.trivia[this.state.lastQuestion - 1].question);
    }
  }

  getCategory() {
    if (this.state.index < this.state.lastQuestion) {
      return decode(this.state.trivia[this.state.index].category);
    } else {
      return decode(this.state.trivia[this.state.lastQuestion - 1].category);
    }
  }

  getAnwers() {
    var index = 0;
    if (this.state.index < this.state.lastQuestion) {
      index = this.state.index;
    } else {
      index = this.state.lastQuestion - 1;
    }
    const correctAnswer = decode(this.state.trivia[index].correct_answer);
    var allAnswers = [];
    allAnswers = this.state.trivia[index].incorrect_answers.map(answer =>
      decode(answer)
    );

    allAnswers.push(correctAnswer);
    allAnswers.sort();

    this.setState({ possibleAnswers: allAnswers, correctAnswer });
  }

  render() {
    var screenWidth80 = (Dimensions.get("screen").width / 100) * 80;

    return (
      <View style={styles.container}>
        <View style={styles.containerQuestions}>
          <Text style={styles.text}>
            {this.state.index + 1} / {this.state.lastQuestion}
          </Text>
          <Divider
            style={{
              backgroundColor: Colors.bottomDefaultColor,
              width: screenWidth80,
              height: 2
            }}
          />
          <Text style={styles.text}>Score: {this.state.score}</Text>
          <Divider
            style={{
              backgroundColor: Colors.bottomDefaultColor,
              width: screenWidth80,
              height: 1.5
            }}
          />
          <Text style={styles.text}>{this.getCategory()}</Text>
          <Divider
            style={{
              backgroundColor: Colors.bottomDefaultColor,
              width: screenWidth80,
              height: 1.5
            }}
          />
          <Text style={styles.text}>{this.getQuestion()}</Text>
          <Divider
            style={{
              backgroundColor: Colors.bottomDefaultColor,
              width: screenWidth80,
              height: 1.5
            }}
          />
        </View>
        <View style={styles.containerOptions}>
          <Button
            title={this.state.possibleAnswers[0]}
            buttonStyle={{
              ...styles.buttonStyle,
              backgroundColor: this.state.color0
            }}
            titleStyle={styles.buttonTitle}
            onPress={() => this.verify(0)}
          />
          <Button
            title={this.state.possibleAnswers[1]}
            buttonStyle={{
              ...styles.buttonStyle,
              backgroundColor: this.state.color1
            }}
            titleStyle={styles.buttonTitle}
            onPress={() => this.verify(1)}
          />

          <Button
            title={this.state.possibleAnswers[2]}
            buttonStyle={{
              ...styles.buttonStyle,
              backgroundColor: this.state.color2
            }}
            titleStyle={styles.buttonTitle}
            onPress={() => this.verify(2)}
          />
          <Button
            title={this.state.possibleAnswers[3]}
            buttonStyle={{
              ...styles.buttonStyle,
              backgroundColor: this.state.color3
            }}
            titleStyle={styles.buttonTitle}
            onPress={() => this.verify(3)}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background
  },
  containerQuestions: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background
  },
  containerOptions: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    color: Colors.textColor
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },
  buttonStyle: {
    width: 300,
    height: 50,
    marginTop: 5
  },
  buttonTitle: {
    color: Colors.textColor
  }
});
