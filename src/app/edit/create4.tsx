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
  const [profilePicture, setProfilePicture] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [bannerImage, setBannerImage] = useState(null);
  const [headline, setHeadline] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [snapchat, setSnapchat] = useState("");
  const [instagram, setInstagram] = useState("");
  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.currentUser) {
        const userRef = doc(db, "users", auth.currentUser.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setProfilePicture(userData.profilePicture || null);
          setCoverImage(userData.coverImage || null);
          setBannerImage(userData.bannerImage || null);
          setHeadline(userData.headline || "");
          setAboutMe(userData.aboutMe || "");
          setSnapchat(userData.snapchat || "");
          setInstagram(userData.instagram || "");
        }
      }
    };
    fetchUserData();
  }, [editing]);
  const handleSelectProfilePicture = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.5,
    });

    if (!result.canceled) {
      setProfilePicture(result.assets[0].uri);
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

  const handleSelectBannerImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    if (!result.canceled) {
      setBannerImage(result.assets[0].uri);
    }
  };

  const handleGoBack = () => {
    router.back();
  };

  const handleFinishProfile = async () => {
    if (auth.currentUser) {
      const userRef = doc(db, "users", auth.currentUser.uid);

      await updateDoc(userRef, {
        profilePicture,
        coverImage,
        bannerImage,
        headline,
        aboutMe,
        snapchat,
        instagram,
      });
    }

    router.push("(tabs)");
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
            Add your profile picture, cover image, banner image, headline, and
            about me description.
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
            <Text style={styles.sectionTitle}>Headline</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter a headline"
              placeholderTextColor="#888"
              value={headline}
              onChangeText={(text) => setHeadline(text)}
            />
            <Text style={styles.sectionTitle}>About Me</Text>
            <TextInput
              style={styles.input}
              placeholder="Write a short description about yourself"
              placeholderTextColor="#888"
              value={aboutMe}
              onChangeText={(text) => setAboutMe(text)}
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
            <Text style={styles.sectionTitle}>Profile Picture</Text>
            <TouchableOpacity
              style={styles.profilePictureContainer}
              onPress={handleSelectProfilePicture}
            >
              {profilePicture ? (
                <Image
                  source={{ uri: profilePicture }}
                  style={styles.profilePicture}
                />
              ) : (
                <View style={styles.defaultProfilePicture}>
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
            <View style={styles.bannerImageContainer}>
              {bannerImage ? (
                <Image
                  source={{ uri: bannerImage }}
                  style={styles.bannerImage}
                />
              ) : (
                <View style={styles.defaultBannerImage}>
                  <Ionicons name="image" size={60} color="#888" />
                  <Text style={styles.defaultBannerImageText}>
                    Select Banner Image
                  </Text>
                </View>
              )}
            </View>
            <TouchableOpacity
              style={styles.selectBannerImageButton}
              onPress={handleSelectBannerImage}
            >
              <Text style={styles.selectBannerImageButtonText}>
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
  profilePictureContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  defaultProfilePicture: {
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
  bannerImageContainer: {
    height: 200,
    backgroundColor: "#222",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  bannerImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  defaultBannerImage: {
    alignItems: "center",
    justifyContent: "center",
  },
  defaultBannerImageText: {
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
  selectBannerImageButton: {
    backgroundColor: "#38a093",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  selectBannerImageButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
