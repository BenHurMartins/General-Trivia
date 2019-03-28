import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  AsyncStorage
} from "react-native";
import * as Colors from "../colors";
import { Button } from "react-native-elements";

type Props = {};
export default class EndGame extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = { oldScore: 0, finalScore: 0 };
  }

  componentDidMount() {
    AsyncStorage.getItem("@TriviaScores:key").then(value => {
      const { navigation } = this.props;
      const finalScore = navigation.getParam("finalScore", 1);
      this.setState({ oldScore: value, finalScore: finalScore });
      var newRecord = this.state.oldScore < finalScore;

      if (newRecord) {
        this._storeData(finalScore);
      }
    });
  }
  _storeData = async score => {
    try {
      await AsyncStorage.setItem("@TriviaScores:key", score.toString());
    } catch (error) {}
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.text}>
            Congratulations, Your Final Score was: {this.state.finalScore}
          </Text>
        </View>
        <Button
          title={"Back"}
          buttonStyle={styles.buttonStyle}
          titleStyle={styles.buttonTitle}
          onPress={() => this.props.navigation.popToTop()}
        />
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
  buttonStyle: {
    width: 300,
    height: 50,
    margin: 15,
    backgroundColor: Colors.bottomDefaultColor
  },
  buttonTitle: {
    color: Colors.textColor
  }
});
