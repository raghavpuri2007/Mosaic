import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Link, Tabs, Stack } from "expo-router";
import { Pressable, useColorScheme, Image } from "react-native";
import Colors from "../../constants/Colors";
import { useEffect, useState } from "react";
import { auth, db } from "../../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const fetchProfileImage = async () => {
      if (auth.currentUser) {
        const userRef = doc(db, "users", auth.currentUser.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setProfileImage(userData.image);
        }
      }
    };
    fetchProfileImage();
  }, []);

  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#888",
        tabBarStyle: {
          backgroundColor: "#000",
          borderTopColor: "#222",
        },
        tabBarShowLabel: false,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="chatbubble-outline" size={24} color={color} />
          ),
          headerStyle: {
            backgroundColor: "#000",
          },
          headerTintColor: "#fff",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color }) =>
            profileImage ? (
              <Image
                source={{ uri: profileImage }}
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: color,
                }}
              />
            ) : (
              <Ionicons name="person-outline" size={24} color={color} />
            ),
          headerStyle: {
            backgroundColor: "#000",
          },
          headerTintColor: "#fff",
        }}
      />
    </Tabs>
  );
}
