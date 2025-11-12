import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeScreen from "../screens/HomeScreen";

export default function Index() {
  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <HomeScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
