import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter, useLocalSearchParams } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../../../firebaseConfig";
import * as FileSystem from "expo-file-system";

export default function Create3() {
  const router = useRouter();
  const { editing } = useLocalSearchParams();
  const [athletics, setAthletics] = useState([
    {
      id: "",
      name: "",
      description: "",
      highlights: [],
      images: [],
      awards: [],
    },
  ]);
  const [performingArts, setPerformingArts] = useState([
    {
      id: "",
      name: "",
      description: "",
      videos: [],
      images: [],
      awards: [],
    },
  ]);
  const [volunteering, setVolunteering] = useState([
    {
      id: "",
      name: "",
      impact: "",
      images: [],
      events: [],
    },
  ]);
  const [projects, setProjects] = useState([
    { name: "", description: "", link: "", skills: [""], image: null },
  ]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (editing === "true" && auth.currentUser) {
        const userRef = doc(db, "users", auth.currentUser.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setAthletics(
            userData.athletics || [
              {
                id: "",
                name: "",
                description: "",
                highlights: [],
                images: [],
                awards: [],
              },
            ]
          );
          setPerformingArts(
            userData.performingArts || [
              {
                id: "",
                name: "",
                description: "",
                videos: [],
                images: [],
                awards: [],
              },
            ]
          );
          setVolunteering(
            userData.volunteering || [
              {
                id: "",
                name: "",
                impact: "",
                images: [],
                events: [],
              },
            ]
          );
          setProjects(
            userData.projects || [
              {
                name: "",
                description: "",
                link: "",
                skills: [""],
                image: null,
              },
            ]
          );
        }
      }
    };
    fetchUserData();
  }, [editing]);

  const handleAddActivity = (category) => {
    switch (category) {
      case "athletics":
        setAthletics([
          ...athletics,
          {
            id: "",
            name: "",
            description: "",
            highlights: [],
            images: [],
            awards: [],
          },
        ]);
        break;
      case "performingArts":
        setPerformingArts([
          ...performingArts,
          {
            id: "",
            name: "",
            description: "",
            videos: [],
            images: [],
            awards: [],
          },
        ]);
        break;
      case "volunteering":
        setVolunteering([
          ...volunteering,
          {
            id: "",
            name: "",
            impact: "",
            images: [],
            events: [],
          },
        ]);
        break;
      default:
        break;
    }
  };

  const handleAddProject = () => {
    setProjects([
      ...projects,
      { name: "", description: "", link: "", skills: [""], image: null },
    ]);
  };

  const handleProjectChange = (index, field, value) => {
    const updatedProjects = [...projects];
    updatedProjects[index][field] = value;
    setProjects(updatedProjects);
  };

  const handleActivityChange = (category, index, field, value) => {
    switch (category) {
      case "athletics":
        const updatedAthletics = [...athletics];
        updatedAthletics[index][field] = value;
        setAthletics(updatedAthletics);
        break;
      case "performingArts":
        const updatedPerformingArts = [...performingArts];
        updatedPerformingArts[index][field] = value;
        setPerformingArts(updatedPerformingArts);
        break;
      case "volunteering":
        const updatedVolunteering = [...volunteering];
        updatedVolunteering[index][field] = value;
        setVolunteering(updatedVolunteering);
        break;
      default:
        break;
    }
  };

  const handleImagePicker = async (index) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to select an image.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled && result.uri) {
      const updatedProjects = [...projects];
      updatedProjects[index].image = result.uri;
      setProjects(updatedProjects);
    }
  };

  const handleAddHighlight = (category, index) => {
    switch (category) {
      case "athletics":
        const updatedAthletics = [...athletics];
        updatedAthletics[index].highlights.push({ key: "" });
        setAthletics(updatedAthletics);
        break;
      case "performingArts":
        const updatedPerformingArts = [...performingArts];
        updatedPerformingArts[index].videos.push({ key: "" });
        setPerformingArts(updatedPerformingArts);
        break;
      default:
        break;
    }
  };

  const handleHighlightChange = async (
    category,
    activityIndex,
    highlightIndex
  ) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to select a video.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled && result.uri) {
      switch (category) {
        case "athletics":
          const updatedAthletics = [...athletics];
          updatedAthletics[activityIndex].highlights[highlightIndex].key =
            result.uri;
          setAthletics(updatedAthletics);
          break;
        case "performingArts":
          const updatedPerformingArts = [...performingArts];
          updatedPerformingArts[activityIndex].videos[highlightIndex].key =
            result.uri;
          setPerformingArts(updatedPerformingArts);
          break;
        default:
          break;
      }
    }
  };

  const handleAddImage = (category, index) => {
    switch (category) {
      case "athletics":
        const updatedAthletics = [...athletics];
        updatedAthletics[index].images.push({ key: "" });
        setAthletics(updatedAthletics);
        break;
      case "performingArts":
        const updatedPerformingArts = [...performingArts];
        updatedPerformingArts[index].images.push({ key: "" });
        setPerformingArts(updatedPerformingArts);
        break;
      case "volunteering":
        const updatedVolunteering = [...volunteering];
        updatedVolunteering[index].images.push({ key: "" });
        setVolunteering(updatedVolunteering);
        break;
      default:
        break;
    }
  };

  const handleImageChange = async (category, activityIndex, imageIndex) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to select an image.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled && result.uri) {
      switch (category) {
        case "athletics":
          const updatedAthletics = [...athletics];
          updatedAthletics[activityIndex].images[imageIndex].key = result.uri;
          setAthletics(updatedAthletics);
          break;
        case "performingArts":
          const updatedPerformingArts = [...performingArts];
          updatedPerformingArts[activityIndex].images[imageIndex].key =
            result.uri;
          setPerformingArts(updatedPerformingArts);
          break;
        case "volunteering":
          const updatedVolunteering = [...volunteering];
          updatedVolunteering[activityIndex].images[imageIndex].key =
            result.uri;
          setVolunteering(updatedVolunteering);
          break;
        default:
          break;
      }
    }
  };

  const handleAddAward = (category, index) => {
    switch (category) {
      case "athletics":
        const updatedAthletics = [...athletics];
        updatedAthletics[index].awards.push({ title: "", description: "" });
        setAthletics(updatedAthletics);
        break;
      case "performingArts":
        const updatedPerformingArts = [...performingArts];
        updatedPerformingArts[index].awards.push({
          title: "",
          description: "",
        });
        setPerformingArts(updatedPerformingArts);
        break;
      default:
        break;
    }
  };

  const handleAwardChange = (
    category,
    activityIndex,
    awardIndex,
    field,
    value
  ) => {
    switch (category) {
      case "athletics":
        const updatedAthletics = [...athletics];
        updatedAthletics[activityIndex].awards[awardIndex][field] = value;
        setAthletics(updatedAthletics);
        break;
      case "performingArts":
        const updatedPerformingArts = [...performingArts];
        updatedPerformingArts[activityIndex].awards[awardIndex][field] = value;
        setPerformingArts(updatedPerformingArts);
        break;
      default:
        break;
    }
  };

  const handleAddEvent = (volunteeringIndex) => {
    const updatedVolunteering = [...volunteering];
    updatedVolunteering[volunteeringIndex].events.push({
      title: "",
      startYear: "",
      endYear: "",
      description: "",
    });
    setVolunteering(updatedVolunteering);
  };

  const handleEventChange = (volunteeringIndex, eventIndex, field, value) => {
    const updatedVolunteering = [...volunteering];
    updatedVolunteering[volunteeringIndex].events[eventIndex][field] = value;
    setVolunteering(updatedVolunteering);
  };

  const handleAddSkill = (index) => {
    const updatedProjects = [...projects];
    updatedProjects[index].skills.push("");
    setProjects(updatedProjects);
  };

  const handleSkillChange = (projectIndex, skillIndex, value) => {
    const updatedProjects = [...projects];
    updatedProjects[projectIndex].skills[skillIndex] = value;
    setProjects(updatedProjects);
  };

  const saveDataToFirebase = async () => {
    if (auth.currentUser) {
      const userRef = doc(db, "users", auth.currentUser.uid);

      await updateDoc(userRef, {
        athletics,
        performingArts,
        volunteering,
        projects,
      });
    }
  };

  const handleGoBack = async () => {
    await saveDataToFirebase();
    router.back();
  };

  const handleNextStep = async () => {
    await saveDataToFirebase();
    router.push({
      pathname: "../edit/create4",
      params: {
        editing: true,
      },
    });
  };

  const handleSkip = async () => {
    await saveDataToFirebase();
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
          <Text style={styles.stepText}>Step 03</Text>
          <Text style={styles.headerTitle}>Activities</Text>
          <Text style={styles.subtitleText}>
            Add your extracurricular activities and volunteering experience.
          </Text>
        </View>
        <View style={styles.timeline}>
          <View style={styles.timelineItems}>
            <View style={[styles.timelineItem, styles.timelineItemActive]} />
            <View style={[styles.timelineLine, styles.timelineLineActive]} />
            <View style={[styles.timelineItem, styles.timelineItemActive]} />
            <View style={[styles.timelineLine, styles.timelineLineActive]} />
            <View style={[styles.timelineItem, styles.timelineItemActive]} />
            <View style={[styles.timelineLine, styles.timelineLineInactive]} />
            <View style={[styles.timelineItem, styles.timelineItemInactive]} />
          </View>
        </View>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.form}>
            <Text style={styles.sectionTitle}>Athletics</Text>
            {athletics.map((athletic, athleticIndex) => (
              <View key={athleticIndex} style={styles.activitySection}>
                <TextInput
                  style={[styles.input, styles.activityNameInput]}
                  placeholder="Athletic Activity Name"
                  placeholderTextColor="#888"
                  value={athletic.name}
                  onChangeText={(value) =>
                    handleActivityChange(
                      "athletics",
                      athleticIndex,
                      "name",
                      value
                    )
                  }
                />
                <TextInput
                  style={[styles.input, styles.activityDescriptionInput]}
                  placeholder="Description"
                  placeholderTextColor="#888"
                  value={athletic.description}
                  onChangeText={(value) =>
                    handleActivityChange(
                      "athletics",
                      athleticIndex,
                      "description",
                      value
                    )
                  }
                />
                <View style={styles.highlightsSection}>
                  <Text style={styles.highlightsTitle}>Highlights</Text>
                  {athletic.highlights.map((highlight, highlightIndex) => (
                    <TouchableOpacity
                      key={highlightIndex}
                      style={styles.highlightButton}
                      onPress={() =>
                        handleHighlightChange(
                          "athletics",
                          athleticIndex,
                          highlightIndex
                        )
                      }
                    >
                      {highlight.key ? (
                        <Video
                          source={{ uri: highlight.key }}
                          style={{ width: 50, height: 50 }}
                          resizeMode="cover"
                        />
                      ) : (
                        <Ionicons
                          name="videocam-outline"
                          size={24}
                          color="#888"
                        />
                      )}
                    </TouchableOpacity>
                  ))}
                  <TouchableOpacity
                    style={styles.addHighlightButton}
                    onPress={() =>
                      handleAddHighlight("athletics", athleticIndex)
                    }
                  >
                    <Ionicons name="add" size={24} color="#fff" />
                  </TouchableOpacity>
                </View>
                <View style={styles.imagesSection}>
                  <Text style={styles.imagesTitle}>Images</Text>
                  {athletic.images.map((image, imageIndex) => (
                    <TouchableOpacity
                      key={imageIndex}
                      style={styles.imageButton}
                      onPress={() =>
                        handleImageChange(
                          "athletics",
                          athleticIndex,
                          imageIndex
                        )
                      }
                    >
                      {image.key ? (
                        <Image
                          source={{ uri: image.key }}
                          style={{ width: 50, height: 50 }}
                          resizeMode="cover"
                        />
                      ) : (
                        <Ionicons name="image-outline" size={24} color="#888" />
                      )}
                    </TouchableOpacity>
                  ))}
                  <TouchableOpacity
                    style={styles.addImageButton}
                    onPress={() => handleAddImage("athletics", athleticIndex)}
                  >
                    <Ionicons name="add" size={24} color="#fff" />
                  </TouchableOpacity>
                </View>
                <View style={styles.awardsSection}>
                  <Text style={styles.awardsTitle}>Awards</Text>
                  {athletic.awards.map((award, awardIndex) => (
                    <View key={awardIndex} style={styles.awardRow}>
                      <TextInput
                        style={[styles.input, styles.awardTitleInput]}
                        placeholder="Award Title"
                        placeholderTextColor="#888"
                        value={award.title}
                        onChangeText={(value) =>
                          handleAwardChange(
                            "athletics",
                            athleticIndex,
                            awardIndex,
                            "title",
                            value
                          )
                        }
                      />
                      <TextInput
                        style={[styles.input, styles.awardDescriptionInput]}
                        placeholder="Award Description"
                        placeholderTextColor="#888"
                        value={award.description}
                        onChangeText={(value) =>
                          handleAwardChange(
                            "athletics",
                            athleticIndex,
                            awardIndex,
                            "description",
                            value
                          )
                        }
                      />
                    </View>
                  ))}
                  <TouchableOpacity
                    style={styles.addAwardButton}
                    onPress={() => handleAddAward("athletics", athleticIndex)}
                  >
                    <Ionicons name="add" size={24} color="#fff" />
                  </TouchableOpacity>
                </View>
                {athleticIndex === athletics.length - 1 && (
                  <TouchableOpacity
                    style={[styles.addActivityButton, styles.addAthleticButton]}
                    onPress={() => handleAddActivity("athletics")}
                  >
                    <Ionicons name="add" size={24} color="#fff" />
                  </TouchableOpacity>
                )}
              </View>
            ))}
            <Text style={styles.sectionTitle}>Performing Arts</Text>
            {performingArts.map((performingArt, performingArtIndex) => (
              <View key={performingArtIndex} style={styles.activitySection}>
                <TextInput
                  style={[styles.input, styles.activityNameInput]}
                  placeholder="Performing Art Name"
                  placeholderTextColor="#888"
                  value={performingArt.name}
                  onChangeText={(value) =>
                    handleActivityChange(
                      "performingArts",
                      performingArtIndex,
                      "name",
                      value
                    )
                  }
                />
                <TextInput
                  style={[styles.input, styles.activityDescriptionInput]}
                  placeholder="Description"
                  placeholderTextColor="#888"
                  value={performingArt.description}
                  onChangeText={(value) =>
                    handleActivityChange(
                      "performingArts",
                      performingArtIndex,
                      "description",
                      value
                    )
                  }
                />
                <View style={styles.videosSection}>
                  <Text style={styles.videosTitle}>Videos</Text>
                  {performingArt.videos.map((video, videoIndex) => (
                    <TouchableOpacity
                      key={videoIndex}
                      style={styles.videoButton}
                      onPress={() =>
                        handleHighlightChange(
                          "performingArts",
                          performingArtIndex,
                          videoIndex
                        )
                      }
                    >
                      {video.key ? (
                        <Video
                          source={{ uri: video.key }}
                          style={{ width: 50, height: 50 }}
                          resizeMode="cover"
                        />
                      ) : (
                        <Ionicons
                          name="videocam-outline"
                          size={24}
                          color="#888"
                        />
                      )}
                    </TouchableOpacity>
                  ))}
                  <TouchableOpacity
                    style={styles.addVideoButton}
                    onPress={() =>
                      handleAddHighlight("performingArts", performingArtIndex)
                    }
                  >
                    <Ionicons name="add" size={24} color="#fff" />
                  </TouchableOpacity>
                </View>
                <View style={styles.imagesSection}>
                  <Text style={styles.imagesTitle}>Images</Text>
                  {performingArt.images.map((image, imageIndex) => (
                    <TouchableOpacity
                      key={imageIndex}
                      style={styles.imageButton}
                      onPress={() =>
                        handleImageChange(
                          "performingArts",
                          performingArtIndex,
                          imageIndex
                        )
                      }
                    >
                      {image.key ? (
                        <Image
                          source={{ uri: image.key }}
                          style={{ width: 50, height: 50 }}
                          resizeMode="cover"
                        />
                      ) : (
                        <Ionicons name="image-outline" size={24} color="#888" />
                      )}
                    </TouchableOpacity>
                  ))}
                  <TouchableOpacity
                    style={styles.addImageButton}
                    onPress={() =>
                      handleAddImage("performingArts", performingArtIndex)
                    }
                  >
                    <Ionicons name="add" size={24} color="#fff" />
                  </TouchableOpacity>
                </View>
                <View style={styles.awardsSection}>
                  <Text style={styles.awardsTitle}>Awards</Text>
                  {performingArt.awards.map((award, awardIndex) => (
                    <View key={awardIndex} style={styles.awardRow}>
                      <TextInput
                        style={[styles.input, styles.awardTitleInput]}
                        placeholder="Award Title"
                        placeholderTextColor="#888"
                        value={award.title}
                        onChangeText={(value) =>
                          handleAwardChange(
                            "performingArts",
                            performingArtIndex,
                            awardIndex,
                            "title",
                            value
                          )
                        }
                      />
                      <TextInput
                        style={[styles.input, styles.awardDescriptionInput]}
                        placeholder="Award Description"
                        placeholderTextColor="#888"
                        value={award.description}
                        onChangeText={(value) =>
                          handleAwardChange(
                            "performingArts",
                            performingArtIndex,
                            awardIndex,
                            "description",
                            value
                          )
                        }
                      />
                    </View>
                  ))}
                  <TouchableOpacity
                    style={styles.addAwardButton}
                    onPress={() =>
                      handleAddAward("performingArts", performingArtIndex)
                    }
                  >
                    <Ionicons name="add" size={24} color="#fff" />
                  </TouchableOpacity>
                </View>
                {performingArtIndex === performingArts.length - 1 && (
                  <TouchableOpacity
                    style={[
                      styles.addActivityButton,
                      styles.addPerformingArtButton,
                    ]}
                    onPress={() => handleAddActivity("performingArts")}
                  >
                    <Ionicons name="add" size={24} color="#fff" />
                  </TouchableOpacity>
                )}
              </View>
            ))}
            <Text style={styles.sectionTitle}>Volunteering</Text>
            {volunteering.map((volunteer, volunteeringIndex) => (
              <View key={volunteeringIndex} style={styles.activitySection}>
                <TextInput
                  style={[styles.input, styles.activityNameInput]}
                  placeholder="Volunteering Name"
                  placeholderTextColor="#888"
                  value={volunteer.name}
                  onChangeText={(value) =>
                    handleActivityChange(
                      "volunteering",
                      volunteeringIndex,
                      "name",
                      value
                    )
                  }
                />
                <TextInput
                  style={[styles.input, styles.activityImpactInput]}
                  placeholder="Impact"
                  placeholderTextColor="#888"
                  value={volunteer.impact}
                  onChangeText={(value) =>
                    handleActivityChange(
                      "volunteering",
                      volunteeringIndex,
                      "impact",
                      value
                    )
                  }
                />
                <View style={styles.imagesSection}>
                  <Text style={styles.imagesTitle}>Images</Text>
                  {volunteer.images.map((image, imageIndex) => (
                    <TouchableOpacity
                      key={imageIndex}
                      style={styles.imageButton}
                      onPress={() =>
                        handleImageChange(
                          "volunteering",
                          volunteeringIndex,
                          imageIndex
                        )
                      }
                    >
                      {image.key ? (
                        <Image
                          source={{ uri: image.key }}
                          style={{ width: 50, height: 50 }}
                          resizeMode="cover"
                        />
                      ) : (
                        <Ionicons name="image-outline" size={24} color="#888" />
                      )}
                    </TouchableOpacity>
                  ))}
                  <TouchableOpacity
                    style={styles.addImageButton}
                    onPress={() =>
                      handleAddImage("volunteering", volunteeringIndex)
                    }
                  >
                    <Ionicons name="add" size={24} color="#fff" />
                  </TouchableOpacity>
                </View>
                <View style={styles.eventsSection}>
                  <Text style={styles.eventsTitle}>Events</Text>
                  {volunteer.events.map((event, eventIndex) => (
                    <View key={eventIndex} style={styles.eventRow}>
                      <TextInput
                        style={[styles.input, styles.eventTitleInput]}
                        placeholder="Event Title"
                        placeholderTextColor="#888"
                        value={event.title}
                        onChangeText={(value) =>
                          handleEventChange(
                            volunteeringIndex,
                            eventIndex,
                            "title",
                            value
                          )
                        }
                      />
                      <View style={styles.eventYearsRow}>
                        <TextInput
                          style={[styles.input, styles.eventStartYearInput]}
                          placeholder="Start Year"
                          placeholderTextColor="#888"
                          value={event.startYear}
                          onChangeText={(value) =>
                            handleEventChange(
                              volunteeringIndex,
                              eventIndex,
                              "startYear",
                              value
                            )
                          }
                          keyboardType="numeric"
                        />
                        <TextInput
                          style={[styles.input, styles.eventEndYearInput]}
                          placeholder="End Year"
                          placeholderTextColor="#888"
                          value={event.endYear}
                          onChangeText={(value) =>
                            handleEventChange(
                              volunteeringIndex,
                              eventIndex,
                              "endYear",
                              value
                            )
                          }
                          keyboardType="numeric"
                        />
                      </View>
                      <TextInput
                        style={[styles.input, styles.eventDescriptionInput]}
                        placeholder="Event Description"
                        placeholderTextColor="#888"
                        value={event.description}
                        onChangeText={(value) =>
                          handleEventChange(
                            volunteeringIndex,
                            eventIndex,
                            "description",
                            value
                          )
                        }
                      />
                    </View>
                  ))}
                  <TouchableOpacity
                    style={styles.addEventButton}
                    onPress={() => handleAddEvent(volunteeringIndex)}
                  >
                    <Ionicons name="add" size={24} color="#fff" />
                  </TouchableOpacity>
                </View>
                {volunteeringIndex === volunteering.length - 1 && (
                  <TouchableOpacity
                    style={[
                      styles.addActivityButton,
                      styles.addVolunteeringButton,
                    ]}
                    onPress={() => handleAddActivity("volunteering")}
                  >
                    <Ionicons name="add" size={24} color="#fff" />
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </View>
          <Text style={styles.sectionTitle}>Projects</Text>
          {projects.map((project, index) => (
            <View key={index} style={styles.projectSection}>
              <TextInput
                style={[styles.input, styles.projectNameInput]}
                placeholder="Project Name"
                placeholderTextColor="#888"
                value={project.name}
                onChangeText={(value) =>
                  handleProjectChange(index, "name", value)
                }
              />
              <TextInput
                style={[styles.input, styles.projectDescriptionInput]}
                placeholder="Project Description"
                placeholderTextColor="#888"
                value={project.description}
                onChangeText={(value) =>
                  handleProjectChange(index, "description", value)
                }
              />
              <TextInput
                style={[styles.input, styles.projectLinkInput]}
                placeholder="Project Link"
                placeholderTextColor="#888"
                value={project.link}
                onChangeText={(value) =>
                  handleProjectChange(index, "link", value)
                }
              />
              <View style={styles.projectSkillsSection}>
                <Text style={styles.projectSkillsTitle}>Skills</Text>
                {project.skills.map((skill, skillIndex) => (
                  <TextInput
                    key={skillIndex}
                    style={[styles.input, styles.projectSkillInput]}
                    placeholder="Skill"
                    placeholderTextColor="#888"
                    value={skill}
                    onChangeText={(value) =>
                      handleSkillChange(index, skillIndex, value)
                    }
                  />
                ))}
                <TouchableOpacity
                  style={styles.addProjectSkillButton}
                  onPress={() => handleAddSkill(index)}
                >
                  <Ionicons name="add" size={24} color="#fff" />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.projectImageButton}
                onPress={() => handleImagePicker(index)}
              >
                {project.image ? (
                  <Image
                    source={{ uri: project.image }}
                    style={{ width: 50, height: 50 }}
                    resizeMode="cover"
                  />
                ) : (
                  <Ionicons name="image-outline" size={24} color="#888" />
                )}
              </TouchableOpacity>
            </View>
          ))}
          <TouchableOpacity
            style={styles.addProjectButton}
            onPress={handleAddProject}
          >
            <Ionicons name="add" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleNextStep}>
            <Text style={styles.buttonText}>
              {editing ? "NEXT UPDATE" : "NEXT STEP"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.skipButtonContainer}
            onPress={handleSkip}
          >
            <Text style={styles.skipButtonText}>
              {editing ? "Update! Go to Home" : "Skip! Go to Home"}
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
  timelineItemInactive: {
    backgroundColor: "#444",
  },
  timelineLineInactive: {
    backgroundColor: "#444",
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
  activitySection: {
    marginBottom: 20,
  },
  activityNameInput: {
    flex: 1,
    marginBottom: 10,
  },
  activityDescriptionInput: {
    flex: 1,
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#222",
    color: "#fff",
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 20,
    fontSize: 16,
    marginBottom: 5,
  },
  highlightsSection: {
    marginTop: 20,
  },
  highlightsTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  highlightButton: {
    backgroundColor: "#222",
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  addHighlightButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#38a093",
    marginBottom: 20,
  },
  imagesSection: {
    marginTop: 20,
  },
  imagesTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  imageButton: {
    backgroundColor: "#222",
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  addImageButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#38a093",
    marginBottom: 20,
  },
  videosSection: {
    marginTop: 20,
  },
  videosTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  videoButton: {
    backgroundColor: "#222",
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  addVideoButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#38a093",
    marginBottom: 20,
  },
  awardsSection: {
    marginTop: 20,
  },
  awardsTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  awardRow: {
    marginBottom: 10,
  },
  awardTitleInput: {
    flex: 1,
    marginBottom: 5,
  },
  awardDescriptionInput: {
    flex: 1,
  },
  addAwardButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#38a093",
    marginBottom: 20,
  },
  addActivityButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#38a093",
    marginBottom: 20,
  },
  addAthleticButton: {
    marginTop: 30,
  },
  addPerformingArtButton: {
    marginTop: 30,
  },
  activityImpactInput: {
    flex: 1,
    marginBottom: 10,
  },
  eventsSection: {
    marginTop: 20,
  },
  eventsTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  eventRow: {
    marginBottom: 10,
  },
  eventTitleInput: {
    flex: 1,
    marginBottom: 5,
  },
  eventYearsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  eventStartYearInput: {
    flex: 0.48,
    marginRight: 10,
  },
  eventEndYearInput: {
    flex: 0.48,
  },
  eventDescriptionInput: {
    flex: 1,
  },
  addEventButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#38a093",
    marginBottom: 20,
  },
  addVolunteeringButton: {
    marginTop: 30,
  },
  projectSection: {
    marginBottom: 20,
  },
  projectNameInput: {
    flex: 1,
    marginBottom: 10,
  },
  projectDescriptionInput: {
    flex: 1,
    marginBottom: 10,
  },
  projectLinkInput: {
    flex: 1,
    marginBottom: 10,
  },
  projectSkillsSection: {
    marginTop: 20,
  },
  projectSkillsTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  projectSkillInput: {
    flex: 1,
    marginBottom: 10,
  },
  addProjectSkillButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#38a093",
    marginBottom: 20,
  },
  projectImageButton: {
    backgroundColor: "#222",
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  addProjectButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#38a093",
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
});
