import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useRouter } from "expo-router";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../../firebaseConfig";

export default function Create1() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [highSchool, setHighSchool] = useState("");
  const [graduationYear, setGraduationYear] = useState("");

  const handleSubmit = async () => {
    if (auth.currentUser) {
      const userRef = doc(db, "users", auth.currentUser.uid);
      await setDoc(
        userRef,
        {
          firstName,
          lastName,
          highSchool,
          graduationYear,
        },
        { merge: true }
      );
      router.push("create2");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>{/* Back icon removed */}</View>
      <KeyboardAvoidingView
        style={styles.content}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.stepText}>Step 01</Text>
          <Text style={styles.headerTitle}>Create your Profile</Text>
        </View>
        <View style={styles.timeline}>
          <View style={styles.timelineItems}>
            <View style={[styles.timelineItem, styles.timelineItemActive]} />
            <View style={[styles.timelineLine, styles.timelineLineActive]} />
            <View style={[styles.timelineItem, styles.timelineItemInactive]} />
            <View style={[styles.timelineLine, styles.timelineLineInactive]} />
            <View style={[styles.timelineItem, styles.timelineItemInactive]} />
            <View style={[styles.timelineLine, styles.timelineLineInactive]} />
            <View style={[styles.timelineItem, styles.timelineItemInactive]} />
          </View>
        </View>
        <View style={styles.form}>
          <View style={styles.inputRow}>
            <TextInput
              style={[styles.input, styles.inputHalf]}
              placeholder="First name"
              placeholderTextColor="#888"
              value={firstName}
              onChangeText={setFirstName}
            />
            <TextInput
              style={[styles.input, styles.inputHalf]}
              placeholder="Last name"
              placeholderTextColor="#888"
              value={lastName}
              onChangeText={setLastName}
            />
          </View>
          <TextInput
            style={styles.input}
            placeholder="High School"
            placeholderTextColor="#888"
            value={highSchool}
            onChangeText={setHighSchool}
          />
          <TextInput
            style={styles.input}
            placeholder="Graduation Year"
            placeholderTextColor="#888"
            keyboardType="number-pad"
            value={graduationYear}
            onChangeText={setGraduationYear}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>NEXT STEP</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      <Link href="(tabs)" asChild>
        <TouchableOpacity style={styles.skipButtonContainer}>
          <Text style={styles.skipButtonText}>SKIP! Go to Home</Text>
        </TouchableOpacity>
      </Link>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 40,
    marginBottom: 30,
  },
  content: {
    flex: 1,
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  stepText: {
    color: "#888",
    fontSize: 16,
    marginBottom: 5,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  timeline: {
    alignItems: "center",
    marginBottom: 30,
  },
  timelineItems: {
    flexDirection: "row",
    alignItems: "center",
  },
  timelineItem: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#444",
  },
  timelineLine: {
    flex: 1,
    height: 2,
    backgroundColor: "#444",
    marginHorizontal: 10,
  },
  timelineItemActive: {
    backgroundColor: "#ffd700",
  },
  form: {
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    backgroundColor: "#222",
    color: "#fff",
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 20,
    fontSize: 16,
    marginBottom: 20,
  },
  inputHalf: {
    flex: 0.48,
  },
  button: {
    backgroundColor: "#ffd700",
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  skipButtonContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  skipButtonText: {
    color: "#ffd700",
    fontSize: 16,
  },
});
