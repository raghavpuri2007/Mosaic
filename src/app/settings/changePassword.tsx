import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, TextInput, Alert } from "react-native";
import { Text, View } from "../../components/Themed";
import { useRouter } from "expo-router";
import { auth } from "../../../firebaseConfig";
import {
  signInWithEmailAndPassword,
  updatePassword,
  signOut,
} from "firebase/auth";

export default function ChangePasswordScreen() {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleChangePassword = async () => {
    if (currentPassword.trim() === "" || newPassword.trim() === "") {
      Alert.alert("Error", "Please enter both current and new passwords.");
      return;
    }

    try {
      const user = auth.currentUser;
      if (user) {
        const credential = await signInWithEmailAndPassword(
          auth,
          user.email,
          currentPassword
        );
        await updatePassword(user, newPassword);
        Alert.alert(
          "Success",
          "Password changed successfully! Please sign in with your new password.",
          [
            {
              text: "OK",
              onPress: async () => {
                await signOut(auth);
                router.replace("(auth)");
              },
            },
          ]
        );
        setCurrentPassword("");
        setNewPassword("");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to change password. Please try again.");
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Change Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Current Password"
        placeholderTextColor="#888"
        secureTextEntry
        value={currentPassword}
        onChangeText={(text) => setCurrentPassword(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="New Password"
        placeholderTextColor="#888"
        secureTextEntry
        value={newPassword}
        onChangeText={(text) => setNewPassword(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingHorizontal: 20,
    paddingVertical: 40,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffd700",
    marginBottom: 30,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#222",
    borderRadius: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
    color: "#fff",
    fontSize: 16,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#ffd700",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
  },
});
