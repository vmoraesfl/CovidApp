import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
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
      <View style={{ flex: 1 }}>
        <WebView
          style={styles.WebViewStyle}
          source={{
            uri:
              "https://stackoverflow.com/questions/45256826/react-native-webview-loading-indicator",
          }}
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
  WebViewStyle: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    marginTop: 40,
  },
  ActivityIndicatorStyle: {
    flex: 1,
    justifyContent: "center",
  },
});

export default MyWebComponent;
