import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator
} from "react-navigation";
import * as Colors from "./colors";

import Main from "./src/Main";
import Trivia from "./src/Trivia";
import Hiscores from "./src/Hiscores";
import EndGame from "./src/EndGame";

const MainRouteStack = createStackNavigator(
  {
    Home: {
      screen: Main
    },
    Trivia: {
      screen: Trivia
    },
    EndGame: {
      screen: EndGame
    }
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      header: null
    }
  }
);
const HiscoresStack = createStackNavigator(
  {
    Hiscores: {
      screen: Hiscores
    }
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
);

const TabNavigator = createBottomTabNavigator(
  {
    Trivia: MainRouteStack,
    Hiscores: HiscoresStack
  },
  {
    tabBarOptions: {
      // tabStyle: {
      //   backgroundColor: Colors.bottomDefaultColor,
      //   padding: 10
      // },
      labelStyle: {
        color: Colors.textColor,
        fontSize: 20
      },
      style: {
        backgroundColor: Colors.bottomDefaultColor
      }
    }
  }
);

const AppContainer = createAppContainer(TabNavigator);

type Props = {};
export default class Routes extends Component<Props> {
  render() {
    return <AppContainer />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
