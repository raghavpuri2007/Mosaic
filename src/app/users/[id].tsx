import { useLocalSearchParams, useNavigation } from "expo-router"
import { Text, View, Image, StyleSheet, Pressable, ScrollView } from 'react-native';
import userJson from '../../../assets/data/user.json';
import { useLayoutEffect, useState } from "react";
import { User, Score } from "../../types";
import ExperienceListItem from "../../components/ExperienceListItem";
import { CircularProgress } from 'react-native-circular-progress-indicator';

const ScoresSection = ({ scores }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Scores</Text>
      <ScoreRow label="GPA" score={scores.gpa} percentile={scores.percentiles.gpa} />
      <ScoreRow label="Weighted GPA" score={scores.weightedGPA} percentile={scores.percentiles.weightedGPA} />
      <ScoreRow label="SAT Score" score={scores.satScore} percentile={scores.percentiles.satScore} />
      {scores.apScores && scores.apScores.length > 0 && (
        <>
          <Text style={styles.apScoresTitle}>AP Scores</Text>
          {scores.apScores.map((apScore, index) => (
            <View key={index} style={styles.scoreRow}>
              <Text style={styles.apScoreText}>• {apScore.subject} AP: {apScore.score}</Text>
              <CircularProgress
                value={apScore.percentile}
                radius={30}
                inActiveStrokeColor="#ddd"
                inActiveStrokeOpacity={0.2}
                activeStrokeColor={'#00e676'}
                progressValueColor={'#fff'}
                valueSuffix={'%'}
              />
            </View>
          ))}
        </>
      )}
    </View>
  );
};

const ScoreRow = ({ label, score, percentile }) => (
  <View style={styles.scoreRow}>
    <Text style={styles.scoreText}>{label}: {score}</Text>
    <CircularProgress
      value={percentile}
      radius={30}
      inActiveStrokeColor="#ddd"
      inActiveStrokeOpacity={0.2}
      activeStrokeColor={'#00e676'} // Green color as it fills up
      progressValueColor={'#fff'} // White text color
      valueSuffix={'%'}
    />
  </View>
);


export default function UserProfile() {
    const [user, setUser] = useState<User>(userJson);

    const { id } = useLocalSearchParams();
    const navigation = useNavigation();


    const onConnect = () => {
        console.warn('Connect');
    }

    useLayoutEffect(() => {
        navigation.setOptions({ title: user.name });

    }, [user?.name])


    return (
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

            {/* Experience */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Experience</Text>
                {user.experience?.map(experience => (
                <ExperienceListItem key={experience.id} experience={experience}/>))}
            </View>

            
            {/* Scores */}
            <View style={styles.section}>
                <ScoresSection scores={user.scores} />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {},
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


});