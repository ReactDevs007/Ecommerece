import React from 'react';
import { StyleSheet } from 'react-native';
// import HTMLView from 'react-native-htmlview';
import { WebView, Platform } from 'react-native';

const styles = StyleSheet.create({
  WebViewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginTop: (Platform.OS) === 'ios' ? 20 : 0
  }
});

const HtmlViewComponent = ({ htmlContent = '' }) => (
  <WebView
    style={styles.WebViewStyle}
    javaScriptEnabled
    domStorageEnabled
    source={{ html: htmlContent }}
  />
);

export default HtmlViewComponent;
