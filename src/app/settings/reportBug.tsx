import React, { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  Linking,
} from "react-native";
import { Text, View } from "../../components/Themed";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ReportBugScreen() {
  const [email, setEmail] = useState("rapuri27@gmail.com");
  const [bugType, setBugType] = useState("");
  const [message, setMessage] = useState("");

  const sendEmail = () => {
    if (bugType.trim() === "" || message.trim() === "") {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    const subject = `Bug Report: ${bugType}`;
    const encodedSubject = encodeURIComponent(subject);
    const encodedMessage = encodeURIComponent(message);
    const mailtoUrl = `mailto:${email}?subject=${encodedSubject}&body=${encodedMessage}`;

    Linking.openURL(mailtoUrl);

    setBugType("");
    setMessage("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Report a Bug</Text>
      <TextInput
        style={styles.input}
        placeholder="Bug Type"
        placeholderTextColor="#888"
        value={bugType}
        onChangeText={(text) => setBugType(text)}
      />
      <TextInput
        style={[styles.input, styles.messageInput]}
        placeholder="Message"
        placeholderTextColor="#888"
        value={message}
        onChangeText={(text) => setMessage(text)}
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={sendEmail}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </SafeAreaView>
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
    color: "#38a093",
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
  messageInput: {
    height: 120,
    textAlignVertical: "top",
    paddingTop: 15,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#38a093",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
