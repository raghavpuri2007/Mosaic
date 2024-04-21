import { useLocalSearchParams, useNavigation } from "expo-router";
import {
  Text,
  View,
  Image,
  StyleSheet,
  Pressable,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import userJson from "../../../assets/data/user.json";
import { useLayoutEffect, useState, useMemo, useRef, useEffect } from "react";
import { User, Score } from "../../types";
import { themes } from "../../constants/Themes";

import ProjectListItem from "../../components/ProjectListItem";
import CircularProgress from "react-native-circular-progress-indicator";
import { Table, Row, Rows } from "react-native-table-component";
import BottomSheet from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import ClubListItem from "../../components/ClubListItem";
import { DefaultTheme } from "@react-navigation/native";
import AthleticsListItem from "../../components/AthleticsListItem";
import PerformingArtsListItem from "../../components/PerformingArtsListItem";
import VolunteeringListItem from "../../components/VolunteeringListItem";
import CollapsibleSection from "../../components/CollapsibleSection";

import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { Asset } from "expo-asset";

import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { useRouter } from "expo-router";

const images = {
  bart_pfp: require("../../../assets/images/Bart-Profile.png"),
  bart_banner: require("../../../assets/images/Bart-Banner.png"),
  bart_cover: require("../../../assets/images/Bart-Cover.png"),
  yt_banner: require("../../../assets/images/yt-banner.png"),
  gpt_banner: require("../../../assets/images/chatgpt-banner.webp"),
  fbla_logo: require("../../../assets/images/fbla_logo.png"),
  bart_club_logo: require("../../../assets/images/Bart-Profile.png"),
  fbla1: require("../../../assets/images/fbla1.png"),
  fbla2: require("../../../assets/images/fbla2.png"),
  bart_club1: require("../../../assets/images/bart_club1.png"),
  bart_club2: require("../../../assets/images/bart_club2.png"),
  bart_club3: require("../../../assets/images/bart_club3.png"),
  badge1: require("../../../assets/images/award1.jpeg"),
  badge2: require("../../../assets/images/award2.jpeg"),
  badge3: require("../../../assets/images/award3.jpeg"),
  badge4: require("../../../assets/images/award4.jpeg"),
  badge5: require("../../../assets/images/award5.png"),
  badge6: require("../../../assets/images/award6.jpeg"),
  badge7: require("../../../assets/images/award7.jpeg"),
  badge8: require("../../../assets/images/award8.jpeg"),
  default: require("../../../assets/images/default_award.jpeg"),
  soccer: require("../../../assets/images/soccer_logo.jpg"),
  basketball: require("../../../assets/images/basketball_logo.jpg"),
  soccer1: require("../../../assets/images/soccer1.png"),
  soccer2: require("../../../assets/images/soccer2.jpeg"),
  basketball1: require("../../../assets/images/basketball1.jpeg"),
  basketball2: require("../../../assets/images/basketball2.jpeg"),
  piano: require("../../../assets/images/piano.jpeg"),
  ballet: require("../../../assets/images/ballet.png"),
};

const videos = {
  clip1: require("../../../assets/videos/clip1.mp4"),
  clip2: require("../../../assets/videos/clip2.mp4"),
  clip3: require("../../../assets/videos/clip3.mp4"),
  piano_clip: require("../../../assets/videos/piano_clip.mp4"),
};

const [user, setUser] = useState<User>(userJson);
const theme = themes[user.theme] || themes.default;
const themeKey = user.theme || "default";
const router = useRouter();

const shareImage = async () => {
  try {
    // Ensure the asset is loaded
    const asset = Asset.fromModule(images[user.coverImage]);
    await asset.downloadAsync(); // This ensures the file is downloaded locally and cached

    // Check if sharing is available
    const isAvailable = await Sharing.isAvailableAsync();
    if (!isAvailable) {
      alert("Sharing is not available on your device.");
      return;
    }

    // Use the local URI from the loaded asset
    await Sharing.shareAsync(asset.localUri);
  } catch (error) {
    console.error("Failed to share:", error);
  }
};

const ScoresSection = ({ scores }) => {
  return (
    <View>
      <ScoreRow
        label="SAT Score"
        score={scores.satScore}
        percentile={scores.percentiles.satScore}
      />
      <ScoreRow
        label="ACT Score"
        score={scores.actScore}
        percentile={scores.percentiles.actScore}
      />

      {scores.apScores && scores.apScores.length > 0 && (
        <>
          <Text style={styles.apScoresTitle}>AP Scores</Text>
          {scores.apScores.map((apScore, index) => (
            <View key={index} style={styles.scoreRow}>
              <Text style={styles.apScoreText}>
                • {apScore.subject} AP: {apScore.score}
              </Text>
              <CircularProgress
                value={apScore.percentile}
                radius={20}
                inActiveStrokeColor={theme.inactiveStrokeColor}
                inActiveStrokeOpacity={0.8}
                activeStrokeColor={theme.activeStrokeColor}
                progressValueColor={theme.text}
              />
            </View>
          ))}
        </>
      )}
    </View>
  );
};

const GradesSection = ({ grades }) => {
  const [selectedYearIndex, setSelectedYearIndex] = useState(0);

  const handleNextYear = () => {
    if (selectedYearIndex < grades.transcript.length - 1) {
      setSelectedYearIndex(selectedYearIndex + 1);
    }
  };

  const handlePreviousYear = () => {
    if (selectedYearIndex > 0) {
      setSelectedYearIndex(selectedYearIndex - 1);
    }
  };

  const { startYear, endYear, courses } = grades.transcript[selectedYearIndex];
  const tableHead = ["Period", "Course", "Grade"];
  const tableData = courses.map(({ Period, course, grade }) => [
    Period.toString(),
    course,
    grade,
  ]);
  const widthArr = [70, 232, 70];

  return (
    <View>
      <ScoreRow
        label="GPA"
        score={grades.gpa}
        percentile={grades.gpaPercentile}
      />
      <ScoreRow
        label="Weighted GPA"
        score={grades.weightedGPA}
        percentile={grades.weightedGPAPercentile}
      />
      <Text style={styles.sectionSubtitle}>
        School Year: {startYear} - {endYear}
      </Text>
      <Table borderStyle={{ borderWidth: 1, borderColor: "#c8e1ff" }}>
        <Row
          data={tableHead}
          style={styles.head}
          textStyle={styles.text}
          widthArr={widthArr}
        />
        <Rows data={tableData} textStyle={styles.text} widthArr={widthArr} />
      </Table>
      <View style={styles.navigationContainer}>
        <TouchableOpacity
          onPress={handlePreviousYear}
          disabled={selectedYearIndex === 0}
        >
          <Text
            style={[
              styles.navButton,
              selectedYearIndex === 0 && styles.disabledButton,
            ]}
          >
            Previous
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleNextYear}
          disabled={selectedYearIndex === grades.transcript.length - 1}
        >
          <Text
            style={[
              styles.navButton,
              selectedYearIndex === grades.transcript.length - 1 &&
                styles.disabledButton,
            ]}
          >
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ScoreRow = ({
  label,
  score,
  percentile,
}: {
  label: string;
  score: number;
  percentile: number;
}) => (
  <View style={styles.scoreRow}>
    <Text style={styles.scoreText}>
      {label}: {score}
    </Text>
    <CircularProgress
      value={percentile}
      radius={20}
      inActiveStrokeColor={theme.inactiveStrokeColor}
      inActiveStrokeOpacity={0.8}
      activeStrokeColor={theme.activeStrokeColor}
      progressValueColor={theme.text}
    />
  </View>
);

export default function UserProfile() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const bottomSheetRef = useRef(null);

  const toggleBottomSheet = () => {
    if (bottomSheetRef.current) {
      const currentIndex = bottomSheetRef.current.currentIndex;
      console.warn("Current BottomSheet Index:");
      const targetIndex = currentIndex === -1 ? 0 : -1; // Toggle between closed (-1) and first snap point (0)
      console.warn("Snapping to index: ", targetIndex);
      bottomSheetRef.current.snapToIndex(3);
    }
  };

  const onConnect = () => {
    console.warn("Connect");
  };

  const onMessage = () => {
    console.warn("Message");
    navigation.navigate("messages");
  };

  const onEditProfile = () => {
    console.warn("Edit Profile");
    router.push({
      pathname: "../edit/create1",
      params: {
        editing: true,
      },
    });
  };

  const onChangeTheme = () => {
    console.warn("Change Theme");
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userRef = doc(db, "users", id);
        const snapshot = await getDoc(userRef);

        if (snapshot.exists()) {
          const userData = snapshot.data();
          console.log(userData);
          setUser(userData);
        } else {
          console.log("User not found");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, [id]);

  useLayoutEffect(() => {
    navigation.setOptions({ title: user.name });

    setTimeout(() => {
      if (bottomSheetRef.current) {
        bottomSheetRef.current.snapToIndex(0);
      }
    }, 2000);
  }, [user?.name]);
  const renderContent = () => (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/*Header*/}
      <View style={styles.header}>
        {/* BG Image */}
        <Image source={images[user.backImage]} style={styles.bgImage} />

        <View style={styles.headerContent}>
          {/* Profile image */}
          <Image source={images[user.image]} style={styles.image} />

          {/* Name and Position */}
          <Text style={styles.name}>{user.name}</Text>
          <Text color={theme.accent1}>{user.position}</Text>

          {/*Connect & Message buttons*/}
          <View style={styles.buttonContainer}>
            <Pressable onPress={onConnect} style={styles.buttonLarge}>
              <Text style={styles.buttonText}>Connect</Text>
            </Pressable>
            <Pressable onPress={onMessage} style={styles.buttonSmall}>
              <FontAwesome name="comment" size={20} color="white" />
            </Pressable>
          </View>

          {/* Edit Profile & Theme buttons */}
          <View style={styles.buttonContainer}>
            <Pressable onPress={onEditProfile} style={styles.buttonLarge}>
              <FontAwesome
                name="pencil"
                size={20}
                color="white"
                style={{ marginRight: 10 }}
              />
              <Text style={styles.buttonText}>Edit Profile</Text>
            </Pressable>
            <Pressable onPress={onChangeTheme} style={styles.buttonSmall}>
              <FontAwesome name="paint-brush" size={20} color="white" />
            </Pressable>
          </View>
        </View>
      </View>

      {/* About */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.paragraph}>{user.about}</Text>
      </View>

      {/* Grades */}
      <CollapsibleSection title="Grades" themeKey={themeKey}>
        <GradesSection grades={user.grades} />
      </CollapsibleSection>

      {/* Scores */}
      <CollapsibleSection title="Scores" themeKey={themeKey}>
        <ScoresSection scores={user.scores} />
      </CollapsibleSection>

      {/* Clubs */}
      <CollapsibleSection title="Clubs" themeKey={themeKey}>
        {user.clubs?.map((club) => (
          <ClubListItem
            key={club.id}
            club={club}
            images={images}
            themeKey={themeKey}
          />
        ))}
      </CollapsibleSection>

      {/* Athletics */}
      <CollapsibleSection title="Athletics" themeKey={themeKey}>
        {user.athletics?.map((athletic) => (
          <AthleticsListItem
            key={athletic.id}
            athletics={athletic}
            images={images}
            videos={videos}
            themeKey={themeKey}
          />
        ))}
      </CollapsibleSection>

      {/* Performing Arts */}
      <CollapsibleSection title="Performing Arts" themeKey={themeKey}>
        {user.performingArts?.map((art) => (
          <PerformingArtsListItem
            key={art.id}
            performingArt={art}
            images={images}
            videos={videos}
            themeKey={themeKey}
          />
        ))}
      </CollapsibleSection>

      {/* Volunteering */}
      <CollapsibleSection title="Volunteering" themeKey={themeKey}>
        {user.volunteering?.map((volunteering) => (
          <VolunteeringListItem
            key={volunteering.id}
            volunteering={volunteering}
            images={images}
            themeKey={themeKey}
          />
        ))}
      </CollapsibleSection>

      {/* Projects */}
      <CollapsibleSection title="Projects" themeKey={themeKey}>
        {user.projects?.map((project) => (
          <ProjectListItem
            key={project.id}
            project={project}
            image={images[project.projectImage]}
            themeKey={themeKey}
          />
        ))}
      </CollapsibleSection>

      {/* Accolades */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Accolades</Text>
        {user.accolades?.map((accolade, index) => (
          <View key={index} style={styles.awardItem}>
            <Image source={images[accolade.image]} style={styles.awardImage} />
            <View style={styles.awardTextContainer}>
              <Text style={styles.awardTitle}>{accolade.title}:</Text>
              <Text style={styles.awardDescription}>
                {accolade.description}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );

  const snapPoints = useMemo(
    () => ["20%", "30%", "50%", "60%", "70%", "90%"],
    []
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Image source={images[user.coverImage]} style={styles.fullScreenImage} />
      {/* Circular Buttons on Cover Image */}
      <View style={styles.coverButtonContainer}>
        <Pressable onPress={toggleBottomSheet} style={styles.coverButton}>
          <FontAwesome name="arrow-up" size={20} color="white" />
        </Pressable>

        <Pressable style={styles.coverButton}>
          <Text>Btn2</Text>
        </Pressable>

        <Pressable onPress={shareImage} style={styles.coverButton}>
          <FontAwesome name="share-alt" size={20} color="white" />
        </Pressable>

        <Pressable style={styles.coverButton}>
          <FontAwesome name="share" size={20} color="white" />
        </Pressable>
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        backgroundStyle={styles.bottomSheetBackground}
        handleIndicatorStyle={styles.handleIndicator}
      >
        {renderContent()}
      </BottomSheet>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.sectionBackground,
    height: "100%",
  },
  header: {
    marginBottom: 5,
  },
  bgImage: {
    width: "100%",
    aspectRatio: 5 / 2,
    marginBottom: -60,
  },
  headerContent: {
    padding: 10,
    paddingTop: 0,
  },
  image: {
    width: 100,
    height: 100,
    aspectRatio: 1,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: theme.background,
  },
  name: {
    fontSize: 24,
    fontWeight: "500",
    color: theme.text,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  buttonLarge: {
    backgroundColor: theme.primary, // Primary theme color for primary buttons
    width: "84.2%",
    paddingVertical: 10,
    paddingHorizontal: 2,
    borderRadius: 20,
    alignItems: "center",
  },
  buttonText: {
    color: theme.buttonText,
    fontWeight: "600",
    fontSize: 16,
  },
  buttonSmall: {
    backgroundColor: theme.accent1, // Accent color for smaller button
    width: "14%",
    padding: 10,
    borderRadius: 20,
    marginHorizontal: 2.5,
    alignItems: "center",
    justifyContent: "center",
  },
  section: {
    backgroundColor: theme.sectionBackground,
    padding: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 5,
    color: theme.text,
  },
  paragraph: {
    lineHeight: 20,
    color: theme.text,
  },
  scoresContainer: {
    marginLeft: 10,
  },
  scoreRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  scoreText: {
    fontSize: 16,
    lineHeight: 24,
    color: theme.text,
  },
  apScoreContainer: {
    paddingLeft: 20,
  },
  apScoreText: {
    fontSize: 16,
    lineHeight: 24,
    color: theme.text,
    paddingLeft: 10,
  },
  apScoresTitle: {
    fontSize: 17,
    fontWeight: "600",
    marginTop: 10,
    marginBottom: 5,
    color: theme.text,
  },
  head: { height: 40, backgroundColor: theme.headerBackground },
  text: { margin: 6, color: theme.text },
  navigationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  navButton: {
    padding: 10,
    color: theme.navButtonColor, // Color for navigation buttons
  },
  disabledButton: {
    color: theme.disabledButtonBackground, // Color for disabled elements
  },
  sectionSubtitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    marginTop: 10,
    color: theme.text,
  },
  fullScreenImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  bottomSheetBackground: {
    backgroundColor: theme.background,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  handleIndicator: {
    width: 40,
    height: 5,
    backgroundColor: "#ccc",
    borderRadius: 50,
  },
  awardItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
    paddingLeft: 10,
  },
  awardImage: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  awardTextContainer: {
    flex: 1,
    flexDirection: "column",
  },
  awardTitle: {
    fontWeight: "bold",
    color: theme.text,
  },
  awardDescription: {
    fontSize: 14,
    color: theme.text,
  },

  coverButtonContainer: {
    position: "absolute",
    top: "90%",
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  coverButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    color: theme.buttonText,
    justifyContent: "center",
    alignItems: "center",
  },
});
