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
export default class Hiscores extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = { hiscore: 0 };
  }

  componentDidMount() {
    this.updateHiscore();
  }

  updateHiscore() {
    AsyncStorage.getItem("@TriviaScores:key").then(value => {
      this.setState({ hiscore: value });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.text}>Your Hiscore: {this.state.hiscore}</Text>
        </View>
        <Button
          title={"Update Hiscore"}
          buttonStyle={styles.buttonStyle}
          titleStyle={styles.buttonTitle}
          onPress={() => this.updateHiscore()}
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
