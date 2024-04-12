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
import Login from "../components/Login";
import CreateProfile from "../components/CreateProfile";
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";
import { auth } from "../../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
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

  return <RootLayoutNav />;
}
function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const navigation = useNavigation(); // Get the navigation object

  const [loggedIn, setLoggedIn] = useState(false);
  console.log(loggedIn);
  useEffect(() => {
    // Check if user is already signed in
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("hey");
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });

    // No dependency array [], so it runs on every render

    return () => {
      unsubscribe(); // Unsubscribe the listener when component unmounts
    };
  }, []);

  useEffect(() => {
    if (loggedIn) {
      // Navigate to a specific screen when user is logged in
      navigation.navigate("(tabs)");
    } else {
      // Navigate to another screen when user is not logged in
      navigation.navigate("(create)");
    }
  }, [loggedIn, navigation]);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack initialRouteName={loggedIn ? "(tabs)" : "(create)"}>
        <Stack.Screen name="(create)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: "modal" }} />
        <Stack.Screen name="posts/[id]" options={{ title: "Post" }} />
      </Stack>
    </ThemeProvider>
  );
}
