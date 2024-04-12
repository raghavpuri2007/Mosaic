import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { auth } from "../../../firebaseConfig";
import { Link } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function CreateProfile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [grade, setGrade] = useState("");
  const [highSchool, setHighSchool] = useState("");
  const [loading, setLoading] = useState(false);
  const onCreateProfile = () => {
    // Handle profile creation logic here
    setLoading(true);
    // Firebase authentication signup
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up successfully
        const user = userCredential.user;
        console.log("User created:", user.uid);
        // You can navigate to another screen, update UI, etc. here
      })
      .catch((error) => {
        // Handle errors here
        const errorMessage = error.message;
        Alert.alert("Error", errorMessage);
        console.error("Signup Error:", errorMessage);
      });
  };

  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
      resetScrollToCoords={{ x: 0, y: 0 }}
    >
      <Text style={styles.title}>Create Profile</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        placeholderTextColor="#999"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#999"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TextInput
        style={styles.input}
        placeholder="Grade"
        placeholderTextColor="#999"
        value={grade}
        onChangeText={setGrade}
      />

      <TextInput
        style={styles.input}
        placeholder="High School"
        placeholderTextColor="#999"
        value={highSchool}
        onChangeText={setHighSchool}
      />

      <TouchableOpacity
        style={styles.createProfileButton}
        onPress={onCreateProfile}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          <Text style={styles.buttonText}>Create Profile</Text>
        )}
      </TouchableOpacity>

      <Link href="login">
        <Text style={styles.loginText}>Already have an account? Login</Text>
      </Link>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 10, // Reduce the gap between title and inputs
  },
  input: {
    width: "90%", // Make the inputs wider
    borderWidth: 1,
    borderRadius: 8,
    padding: 12, // Increase padding for better touch area
    marginVertical: 8, // Reduce vertical margin between inputs
  },
  createProfileButton: {
    backgroundColor: "blue",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
    marginTop: 20, // Increase margin top for better separation from inputs
  },
  buttonText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 16,
  },
  loginText: {
    marginTop: 20,
    color: "blue",
    textDecorationLine: "underline",
  },
});
