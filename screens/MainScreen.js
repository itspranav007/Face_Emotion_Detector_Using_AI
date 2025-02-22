// screens/MainScreen.js
import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const MainScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace("Home");
    }, 200);
  }, []);

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Welcome to AI Emotion Detector</Text> */}
      <Image
        source={require("../assets/facemain.png")} // Ensure the image is in the assets folder
        style={styles.image}
      />
      <Text style={styles.name}>Face Emotion Detector</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#6200EE",
  },
  title: { fontSize: 24, fontWeight: "bold", color: "#FFF", marginBottom: 20 },
  image: { width: 300, height: 300, marginBottom: 10 },
  name: { fontSize: 40, color: "#FFF", fontWeight: "bold" },
});

export default MainScreen;
