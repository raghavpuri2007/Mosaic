import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { auth } from "../../../firebaseConfig";
import { signOut } from "firebase/auth";
import { Ionicons } from "@expo/vector-icons";

export default function SettingsScreen() {
  const router = useRouter();

  const onSignOut = () => {
    signOut(auth)
      .then(() => {
        router.replace("(auth)");
      })
      .catch((error) => console.log(error));
  };

  const navigateToChangePassword = () => {
    router.push("settings/changePassword");
  };

  const navigateToTerms = () => {
    router.push("settings/terms");
  };

  const navigateToReportBug = () => {
    router.push("settings/reportBug");
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={navigateToChangePassword}
        >
          <Text style={styles.buttonText}>Change Password</Text>
          <Ionicons name="chevron-forward" size={24} color="#38a093" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={navigateToTerms}>
          <Text style={styles.buttonText}>Terms and Conditions</Text>
          <Ionicons name="chevron-forward" size={24} color="#38a093" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={navigateToReportBug}>
          <Text style={styles.buttonText}>Report a Bug</Text>
          <Ionicons name="chevron-forward" size={24} color="#38a093" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={onSignOut}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingHorizontal: 20,
    justifyContent: "space-between",
    paddingVertical: 40,
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#38a093",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: "#38a093",
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
