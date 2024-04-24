import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { auth, db } from "../../../firebaseConfig";
import { useRouter } from "expo-router";

export default function Messages() {
  const navigation = useNavigation();
  const router = useRouter();
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchChats = async () => {
      if (auth.currentUser) {
        const chatsRef = collection(db, "users", auth.currentUser.uid, "chats");
        const chatsSnapshot = await getDocs(chatsRef);
        const chatsData = await Promise.all(
          chatsSnapshot.docs.map(async (documentSnapshot) => {
            const recipientId = documentSnapshot.id;
            const recipientRef = doc(db, "users", recipientId);
            const recipientSnapshot = await getDoc(recipientRef);
            if (recipientSnapshot.exists()) {
              const { firstName, lastName, profilePicture, highSchool } =
                recipientSnapshot.data();
              return {
                id: recipientId,
                firstName,
                lastName,
                profilePicture:
                  profilePicture ||
                  "https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg",
                highSchool: highSchool || "Unknown High School",
              };
            }
            return null;
          })
        );
        const filteredChatsData = chatsData.filter((chat) => chat !== null);
        setChats(filteredChatsData);
        console.log(chatsSnapshot.docs);
      }
      setIsLoading(false);
    };
    fetchChats();
  }, [navigation]);

  const handlePress = (chatId) => {
    router.push({
      pathname: "../messaging",
      params: { recipientUserId: chatId },
    });
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ffd700" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {chats.map((chat) => (
        <TouchableOpacity
          key={chat.id}
          style={styles.chatItem}
          onPress={() => handlePress(chat.id)}
        >
          <Image
            source={{ uri: chat.profilePicture }}
            style={styles.profilePicture}
          />
          <View style={styles.userInfo}>
            <Text
              style={styles.name}
            >{`${chat.firstName} ${chat.lastName}`}</Text>
            <Text style={styles.highSchool}>{chat.highSchool}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20,
  },
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#222",
  },
  profilePicture: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
    borderWidth: 2,
    borderColor: "#38a093",
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  highSchool: {
    fontSize: 16,
    color: "#38a093",
  },
});
