import React from "react";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import Colors from "../../constants/Colors";

export default function StackLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack
      initialRouteName="settings"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="settings" />
      <Stack.Screen name="changePassword" />
      <Stack.Screen name="reportBug" />
      <Stack.Screen name="terms" />
    </Stack>
  );
}
