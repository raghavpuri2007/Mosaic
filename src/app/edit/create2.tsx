import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter, useLocalSearchParams } from "expo-router";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../../../firebaseConfig";

export default function Create2() {
  const { editing } = useLocalSearchParams();
  const router = useRouter();
  const [apScores, setApScores] = useState([]);
  const [transcript, setTranscript] = useState([]);
  const [accolades, setAccolades] = useState([]);
  const [gpa, setGPA] = useState("");
  const [weightedGPA, setWeightedGPA] = useState("");
  const [satScore, setSatScore] = useState("");
  const [actScore, setActScore] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      if (editing === "true" && auth.currentUser) {
        const userRef = doc(db, "users", auth.currentUser.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setApScores(userData.scores?.apScores || []);
          setTranscript(userData.grades?.transcript || []);
          setAccolades(userData.accolades || []);
          setGPA(userData.grades?.gpa || "");
          setWeightedGPA(userData.grades?.weightedGPA || "");
          setSatScore(userData.scores?.satScore || "");
          setActScore(userData.scores?.actScore || "");
        }
      }
    };
    fetchUserData();
  }, [editing]);

  const handleAddApScore = () => {
    setApScores([...apScores, { subject: "", score: "" }]);
  };

  const handleApScoreChange = (index, field, value) => {
    const updatedScores = [...apScores];
    updatedScores[index][field] = value;
    setApScores(updatedScores);
  };

  const handleAddYear = () => {
    setTranscript([
      ...transcript,
      {
        startYear: "",
        endYear: "",
        courses: [{ grade: "", AP: false, Period: "", Class: "" }],
      },
    ]);
  };

  const handleAddCourse = (yearIndex) => {
    const updatedTranscript = [...transcript];
    updatedTranscript[yearIndex].courses.push({
      grade: "",
      AP: false,
      Period: "",
      Class: "",
    });
    setTranscript(updatedTranscript);
  };

  const handleCourseChange = (yearIndex, courseIndex, field, value) => {
    const updatedTranscript = [...transcript];
    updatedTranscript[yearIndex].courses[courseIndex][field] = value;
    setTranscript(updatedTranscript);
  };

  const handleYearChange = (yearIndex, field, value) => {
    const updatedTranscript = [...transcript];
    updatedTranscript[yearIndex][field] = value;
    setTranscript(updatedTranscript);
  };

  const handleAddAccolade = () => {
    setAccolades([...accolades, { title: "", description: "" }]);
  };

  const handleAccoladeChange = (index, field, value) => {
    const updatedAccolades = [...accolades];
    updatedAccolades[index][field] = value;
    setAccolades(updatedAccolades);
  };

  const saveDataToFirebase = async () => {
    if (auth.currentUser) {
      const userRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userRef, {
        scores: {
          apScores,
          satScore,
          actScore,
        },
        grades: {
          gpa,
          weightedGPA,
          transcript,
        },
        accolades,
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
      pathname: "../edit/create3",
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
          <Text style={styles.stepText}>Step 02</Text>
          <Text style={styles.headerTitle}>Academic Information</Text>
          <Text style={styles.subtitleText}>
            All information is optional, add data where applicable!
          </Text>
        </View>
        <View style={styles.timeline}>
          <View style={styles.timelineItems}>
            <View style={[styles.timelineItem, styles.timelineItemActive]} />
            <View style={[styles.timelineLine, styles.timelineLineActive]} />
            <View style={[styles.timelineItem, styles.timelineItemActive]} />
            <View style={[styles.timelineLine, styles.timelineLineInactive]} />
            <View style={[styles.timelineItem, styles.timelineItemInactive]} />
            <View style={[styles.timelineLine, styles.timelineLineInactive]} />
            <View style={[styles.timelineItem, styles.timelineItemInactive]} />
          </View>
        </View>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.form}>
            <View style={styles.inputRow}>
              <TextInput
                style={styles.input}
                placeholder="GPA"
                placeholderTextColor="#888"
                keyboardType="numeric"
                value={gpa}
                onChangeText={setGPA}
              />
              <TextInput
                style={styles.input}
                placeholder="Weighted GPA"
                placeholderTextColor="#888"
                keyboardType="numeric"
                value={weightedGPA}
                onChangeText={setWeightedGPA}
              />
            </View>
            <View style={styles.inputRow}>
              <TextInput
                style={styles.input}
                placeholder="SAT Score"
                placeholderTextColor="#888"
                keyboardType="number-pad"
                value={satScore}
                onChangeText={setSatScore}
              />
              <TextInput
                style={styles.input}
                placeholder="ACT Score"
                placeholderTextColor="#888"
                keyboardType="number-pad"
                value={actScore}
                onChangeText={setActScore}
              />
            </View>
            <Text style={styles.sectionTitle}>Transcript</Text>
            {transcript.map((year, yearIndex) => (
              <View key={yearIndex} style={styles.transcriptYear}>
                <View style={styles.inputRow}>
                  <TextInput
                    style={styles.input}
                    placeholder="Start Year"
                    placeholderTextColor="#888"
                    value={year.startYear}
                    onChangeText={(value) =>
                      handleYearChange(yearIndex, "startYear", value)
                    }
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="End Year"
                    placeholderTextColor="#888"
                    value={year.endYear}
                    onChangeText={(value) =>
                      handleYearChange(yearIndex, "endYear", value)
                    }
                  />
                </View>
                {year.courses.map((course, courseIndex) => (
                  <View key={courseIndex} style={styles.courseRow}>
                    <View style={styles.courseDetailsRow}>
                      <TextInput
                        style={styles.courseClassInput}
                        placeholder="Class"
                        placeholderTextColor="#888"
                        value={course.Class}
                        onChangeText={(value) =>
                          handleCourseChange(
                            yearIndex,
                            courseIndex,
                            "Class",
                            value
                          )
                        }
                      />
                      <TextInput
                        style={styles.coursePeriodInput}
                        placeholder="Period"
                        placeholderTextColor="#888"
                        keyboardType="number-pad"
                        value={course.Period.toString()}
                        onChangeText={(value) =>
                          handleCourseChange(
                            yearIndex,
                            courseIndex,
                            "Period",
                            value
                          )
                        }
                      />
                    </View>
                    <View style={styles.courseDetailsRow}>
                      <TextInput
                        style={styles.courseGradeInput}
                        placeholder="Grade"
                        placeholderTextColor="#888"
                        value={course.grade}
                        onChangeText={(value) =>
                          handleCourseChange(
                            yearIndex,
                            courseIndex,
                            "grade",
                            value
                          )
                        }
                      />
                      <TouchableOpacity
                        style={[
                          styles.courseAPInput,
                          course.AP && styles.courseAPInputActive,
                        ]}
                        onPress={() =>
                          handleCourseChange(
                            yearIndex,
                            courseIndex,
                            "AP",
                            !course.AP
                          )
                        }
                      >
                        <Text style={styles.courseAPText}>AP</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
                <TouchableOpacity
                  style={styles.addCourseButton}
                  onPress={() => handleAddCourse(yearIndex)}
                >
                  <Ionicons name="add" size={24} color="#fff" />
                </TouchableOpacity>
              </View>
            ))}
            <TouchableOpacity
              style={styles.addYearButton}
              onPress={handleAddYear}
            >
              <Text style={styles.addYearButtonText}>Add Year</Text>
            </TouchableOpacity>
            <Text style={styles.sectionTitle}>AP Scores</Text>
            {apScores.map((score, index) => (
              <View key={index} style={styles.apScoreRow}>
                <TextInput
                  style={styles.apSubjectInput}
                  placeholder="AP Subject"
                  placeholderTextColor="#888"
                  value={score.subject}
                  onChangeText={(value) =>
                    handleApScoreChange(index, "subject", value)
                  }
                />
                <TextInput
                  style={styles.apScoreInput}
                  placeholder="Score"
                  placeholderTextColor="#888"
                  keyboardType="number-pad"
                  value={score.score}
                  onChangeText={(value) =>
                    handleApScoreChange(index, "score", value)
                  }
                />
              </View>
            ))}
            <TouchableOpacity
              style={styles.addApScoreButton}
              onPress={handleAddApScore}
            >
              <Ionicons name="add" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.sectionTitle}>Accolades</Text>
            {accolades.map((accolade, index) => (
              <View key={index} style={styles.accoladeRow}>
                <TextInput
                  style={styles.accoladeTitleInput}
                  placeholder="Title"
                  placeholderTextColor="#888"
                  value={accolade.title}
                  onChangeText={(value) =>
                    handleAccoladeChange(index, "title", value)
                  }
                />
                <TextInput
                  style={styles.accoladeDescriptionInput}
                  placeholder="Description"
                  placeholderTextColor="#888"
                  value={accolade.description}
                  onChangeText={(value) =>
                    handleAccoladeChange(index, "description", value)
                  }
                />
              </View>
            ))}
            <TouchableOpacity
              style={styles.addAccoladeButton}
              onPress={handleAddAccolade}
            >
              <Ionicons name="add" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
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
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  input: {
    backgroundColor: "#222",
    color: "#fff",
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 20,
    fontSize: 16,
    flex: 1,
    marginHorizontal: 5,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  transcriptYear: {
    marginBottom: 20,
  },
  courseRow: {
    flexDirection: "column",
    marginBottom: 10,
  },
  courseDetailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  courseClassInput: {
    backgroundColor: "#222",
    color: "#fff",
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 20,
    fontSize: 16,
    flex: 1,
    marginRight: 5,
  },
  coursePeriodInput: {
    backgroundColor: "#222",
    color: "#fff",
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 20,
    fontSize: 16,
    flex: 1,
    marginLeft: 5,
  },
  courseGradeInput: {
    backgroundColor: "#222",
    color: "#fff",
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 20,
    fontSize: 16,
    flex: 1,
    marginRight: 5,
  },
  courseAPInput: {
    flex: 0.4,
    backgroundColor: "#444",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginLeft: 5,
  },
  courseAPInputActive: {
    backgroundColor: "#38a093",
  },
  courseAPText: {
    color: "#fff",
    fontSize: 14,
  },
  addCourseButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#38a093",
    marginBottom: 10,
  },
  addYearButton: {
    backgroundColor: "#38a093",
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 20,
  },
  addYearButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  apScoreRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  apSubjectInput: {
    backgroundColor: "#222",
    color: "#fff",
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 20,
    fontSize: 16,
    flex: 1,
    marginRight: 5,
  },
  apScoreInput: {
    backgroundColor: "#222",
    color: "#fff",
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 20,
    fontSize: 16,
    flex: 1,
    marginLeft: 5,
  },
  addApScoreButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#38a093",
    marginBottom: 20,
  },
  accoladeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  accoladeTitleInput: {
    backgroundColor: "#222",
    color: "#fff",
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 20,
    fontSize: 16,
    flex: 1,
    marginRight: 5,
  },
  accoladeDescriptionInput: {
    backgroundColor: "#222",
    color: "#fff",
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 20,
    fontSize: 16,
    flex: 1,
    marginLeft: 5,
  },
  addAccoladeButton: {
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
