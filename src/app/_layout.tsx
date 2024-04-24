import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack, useNavigation } from "expo-router"; // Import useNavigation hook
import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Login from "../components/Login";
import CreateProfile from "../components/CreateProfile";
import { useRouter } from "expo-router";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";
import { auth } from "../../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { GestureHandlerRootView } from "react-native-gesture-handler";
export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
    if (error) {
      throw error; // Throw error if font loading fails
    }
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
    return null; // Return null if fonts are not loaded yet
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <RootLayoutNav />
    </GestureHandlerRootView>
  );
}
function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const navigation = useNavigation(); // Get the navigation object
  const router = useRouter();

  const customHeaderBackButton = () => (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={styles.backButtonStyle}
    >
      <FontAwesome name="arrow-left" size={20} color="#fff" />
    </TouchableOpacity>
  );

  const customHeaderSettingsButton = () => (
    <TouchableOpacity
      onPress={() => router.push("../settings")}
      style={styles.settingsButtonStyle}
    >
      <FontAwesome name="gear" size={20} color="#fff" />
    </TouchableOpacity>
  );

  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    navigation.navigate(loggedIn ? "(tabs)" : "(create)");
  }, [loggedIn, navigation]);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack
        initialRouteName={loggedIn ? "(tabs)" : "(create)"}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="(create)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: "modal" }} />
        <Stack.Screen name="posts/[id]" options={{ title: "Post" }} />
        <Stack.Screen
          name="users/[id]"
          options={{
            headerTransparent: true,
            headerTitle: "",
            headerLeft: customHeaderBackButton,
            headerRight: customHeaderSettingsButton,  // Add settings button here
          }}
        />

        <Stack.Screen
          name="share/ShareScreen"
          options={{
            headerTransparent: true,
            headerTitle: "",
            headerLeft: customHeaderBackButton,
            headerRight: customHeaderSettingsButton,  // Add settings button here
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  backButtonStyle: {
    marginLeft: 3,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  settingsButtonStyle: {
    // New style for settings button
    marginRight: 3,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
});
