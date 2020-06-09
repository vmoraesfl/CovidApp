import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";
import { Platform } from "react-native";

const myHtmlFile = require("./localsite.html");

function ActivityIndicatorLoadingView() {
  //making a view to show to while loading the webpage
  return (
    <ActivityIndicator
      color="#009688"
      size="large"
      style={styles.ActivityIndicatorStyle}
    />
  );
}

class MyWebComponent extends Component {
  render() {
    return (
      <View style={styles.container}>
        <WebView
          source={{
            uri: "https://www.unasus.gov.br/especial/covid19/populacao",
          }}
          //source={myHtmlFile}
          originWhitelist={["https://*", "git://*"]}
          //Enable Javascript support
          javaScriptEnabled={true}
          //For the Cache
          domStorageEnabled={true}
          //View to show while loading the webpage
          renderLoading={this.ActivityIndicatorLoadingView}
          //Want to show the view or not
          startInLoadingState={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    ...Platform.select({
      ios: {
        marginTop: 90,
      },
      android: {
        marginTop: 75,
      },
    }),
  },
  ActivityIndicatorStyle: {
    flex: 1,
    justifyContent: "center",
  },
});

export default MyWebComponent;
