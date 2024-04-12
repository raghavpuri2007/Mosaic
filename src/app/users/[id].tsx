
import { useLocalSearchParams, useNavigation } from "expo-router"
import { Text, View, Image, StyleSheet, Pressable, ScrollView } from 'react-native';
import userJson from '../../../assets/data/user.json';
import { useLayoutEffect, useState } from "react";
import { User, Score } from "../../types";
import Speedometer, { Background, Arc, Needle, Progress, Indicator } from 'react-native-cool-speedometer';
import ExperienceListItem from "../../components/ExperienceListItem";

const ScoresSection = ({ scores }: { scores: any }) => {

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Scores</Text>
      <View style={styles.scoresContainer}>
  {/* GPA */}
  <View style={styles.scoreRow}>
    <Text style={styles.scoreText}>GPA: {scores.gpa}</Text>
    <Speedometer
      value={scores.percentiles.gpa}
      max={100}
      angle={180}
      width={80}
    >
      <Background />
      <Arc />
      <Needle />
      <Progress />
      <Indicator fixValue={true} />
    </Speedometer>
  </View>

  {/* Weighted GPA */}
  <View style={styles.scoreRow}>
    <Text style={styles.scoreText}>Weighted GPA: {scores.weightedGPA}</Text>
    <Speedometer
      value={scores.percentiles.weightedGPA}
      max={100}
      angle={180}
      width={80}
    >
      <Background />
      <Arc />
      <Needle />
      <Progress />
      <Indicator fixValue={true}/>
    </Speedometer>
  </View>

  {/* SAT Score */}
  <View style={styles.scoreRow}>
    <Text style={styles.scoreText}>SAT Score: {scores.satScore}</Text>
    <Speedometer
      value={scores.percentiles.satScore}
      max={100}
      angle={180}
      width={80}
    >
      <Background />
      <Arc />
      <Needle />
      <Progress />
      <Indicator fixValue={true}/>
    </Speedometer>
  </View>

  {/* AP Scores */}
  {scores.apScores.map((apScore, index) => (
    <View key={index} style={styles.scoreRow}>
      <Text style={styles.scoreText}>{apScore.subject} AP: {apScore.score}</Text>
      <Speedometer
        value={apScore.percentile}
        max={100}
        angle={180}
        width={80}
      >
        <Background />
        <Arc />
        <Needle />
        <Progress />
        <Indicator fixValue={true}/>
      </Speedometer>
    </View>
  ))}
</View>
    </View>
  );
};

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

            {/* Scores */}
            <View style={styles.section}>
                <ScoresSection scores={user.scores} />
            </View>

            {/* Experience */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Experience</Text>
                {user.experience?.map(experience => (
                <ExperienceListItem key={experience.id} experience={experience}/>))}
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
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginBottom: 10,
      },
      scoreItem: {
        marginVertical: 10,
      },

      scoreRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
      },
      scoreText: {
        fontWeight: 'bold',
        fontSize: 18,
        flex: 1, // Ensures the text takes up the space it needs
      },
});