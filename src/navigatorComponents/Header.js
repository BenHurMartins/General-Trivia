import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import * as Colors from "../../colors";

export default class Header extends Component {
  render() {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.generalText}>General</Text>
        <Text style={styles.triviaText}>TRIVIA</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 40,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.background
  },
  triviaText: {
    textAlign: "center",
    marginTop: 5,
    fontSize: 90,
    color: Colors.textColor
  },
  generalText: {
    textAlign: "center",
    marginTop: 5,
    fontSize: 45,
    color: Colors.textColor
  }
});
