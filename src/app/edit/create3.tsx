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
  const [sports, setSports] = useState([
    { name: "", levels: [""], years: "", highlightVideos: [] },
  ]);
  const [sportsAwards, setSportsAwards] = useState([""]);
  const [performingArts, setPerformingArts] = useState([
    { name: "", years: "", images: [] },
  ]);
  const [projects, setProjects] = useState([
    { name: "", description: "", link: "", skills: [""], image: null },
  ]);
  const [performingArtsAwards, setPerformingArtsAwards] = useState([""]);
  const [clubs, setClubs] = useState([
    { name: "", roles: [""], years: "", images: [] },
  ]);
  const [clubsAwards, setClubsAwards] = useState([""]);
  const [volunteering, setVolunteering] = useState([{ name: "", hours: "" }]);
  const [volunteeringAwards, setVolunteeringAwards] = useState([""]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (editing === "true" && auth.currentUser) {
        const userRef = doc(db, "users", auth.currentUser.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setSports(
            userData.sports || [
              { name: "", levels: [""], years: "", highlightVideos: [] },
            ]
          );
          setSportsAwards(userData.sportsAwards || [""]);
          setPerformingArts(
            userData.performingArts || [{ name: "", years: "", images: [] }]
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
          setPerformingArtsAwards(userData.performingArtsAwards || [""]);
          setClubs(
            userData.clubs || [{ name: "", roles: [""], years: "", images: [] }]
          );
          setClubsAwards(userData.clubsAwards || [""]);
          setVolunteering(userData.volunteering || [{ name: "", hours: "" }]);
          setVolunteeringAwards(userData.volunteeringAwards || [""]);
        }
      }
    };
    fetchUserData();
  }, [editing]);

  const handleAddActivity = (category) => {
    switch (category) {
      case "sports":
        setSports([
          ...sports,
          { name: "", levels: [""], years: "", highlightVideos: [] },
        ]);
        break;
      case "performingArts":
        setPerformingArts([
          ...performingArts,
          { name: "", years: "", images: [] },
        ]);
        break;
      case "clubs":
        setClubs([...clubs, { name: "", roles: [""], years: "", images: [] }]);
        break;
      case "volunteering":
        setVolunteering([...volunteering, { name: "", hours: "" }]);
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
      case "sports":
        const updatedSports = [...sports];
        updatedSports[index][field] = value;
        setSports(updatedSports);
        break;
      case "performingArts":
        const updatedPerformingArts = [...performingArts];
        updatedPerformingArts[index][field] = value;
        setPerformingArts(updatedPerformingArts);
        break;
      case "clubs":
        const updatedClubs = [...clubs];
        updatedClubs[index][field] = value;
        setClubs(updatedClubs);
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

  const handleAddHighlightVideo = (sportIndex) => {
    const updatedSports = [...sports];
    updatedSports[sportIndex].highlightVideos.push(null);
    setSports(updatedSports);
  };

  const handleHighlightVideoChange = async (sportIndex, videoIndex) => {
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
      const updatedSports = [...sports];
      updatedSports[sportIndex].highlightVideos[videoIndex] = result.uri;
      setSports(updatedSports);
    }
  };

  const handleAddPerformingArtImage = (index) => {
    const updatedPerformingArts = [...performingArts];
    updatedPerformingArts[index].images.push(null);
    setPerformingArts(updatedPerformingArts);
  };

  const handlePerformingArtImageChange = async (artIndex, imageIndex) => {
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
      const updatedPerformingArts = [...performingArts];
      updatedPerformingArts[artIndex].images[imageIndex] = result.uri;
      setPerformingArts(updatedPerformingArts);
    }
  };

  const handleAddClubImage = (index) => {
    const updatedClubs = [...clubs];
    updatedClubs[index].images.push(null);
    setClubs(updatedClubs);
  };

  const handleClubImageChange = async (clubIndex, imageIndex) => {
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
      const updatedClubs = [...clubs];
      updatedClubs[clubIndex].images[imageIndex] = result.uri;
      setClubs(updatedClubs);
    }
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

  const handleAddLevel = (index) => {
    const updatedSports = [...sports];
    updatedSports[index].levels.push({ level: "", years: "" });
    setSports(updatedSports);
  };

  const handleLevelChange = (sportIndex, levelIndex, field, value) => {
    const updatedSports = [...sports];
    updatedSports[sportIndex].levels[levelIndex][field] = value;
    setSports(updatedSports);
  };

  const handleAddRole = (index) => {
    const updatedClubs = [...clubs];
    updatedClubs[index].roles.push({ role: "", years: "" });
    setClubs(updatedClubs);
  };

  const handleRoleChange = (clubIndex, roleIndex, field, value) => {
    const updatedClubs = [...clubs];
    updatedClubs[clubIndex].roles[roleIndex][field] = value;
    setClubs(updatedClubs);
  };

  const handleAddAward = (category) => {
    switch (category) {
      case "sports":
        setSportsAwards([...sportsAwards, ""]);
        break;
      case "performingArts":
        setPerformingArtsAwards([...performingArtsAwards, ""]);
        break;
      case "clubs":
        setClubsAwards([...clubsAwards, ""]);
        break;
      case "volunteering":
        setVolunteeringAwards([...volunteeringAwards, ""]);
        break;
      default:
        break;
    }
  };

  const handleAwardChange = (category, index, value) => {
    switch (category) {
      case "sports":
        const updatedSportsAwards = [...sportsAwards];
        updatedSportsAwards[index] = value;
        setSportsAwards(updatedSportsAwards);
        break;
      case "performingArts":
        const updatedPerformingArtsAwards = [...performingArtsAwards];
        updatedPerformingArtsAwards[index] = value;
        setPerformingArtsAwards(updatedPerformingArtsAwards);
        break;
      case "clubs":
        const updatedClubsAwards = [...clubsAwards];
        updatedClubsAwards[index] = value;
        setClubsAwards(updatedClubsAwards);
        break;
      case "volunteering":
        const updatedVolunteeringAwards = [...volunteeringAwards];
        updatedVolunteeringAwards[index] = value;
        setVolunteeringAwards(updatedVolunteeringAwards);
        break;
      default:
        break;
    }
  };

  const saveDataToFirebase = async () => {
    if (auth.currentUser) {
      const userRef = doc(db, "users", auth.currentUser.uid);

      await updateDoc(userRef, {
        sports,
        performingArts,
        projects,
        clubs,
        sportsAwards,
        performingArtsAwards,
        clubsAwards,
        volunteering,
        volunteeringAwards,
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
            <Text style={styles.sectionTitle}>Sports</Text>
            {sports.map((sport, sportIndex) => (
              <View key={sportIndex} style={styles.activitySection}>
                <TextInput
                  style={[styles.input, styles.activityNameInput]}
                  placeholder="Sport Name"
                  placeholderTextColor="#888"
                  value={sport.name}
                  onChangeText={(value) =>
                    handleActivityChange("sports", sportIndex, "name", value)
                  }
                />
                {sport.levels.map((levelObj, levelIndex) => (
                  <View key={levelIndex} style={styles.levelContainer}>
                    <View style={styles.activityDetailsRow}>
                      <TextInput
                        style={[styles.input, styles.activityLevelInput]}
                        placeholder="Level"
                        placeholderTextColor="#888"
                        value={levelObj.level}
                        onChangeText={(value) =>
                          handleLevelChange(
                            sportIndex,
                            levelIndex,
                            "level",
                            value
                          )
                        }
                      />
                      <TextInput
                        style={[styles.input, styles.activityYearsInput]}
                        placeholder="Years"
                        placeholderTextColor="#888"
                        value={levelObj.years}
                        onChangeText={(value) =>
                          handleLevelChange(
                            sportIndex,
                            levelIndex,
                            "years",
                            value
                          )
                        }
                      />
                    </View>
                    {levelIndex === sport.levels.length - 1 && (
                      <TouchableOpacity
                        style={styles.addLevelButton}
                        onPress={() => handleAddLevel(sportIndex)}
                      >
                        <Ionicons name="add" size={24} color="#fff" />
                      </TouchableOpacity>
                    )}
                  </View>
                ))}
                <View style={styles.highlightVideosSection}>
                  <Text style={styles.highlightVideosTitle}>
                    Highlight Videos
                  </Text>
                  {sport.highlightVideos.map((video, videoIndex) => (
                    <TouchableOpacity
                      style={styles.highlightVideoButton}
                      onPress={() =>
                        handleHighlightVideoChange(sportIndex, videoIndex)
                      }
                    >
                      {video ? (
                        <Video
                          source={{ uri: video }}
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
                    style={styles.addHighlightVideoButton}
                    onPress={() => handleAddHighlightVideo(sportIndex)}
                  >
                    <Ionicons name="add" size={24} color="#fff" />
                  </TouchableOpacity>
                </View>
                {sportIndex === sports.length - 1 && (
                  <TouchableOpacity
                    style={[styles.addActivityButton, styles.addSportButton]}
                    onPress={() => handleAddActivity("sports")}
                  >
                    <Ionicons name="add" size={24} color="#fff" />
                  </TouchableOpacity>
                )}
              </View>
            ))}
            <View style={styles.awardsSection}>
              <Text style={styles.awardsTitle}>Sports Awards</Text>
              {sportsAwards.map((award, index) => (
                <View key={index} style={styles.awardRow}>
                  <TextInput
                    style={[styles.input, styles.awardInput]}
                    placeholder="Award Name"
                    placeholderTextColor="#888"
                    value={award}
                    onChangeText={(value) =>
                      handleAwardChange("sports", index, value)
                    }
                  />
                  <TouchableOpacity
                    style={styles.addAwardButton}
                    onPress={() => handleAddAward("sports")}
                  >
                    <Ionicons name="add" size={24} color="#fff" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
            <Text style={styles.sectionTitle}>Performing Arts</Text>
            {performingArts.map((art, index) => (
              <View key={index} style={styles.activitySection}>
                <TextInput
                  style={[styles.input, styles.activityNameInput]}
                  placeholder="Performing Art Name"
                  placeholderTextColor="#888"
                  value={art.name}
                  onChangeText={(value) =>
                    handleActivityChange("performingArts", index, "name", value)
                  }
                />
                <TextInput
                  style={[styles.input, styles.activityYearsInput]}
                  placeholder="Years"
                  placeholderTextColor="#888"
                  value={art.years}
                  onChangeText={(value) =>
                    handleActivityChange(
                      "performingArts",
                      index,
                      "years",
                      value
                    )
                  }
                />
                <View style={styles.performingArtImagesSection}>
                  <Text style={styles.performingArtImagesTitle}>Images</Text>
                  {art.images.map((image, imageIndex) => (
                    <TouchableOpacity
                      style={styles.performingArtImageButton}
                      onPress={() =>
                        handlePerformingArtImageChange(index, imageIndex)
                      }
                    >
                      {image ? (
                        <Image
                          source={{ uri: image }}
                          style={{ width: 50, height: 50 }}
                          resizeMode="cover"
                        />
                      ) : (
                        <Ionicons name="image-outline" size={24} color="#888" />
                      )}
                    </TouchableOpacity>
                  ))}
                  <TouchableOpacity
                    style={styles.addPerformingArtImageButton}
                    onPress={() => handleAddPerformingArtImage(index)}
                  >
                    <Ionicons name="add" size={24} color="#fff" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
            <TouchableOpacity
              style={styles.addActivityButton}
              onPress={() => handleAddActivity("performingArts")}
            >
              <Ionicons name="add" size={24} color="#fff" />
            </TouchableOpacity>
            <View style={styles.awardsSection}>
              <Text style={styles.awardsTitle}>Performing Arts Awards</Text>
              {performingArtsAwards.map((award, index) => (
                <View key={index} style={styles.awardRow}>
                  <TextInput
                    style={[styles.input, styles.awardInput]}
                    placeholder="Award Name"
                    placeholderTextColor="#888"
                    value={award}
                    onChangeText={(value) =>
                      handleAwardChange("performingArts", index, value)
                    }
                  />
                  <TouchableOpacity
                    style={styles.addAwardButton}
                    onPress={() => handleAddAward("performingArts")}
                  >
                    <Ionicons name="add" size={24} color="#fff" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
            <Text style={styles.sectionTitle}>Clubs</Text>
            {clubs.map((club, clubIndex) => (
              <View key={clubIndex} style={styles.activitySection}>
                <TextInput
                  style={[styles.input, styles.activityNameInput]}
                  placeholder="Club Name"
                  placeholderTextColor="#888"
                  value={club.name}
                  onChangeText={(value) =>
                    handleActivityChange("clubs", clubIndex, "name", value)
                  }
                />
                {club.roles.map((roleObj, roleIndex) => (
                  <View key={roleIndex} style={styles.roleContainer}>
                    <View style={styles.activityDetailsRow}>
                      <TextInput
                        style={[styles.input, styles.activityRoleInput]}
                        placeholder="Role"
                        placeholderTextColor="#888"
                        value={roleObj.role}
                        onChangeText={(value) =>
                          handleRoleChange(clubIndex, roleIndex, "role", value)
                        }
                      />
                      <TextInput
                        style={[styles.input, styles.activityYearsInput]}
                        placeholder="Years"
                        placeholderTextColor="#888"
                        value={roleObj.years}
                        onChangeText={(value) =>
                          handleRoleChange(clubIndex, roleIndex, "years", value)
                        }
                      />
                    </View>
                    {roleIndex === club.roles.length - 1 && (
                      <TouchableOpacity
                        style={styles.addRoleButton}
                        onPress={() => handleAddRole(clubIndex)}
                      >
                        <Ionicons name="add" size={24} color="#fff" />
                      </TouchableOpacity>
                    )}
                  </View>
                ))}
                <View style={styles.clubImagesSection}>
                  <Text style={styles.clubImagesTitle}>Images</Text>
                  {club.images.map((image, imageIndex) => (
                    <TouchableOpacity
                      style={styles.clubImageButton}
                      onPress={() =>
                        handleClubImageChange(clubIndex, imageIndex)
                      }
                    >
                      {image ? (
                        <Image
                          source={{ uri: image }}
                          style={{ width: 50, height: 50 }}
                          resizeMode="cover"
                        />
                      ) : (
                        <Ionicons name="image-outline" size={24} color="#888" />
                      )}
                    </TouchableOpacity>
                  ))}
                  <TouchableOpacity
                    style={styles.addClubImageButton}
                    onPress={() => handleAddClubImage(clubIndex)}
                  >
                    <Ionicons name="add" size={24} color="#fff" />
                  </TouchableOpacity>
                </View>
                {clubIndex === clubs.length - 1 && (
                  <TouchableOpacity
                    style={[styles.addActivityButton, styles.addClubButton]}
                    onPress={() => handleAddActivity("clubs")}
                  >
                    <Ionicons name="add" size={24} color="#fff" />
                  </TouchableOpacity>
                )}
              </View>
            ))}
            <View style={styles.awardsSection}>
              <Text style={styles.awardsTitle}>Club Awards</Text>
              {clubsAwards.map((award, index) => (
                <View key={index} style={styles.awardRow}>
                  <TextInput
                    style={[styles.input, styles.awardInput]}
                    placeholder="Award Name"
                    placeholderTextColor="#888"
                    value={award}
                    onChangeText={(value) =>
                      handleAwardChange("clubs", index, value)
                    }
                  />
                  <TouchableOpacity
                    style={styles.addAwardButton}
                    onPress={() => handleAddAward("clubs")}
                  >
                    <Ionicons name="add" size={24} color="#fff" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
            <Text style={styles.sectionTitle}>Volunteering</Text>
            {volunteering.map((volunteer, index) => (
              <View key={index} style={styles.activitySection}>
                <TextInput
                  style={[styles.input, styles.activityNameInput]}
                  placeholder="Volunteering Name"
                  placeholderTextColor="#888"
                  value={volunteer.name}
                  onChangeText={(value) =>
                    handleActivityChange("volunteering", index, "name", value)
                  }
                />
                <TextInput
                  style={[styles.input, styles.activityHoursInput]}
                  placeholder="Hours"
                  placeholderTextColor="#888"
                  value={volunteer.hours}
                  onChangeText={(value) =>
                    handleActivityChange("volunteering", index, "hours", value)
                  }
                  keyboardType="numeric"
                />
              </View>
            ))}
            <TouchableOpacity
              style={styles.addActivityButton}
              onPress={() => handleAddActivity("volunteering")}
            >
              <Ionicons name="add" size={24} color="#fff" />
            </TouchableOpacity>
            <View style={styles.awardsSection}>
              <Text style={styles.awardsTitle}>Volunteering Awards</Text>
              {volunteeringAwards.map((award, index) => (
                <View key={index} style={styles.awardRow}>
                  <TextInput
                    style={[styles.input, styles.awardInput]}
                    placeholder="Award Name"
                    placeholderTextColor="#888"
                    value={award}
                    onChangeText={(value) =>
                      handleAwardChange("volunteering", index, value)
                    }
                  />
                  <TouchableOpacity
                    style={styles.addAwardButton}
                    onPress={() => handleAddAward("volunteering")}
                  >
                    <Ionicons name="add" size={24} color="#fff" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
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
  highlightVideoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  performingArtImageRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  clubImageRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  projectImageRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
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
  activityDetailsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  activityLevelInput: {
    flex: 0.7,
    marginRight: 10,
  },
  activityRoleInput: {
    flex: 0.7,
    marginRight: 10,
  },
  activityYearsInput: {
    flex: 0.3,
  },
  activityHoursInput: {
    flex: 1,
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
  levelContainer: {
    marginBottom: 5,
  },
  roleContainer: {
    marginBottom: 5,
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
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  awardInput: {
    flex: 1,
    marginRight: 10,
  },
  addAwardButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ffd700",
  },
  addActivityButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ffd700",
    marginBottom: 20,
  },
  addSportButton: {
    marginTop: 30,
  },
  addClubButton: {
    marginTop: 30,
  },
  addLevelButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ffd700",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 5,
  },
  addRoleButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ffd700",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 5,
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
  projectImage: {
    width: 200,
    height: 150,
    resizeMode: "cover",
    borderRadius: 10,
  },
  projectImageButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  projectLinkInput: {
    flex: 1,
  },
  addProjectButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ffd700",
    marginBottom: 20,
  },
  highlightVideosSection: {
    marginTop: 20,
  },
  highlightVideosTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  highlightVideoButton: {
    backgroundColor: "#222",
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  highlightVideoButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  addHighlightVideoButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ffd700",
    marginBottom: 20,
  },
  performingArtImagesSection: {
    marginTop: 20,
  },
  performingArtImagesTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  performingArtImageButton: {
    backgroundColor: "#222",
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  performingArtImage: {
    width: 200,
    height: 150,
    resizeMode: "cover",
    borderRadius: 10,
  },
  performingArtImageButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  addPerformingArtImageButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ffd700",
    marginBottom: 20,
  },
  clubImagesSection: {
    marginTop: 20,
  },
  clubImagesTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  clubImageButton: {
    backgroundColor: "#222",
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  clubImage: {
    width: 200,
    height: 150,
    resizeMode: "cover",
    borderRadius: 10,
  },
  clubImageButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  addClubImageButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ffd700",
    marginBottom: 20,
  },
  projectSkillsSection: {
    marginBottom: 10,
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
    backgroundColor: "#ffd700",
    marginBottom: 10,
  },
});
