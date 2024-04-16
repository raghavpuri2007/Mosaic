import React from "react";
import { Link, Stack } from "expo-router";
import { Pressable, useColorScheme } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Colors from "../../constants/Colors";
import Login from "./index";
import CreateProfile from "./create";
export default function StackLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack initialRouteName="landing" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="landing" />
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="create1" />
      <Stack.Screen name="create2" />
      <Stack.Screen name="create3" />
      <Stack.Screen name="create4" />
    </Stack>
  );
}
