import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from "react-native";
import Header from "./navigatorComponents/Header";
import { Slider, Button } from "react-native-elements";
import Axios from "axios";
import * as Colors from "../colors";

type Props = {};
export default class Main extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      questionsQty: 10,
      difficulty: 2,
      token: ""
    };
  }

  componentDidMount() {
    Axios.get("https://opentdb.com/api_token.php?command=request")
      .then(res => {
        this.setState({ token: res.data.token });
      })
      .catch(err => {
        Alert.alert(err.message);
      });
  }

  getDifficultyLabel(level) {
    switch (level) {
      case 1:
        return "Easy";
        break;
      case 2:
        return "Medium";
        break;
      case 3:
        return "Hard";
        break;

      default:
        break;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Header />
        <View style={styles.container}>
          <Text style={styles.text}>How Many Questions? </Text>
          <Text style={styles.textSmall}>{this.state.questionsQty}</Text>
          <Slider
            value={this.state.questionsQty}
            maximumValue={50}
            minimumValue={5}
            step={5}
            style={{ width: 200 }}
            onValueChange={value => this.setState({ questionsQty: value })}
            thumbTintColor={Colors.bottomDefaultColor}
          />
          <Text style={styles.text}>Difficulty </Text>
          <Text style={styles.textSmall}>
            {this.getDifficultyLabel(this.state.difficulty)}
          </Text>
          <Slider
            value={this.state.difficulty}
            maximumValue={3}
            minimumValue={1}
            step={1}
            style={{ width: 200 }}
            onValueChange={value => this.setState({ difficulty: value })}
            thumbTintColor={Colors.bottomDefaultColor}
          />
          <Button
            title={"Let's Go!"}
            buttonStyle={styles.buttonStyle}
            titleStyle={styles.buttonTitle}
            onPress={() =>
              this.props.navigation.navigate("Trivia", {
                difficulty: this.state.difficulty,
                questionsQty: this.state.questionsQty,
                token: this.state.token
              })
            }
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
  text: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    color: Colors.textColor
  },
  textSmall: {
    fontSize: 15,
    textAlign: "center",
    margin: 10,
    color: Colors.textColor
  },
  buttonStyle: {
    backgroundColor: Colors.bottomDefaultColor,
    width: 300,
    margin: 50
  },
  buttonTitle: {
    color: Colors.textColor
  }
});
