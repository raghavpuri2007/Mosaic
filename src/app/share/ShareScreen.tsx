import React, { useRef } from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { captureRef } from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { themes } from "../../constants/Themes";
import { User } from "../../types";
import userJson from "../../../assets/data/user.json";

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
    mosaic_logo: require("../../../assets/images/mosaic_logo.png"),
    play_store: require("../../../assets/images/play_store.png"),
    app_store: require("../../../assets/images/app_store.png"),
  };
  
  const user: User = userJson as User;
  const theme = themes[user.theme] || themes.default;
  
  const ShareScreen = () => {
    const viewRef = useRef<View>(null);
    const navigation = useNavigation();
  
    const firstName = user.name.split(' ')[0];
  
    const shareImageInsta = async () => {
      if (!viewRef.current) return;
      try {
        const uri = await captureRef(viewRef.current, {
          format: "png",
          quality: 0.7,
        });
  
        const isAvailable = await Sharing.isAvailableAsync();
        if (!isAvailable) {
          alert("Sharing is not available on your device.");
          return;
        }
        await Sharing.shareAsync(uri);
      } catch (error) {
        console.error("Failed to share:", error);
      }
    };
  
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View ref={viewRef} style={[styles.header, { backgroundColor: theme.primary }]}>

          <View style={styles.headerContent}>
            <Image source={images[user.image]} style={styles.image} />
            <Text style={styles.name}>{user.name}</Text>
            <Text style={{ color: theme.text }}>{user.position}</Text>
            <View style={styles.logoAndText}>
            <Image source={images.mosaic_logo} style={styles.logo} />
            <Text style={styles.profileText}>Take a look at {firstName}'s full profile on Mosaic!</Text>
          </View>
            <View style={styles.storeIcons}>
          <Image source={images.play_store} style={styles.storeIcon} />
          <Image source={images.app_store} style={styles.storeIcon} />
        </View>
          </View>
        </View>
        <Pressable onPress={shareImageInsta} style={styles.shareButton}>
          <Text style={styles.buttonText}>Share</Text>
        </Pressable>

      </ScrollView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    header: {
      borderRadius: 10,
      padding: 20,
      alignItems: 'center',
      justifyContent: 'center',
      width: 300,
      height: 300,
    },
    logoAndText: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
      width: '80%',
    },
    headerContent: {
      paddingTop: 10,
      alignItems: 'center',
    },
    image: {
      width: 100,
      height: 100,
      borderRadius: 50,
      borderWidth: 3,
      borderColor: '#ccc',
    },
    logo: {
      width: 60,
      height: 60,
      borderRadius: 30,
      marginRight: 10,
    },
    profileText: {
      fontSize: 16,
      color: '#fff',
      textAlign: 'center',
    },
    name: {
      fontSize: 24,
      fontWeight: "500",
      color: '#333',
    },
    shareButton: {
      padding: 10,
      backgroundColor: 'blue',
      borderRadius: 20,
      width: 150,
      alignItems: 'center',
      marginTop: 20,
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
    },
    storeIcons: {
      flexDirection: 'row',
      marginTop: 10,
    },
    storeIcon: {
      width: '45%',
      aspectRatio: 3,
      marginHorizontal: 10,
    },
  });
  
export default ShareScreen;
