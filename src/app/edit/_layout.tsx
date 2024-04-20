import React from "react";
import { Link, Stack } from "expo-router";
import { Pressable, useColorScheme } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Colors from "../../constants/Colors";
export default function StackLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack initialRouteName="create1" screenOptions={{ header: () => null }}>
      <Stack.Screen name="create1" />
      <Stack.Screen name="create2" />
      <Stack.Screen name="create3" />
      <Stack.Screen
        name="create4"
        options={{
          // Hide the header for this route
          headerShown: false,
        }}
      />
    </Stack>
  );
}
