import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import Routes from "./Routes";
import { SafeAreaView } from "react-navigation";
import * as Colors from "./colors";

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      // <SafeAreaView style={styles.container} forceInset={{ top: "never" }}>
      <Routes />
      // </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bottomDefaultColor
  }
});
