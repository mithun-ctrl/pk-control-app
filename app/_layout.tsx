import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    const prepare = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));
      } catch (e) {
        console.warn(e);
      } finally {
        await SplashScreen.hideAsync();
      }
    };

    prepare();
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <StatusBar style="dark" backgroundColor="#F9FAFB" translucent />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: "#F9FAFB",
            },
            animation: "fade",
            gestureEnabled: true,
            gestureDirection: "horizontal",
          }}
        />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});