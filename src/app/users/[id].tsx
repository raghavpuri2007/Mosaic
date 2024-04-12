import { useLocalSearchParams, useNavigation } from "expo-router"
import { Text, View, Image, StyleSheet, Pressable, ScrollView, TouchableOpacity } from 'react-native';
import userJson from '../../../assets/data/user.json';
import { useLayoutEffect, useState, useMemo, useRef } from "react";
import { User, Score } from "../../types";
import ProjectListItem from "../../components/ProjectListItem";
import CircularProgress from 'react-native-circular-progress-indicator';
import { Table, Row, Rows } from 'react-native-table-component';
import BottomSheet from '@gorhom/bottom-sheet';

const ScoresSection = ({ scores }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Scores</Text>
      <ScoreRow label="SAT Score" score={scores.satScore} percentile={scores.percentiles.satScore} />
      <ScoreRow label="ACT Score" score={scores.actScore} percentile={scores.percentiles.actScore} />

      {scores.apScores && scores.apScores.length > 0 && (
        <>
          <Text style={styles.apScoresTitle}>AP Scores</Text>
          {scores.apScores.map((apScore, index) => (
            <View key={index} style={styles.scoreRow}>
              <Text style={styles.apScoreText}>• {apScore.subject} AP: {apScore.score}</Text>
              <CircularProgress
                value={apScore.percentile}
                radius={20}
                inActiveStrokeColor="#bcbcbc"
                inActiveStrokeOpacity={0.8}
                activeStrokeColor={'#00e676'}

                progressValueColor={'#333333'}
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
    const tableHead = ['Period', 'Course', 'Grade'];
    const tableData = courses.map(({ Period, course, grade }) => [
        Period.toString(), course, grade
    ]);
    const widthArr = [70, 210, 70];

    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Grades</Text>
            <ScoreRow label="GPA" score={grades.gpa} percentile={grades.gpaPercentile} />
            <ScoreRow label="Weighted GPA" score={grades.weightedGPA} percentile={grades.weightedGPAPercentile} />
            <Text style={styles.sectionSubtitle}>School Year: {startYear} - {endYear}</Text>
            <Table borderStyle={{ borderWidth: 1, borderColor: '#c8e1ff' }}>
                <Row data={tableHead} style={styles.head} textStyle={styles.text} widthArr={widthArr}/>
                <Rows data={tableData} textStyle={styles.text} widthArr={widthArr}/>
            </Table>
            <View style={styles.navigationContainer}>
                <TouchableOpacity onPress={handlePreviousYear} disabled={selectedYearIndex === 0}>
                    <Text style={[styles.navButton, selectedYearIndex === 0 && styles.disabledButton]}>Previous</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleNextYear} disabled={selectedYearIndex === grades.transcript.length - 1}>
                    <Text style={[styles.navButton, selectedYearIndex === grades.transcript.length - 1 && styles.disabledButton]}>Next</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const ScoreRow = ({ label, score, percentile }: { label: string, score: number, percentile: number }) => (
    <View style={styles.scoreRow}>
        <Text style={styles.scoreText}>{label}: {score}</Text>
        <CircularProgress
            value={percentile}
            radius={20}
            inActiveStrokeColor="#bcbcbc"
            inActiveStrokeOpacity={0.8}
            activeStrokeColor={'#00e676'} 
            progressValueColor={'#333333'} 
        />
    </View>
);


export default function UserProfile() {
    const [user, setUser] = useState<User>(userJson);

    const { id } = useLocalSearchParams();
    const navigation = useNavigation();
    const bottomSheetRef = useRef(null);

    const onConnect = () => {
        console.warn('Connect');
    }

    useLayoutEffect(() => {
        navigation.setOptions({ title: user.name });

        setTimeout(() => {
            if (bottomSheetRef.current) {
                bottomSheetRef.current.snapToIndex(0);
            }
        }, 4000);
    }, [user?.name])


    const renderContent = () => (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/*Header*/}
            <View style={styles.header}>
                    

                {/* BG Image */}
                <Image source={{ uri: user.backImage}} style={styles.bgImage} />
                
                <View style={styles.headerContent}>
                    {/* Profile image */}
                    <Image source={{ uri: user.image}} style={styles.image} />

                    {/* Name and Position */}
                    <Text style={styles.name}>{user.name}</Text>
                    <Text>{user.position}</Text>

                    {/*Connect button*/}
                    <Pressable onPress={onConnect}  style = {styles.button}>
                        <Text style = {styles.buttonText}>Connect</Text>
                    </Pressable>

                </View>

            </View>

            {/* About */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>About</Text>
                <Text style={styles.paragraph}>{user.about}</Text>
            </View>


            {/* Grades */}
            <View style={styles.section}>
                <GradesSection grades={user.grades} />
            </View>

            {/* Scores */}
            <View style={styles.section}>
                <ScoresSection scores={user.scores} />
            </View>

            {/* Projects */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Projects</Text>
                {user.projects?.map(project => (
                    <ProjectListItem key={project.id} project={project} />
                ))}
            </View>


        </ScrollView>
    );

    const snapPoints = useMemo(() => ['90%', '70%'], []);


    return (
        <View style={{ flex: 1 }}>
            <Image source={{ uri: user.coverImage }} style={styles.fullScreenImage} />
            <BottomSheet
                ref={bottomSheetRef}
                index={-1}
                snapPoints={snapPoints}
                enablePanDownToClose={false}
                backgroundStyle={styles.bottomSheetBackground}
                handleIndicatorStyle={styles.handleIndicator}
                >
                {renderContent()}
            </BottomSheet>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: '100%',
    },
    header: {
        marginBottom: 5,
    },
    bgImage: {
        width: '100%',
        aspectRatio: 5 / 2,
        marginBottom: -60,
    },

    headerContent: {
        padding: 10,
        paddingTop: 0,
    },
    image: {
        width: 100,
        aspectRatio: 1,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: 'white',
    },
    name: {
        fontSize: 24,
        fontWeight: '500',
    },

    //Button

    button: {
        backgroundColor: 'royalblue',
        padding: 10,
        alignItems: 'center',
        borderRadius: 50,
        marginVertical: 10,
    },

    buttonText: {
        color: 'white',
        fontWeight: '600',
    },

    section: {
        backgroundColor: 'white',
        padding: 10,
        marginVertical: 5,
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginVertical: 5,

    },

    paragraph: {
        lineHeight: 20,
    },

    scoresContainer: {
        marginLeft: 10,
    },
    scoreRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    scoreText: {
        fontSize: 16,
        lineHeight: 24,
        color: '#333',
    },
    apScoreContainer: {
        paddingLeft: 20,
    },
    apScoreText: {
        fontSize: 16,
        lineHeight: 24,
        color: '#333',
        textIndent: -10,
        paddingLeft: 10,
    },

    apScoresTitle: {
      fontSize: 17, 
      fontWeight: '600',
      marginTop: 10, 
      marginBottom: 5, 
      color: '#4A4A4A', 
  },

    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 },
    navigationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    navButton: {
        padding: 10,
        color: 'blue',
    },
    disabledButton: {
        color: 'grey',
    },
    sectionSubtitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        marginTop: 10,
    },

    fullScreenImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    bottomSheetBackground: {
        backgroundColor: 'white',
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
        backgroundColor: '#ccc',
        borderRadius: 50,
    },
});