import React, { useState } from "react";
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
import { Link, useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";

export default function Create4() {
  const router = useRouter();
  const [profilePicture, setProfilePicture] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [bannerImage, setBannerImage] = useState(null);
  const [headline, setHeadline] = useState("");
  const [aboutMe, setAboutMe] = useState("");

  const handleSelectProfilePicture = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert(
        "Sorry, we need camera roll permissions to select a profile picture."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setProfilePicture(result.uri);
    }
  };

  const handleSelectCoverImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to select a cover image.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.cancelled) {
      setCoverImage(result.uri);
    }
  };

  const handleSelectBannerImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to select a banner image.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.cancelled) {
      setBannerImage(result.uri);
    }
  };

  const handleGoBack = () => {
    router.back();
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
            <TouchableOpacity
              style={styles.coverImageContainer}
              onPress={handleSelectCoverImage}
            >
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
            </TouchableOpacity>
            <Text style={styles.sectionTitle}>Banner Image</Text>
            <TouchableOpacity
              style={styles.bannerImageContainer}
              onPress={handleSelectBannerImage}
            >
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
            </TouchableOpacity>
          </View>
          <Link href="/home" asChild>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Finish Profile</Text>
            </TouchableOpacity>
          </Link>
          <Link href="(tabs)" asChild>
            <TouchableOpacity style={styles.skipButtonContainer}>
              <Text style={styles.skipButtonText}>SKIP! Go to Home</Text>
            </TouchableOpacity>
          </Link>
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
    backgroundColor: "#ffd700",
  },
  timelineLineActive: {
    backgroundColor: "#ffd700",
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
    backgroundColor: "#ffd700",
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
    marginBottom: 20,
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
    marginBottom: 20,
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
