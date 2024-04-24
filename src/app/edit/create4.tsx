import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../../../firebaseConfig";
import { Link } from "expo-router";

export default function Create4() {
  const router = useRouter();
  const { editing } = useLocalSearchParams();
  const [image, setImage] = useState(
    "https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg"
  );
  const [coverImage, setCoverImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [about, setAbout] = useState("");
  const [theme, setTheme] = useState("");
  const [snapchat, setSnapchat] = useState("");
  const [instagram, setInstagram] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.currentUser) {
        const userRef = doc(db, "users", auth.currentUser.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setImage(userData.image || null);
          setCoverImage(userData.coverImage || null);
          setBackImage(userData.backImage || null);
          setAbout(userData.about || "");
          setTheme(userData.theme || "");
          setSnapchat(userData.snapchat || "");
          setInstagram(userData.instagram || "");
        }
      }
    };
    fetchUserData();
  }, [editing]);

  const handleSelectImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.5,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSelectCoverImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    if (!result.canceled) {
      setCoverImage(result.assets[0].uri);
    }
  };

  const handleSelectBackImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    if (!result.canceled) {
      setBackImage(result.assets[0].uri);
    }
  };

  const handleGoBack = () => {
    router.back();
  };

  const handleFinishProfile = async () => {
    if (auth.currentUser) {
      const userRef = doc(db, "users", auth.currentUser.uid);

      await updateDoc(userRef, {
        image,
        coverImage,
        backImage,
        about,
        theme,
        snapchat,
        instagram,
      });
    }

    router.replace("(tabs)");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      <KeyboardAvoidingView
        style={styles.content}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.stepText}>Step 04</Text>
          <Text style={styles.headerTitle}>Profile Details</Text>
          <Text style={styles.subtitleText}>
            Add your profile picture, cover image, banner image, and about me
            description.
          </Text>
        </View>
        <View style={styles.timeline}>
          <View style={styles.timelineItems}>
            <View style={[styles.timelineItem, styles.timelineItemActive]} />
            <View style={[styles.timelineLine, styles.timelineLineActive]} />
            <View style={[styles.timelineItem, styles.timelineItemActive]} />
            <View style={[styles.timelineLine, styles.timelineLineActive]} />
            <View style={[styles.timelineItem, styles.timelineItemActive]} />
            <View style={[styles.timelineLine, styles.timelineLineActive]} />
            <View style={[styles.timelineItem, styles.timelineItemActive]} />
          </View>
        </View>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.form}>
            <Text style={styles.sectionTitle}>About Me</Text>
            <TextInput
              style={styles.input}
              placeholder="Write a short description about yourself"
              placeholderTextColor="#888"
              value={about}
              onChangeText={(text) => setAbout(text)}
            />
            <Text style={styles.sectionTitle}>Snapchat</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your Snapchat username"
              placeholderTextColor="#888"
              value={snapchat}
              onChangeText={(text) => setSnapchat(text)}
            />
            <Text style={styles.sectionTitle}>Instagram</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your Instagram username"
              placeholderTextColor="#888"
              value={instagram}
              onChangeText={(text) => setInstagram(text)}
            />
            <Text style={styles.sectionTitle}>Theme</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your preferred theme"
              placeholderTextColor="#888"
              value={theme}
              onChangeText={(text) => setTheme(text)}
            />
            <Text style={styles.sectionTitle}>Profile Picture</Text>
            <TouchableOpacity
              style={styles.imageContainer}
              onPress={handleSelectImage}
            >
              {image ? (
                <Image source={{ uri: image }} style={styles.image} />
              ) : (
                <View style={styles.defaultImage}>
                  <Ionicons name="person" size={80} color="#888" />
                </View>
              )}
              <TouchableOpacity style={styles.cameraButton}>
                <Ionicons name="camera" size={24} color="#fff" />
              </TouchableOpacity>
            </TouchableOpacity>
            <Text style={styles.sectionTitle}>Cover Image</Text>
            <View style={styles.coverImageContainer}>
              {coverImage ? (
                <Image source={{ uri: coverImage }} style={styles.coverImage} />
              ) : (
                <View style={styles.defaultCoverImage}>
                  <Ionicons name="image" size={60} color="#888" />
                  <Text style={styles.defaultCoverImageText}>
                    Select Cover Image
                  </Text>
                </View>
              )}
            </View>
            <TouchableOpacity
              style={styles.selectCoverImageButton}
              onPress={handleSelectCoverImage}
            >
              <Text style={styles.selectCoverImageButtonText}>
                Select Cover Image
              </Text>
            </TouchableOpacity>
            <Text style={styles.sectionTitle}>Banner Image</Text>
            <View style={styles.backImageContainer}>
              {backImage ? (
                <Image source={{ uri: backImage }} style={styles.backImage} />
              ) : (
                <View style={styles.defaultBackImage}>
                  <Ionicons name="image" size={60} color="#888" />
                  <Text style={styles.defaultBackImageText}>
                    Select Banner Image
                  </Text>
                </View>
              )}
            </View>
            <TouchableOpacity
              style={styles.selectBackImageButton}
              onPress={handleSelectBackImage}
            >
              <Text style={styles.selectBackImageButtonText}>
                Select Banner Image
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleFinishProfile}>
            <Text style={styles.buttonText}>
              {editing ? "Update Profile" : "Finish Profile"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
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
    marginTop: 20,
    marginBottom: 30,
  },
  content: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "space-between",
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
    marginBottom: 10,
  },
  subtitleText: {
    color: "#888",
    fontSize: 16,
    textAlign: "center",
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
    backgroundColor: "#38a093",
  },
  timelineLineActive: {
    backgroundColor: "#38a093",
  },
  form: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 10,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  defaultImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#222",
    alignItems: "center",
    justifyContent: "center",
  },
  cameraButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#38a093",
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  coverImageContainer: {
    height: 200,
    backgroundColor: "#222",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  coverImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  defaultCoverImage: {
    alignItems: "center",
    justifyContent: "center",
  },
  defaultCoverImageText: {
    color: "#888",
    fontSize: 16,
    marginTop: 10,
  },
  backImageContainer: {
    height: 200,
    backgroundColor: "#222",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  backImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  defaultBackImage: {
    alignItems: "center",
    justifyContent: "center",
  },
  defaultBackImageText: {
    color: "#888",
    fontSize: 16,
    marginTop: 10,
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
  button: {
    backgroundColor: "#38a093",
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  skipButtonContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  skipButtonText: {
    color: "#38a093",
    fontSize: 16,
  },
  selectCoverImageButton: {
    backgroundColor: "#38a093",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  selectCoverImageButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  selectBackImageButton: {
    backgroundColor: "#38a093",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  selectBackImageButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
