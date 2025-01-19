import React, { useRef, useState } from "react";
import { SafeAreaView, StyleSheet, StatusBar, TouchableOpacity, View, Text, ActivityIndicator } from "react-native";
import { WebView } from "react-native-webview";
import Icon from "react-native-vector-icons/FontAwesome"; // Import the icon library

const App = () => {
  const webViewRef = useRef(null); // Reference to the WebView
  const [loading, setLoading] = useState(true); // Track loading state

  // Handle the home button press
  const handleHomeButton = () => {
    if (webViewRef.current) {
      webViewRef.current.injectJavaScript(`
        window.location.href = "https://orders.geeksspark.com/shop";
      `); // Navigate to the home URL
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Custom Header with Home Icon */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleHomeButton} style={styles.homeButton}>
          <Icon name="home" size={24} color="#007AFF" /> {/* Home Icon */}
        </TouchableOpacity>
      </View>

      {/* WebView */}
      <WebView
        ref={webViewRef}
        source={{ uri: "https://orders.geeksspark.com/shop" }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        onLoadStart={() => setLoading(true)} // Show loader when loading starts
        onLoadEnd={() => setLoading(false)} // Hide loader when loading ends
        startInLoadingState={true}
        scalesPageToFit={true}
      />

      {/* Loader */}
      {loading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loaderText}>Loading...</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f8f8f8",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  homeButton: {
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  webview: {
    flex: 1,
  },
  loaderContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)", // Semi-transparent background
  },
  loaderText: {
    marginTop: 10,
    fontSize: 16,
    color: "#000",
  },
});

export default App;