import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
} from "react";
import { GiftedChat, Bubble, Time } from "react-native-gifted-chat";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  getDocs,
  setDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { auth, db } from "../../firebaseConfig.js";
import { useLocalSearchParams } from "expo-router";

export default function Messaging() {
  const router = useRouter();
  const { recipientUserId } = useLocalSearchParams();
  const [messages, setMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    _id: auth?.currentUser?.uid,
    name: "User",
    avatar:
      "https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg",
  });
  const [recipientUser, setRecipientUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchCurrentUser = async () => {
        if (auth.currentUser) {
          const userDocRef = doc(db, "users", auth.currentUser.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            setCurrentUser({
              _id: auth.currentUser.uid,
              name:
                `${userData.firstName || ""} ${
                  userData.lastName || ""
                }`.trim() || "User",
              avatar:
                userData.profilePicture ||
                "https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg",
            });
          }
        }
      };

      const fetchRecipientUser = async () => {
        if (recipientUserId) {
          const recipientUserDocRef = doc(db, "users", recipientUserId);
          const recipientUserDocSnap = await getDoc(recipientUserDocRef);

          if (recipientUserDocSnap.exists()) {
            const recipientUserData = recipientUserDocSnap.data();
            setRecipientUser({
              _id: recipientUserId,
              name: `${recipientUserData.firstName || ""} ${
                recipientUserData.lastName || ""
              }`.trim(),
              avatar: recipientUserData.profilePicture,
              highSchool: recipientUserData.highSchool || "Unknown High School",
            });
          }
        }
      };

      await fetchCurrentUser();
      await fetchRecipientUser();
    };

    fetchUsers();
  }, [recipientUserId]);

  useLayoutEffect(() => {
    const userChatsRef = collection(
      db,
      "users",
      auth.currentUser.uid,
      "chats",
      recipientUserId,
      "messages"
    );
    const q = query(userChatsRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(
        snapshot.docs.map((doc) => ({
          _id: doc.id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
        }))
      );
    });

    return () => unsubscribe();
  }, [recipientUserId]);

  const onSendMessage = useCallback(
    async (messages = []) => {
      if (messages.length === 0) return; // No messages to send

      const { _id, createdAt, text, user } = messages[0];

      // Reference to the user's chat collection
      const userChatsRef = collection(
        db,
        "users",
        auth.currentUser.uid,
        "chats",
        recipientUserId,
        "messages"
      );

      // Reference to the other user's chat collection
      const otherUserChatsRef = collection(
        db,
        "users",
        recipientUserId,
        "chats",
        auth.currentUser.uid,
        "messages"
      );

      try {
        // Check if the other user's chat collection exists
        const otherUserChatsSnapshot = await getDocs(otherUserChatsRef);
        if (otherUserChatsSnapshot.empty) {
          // Create the chat collection for the other user
          await setDoc(otherUserChatsRef.parent, {});
          console.log("Other user's chat collection created successfully.");
        }

        // Add document to user's chats
        await addDoc(userChatsRef, { _id, createdAt, text, user });
        console.log("Document added to user's chats");

        // Add document to other user's chats
        await addDoc(otherUserChatsRef, { _id, createdAt, text, user });
        console.log("Document added to other user's chats");
      } catch (error) {
        console.error("Error adding document to chats:", error);
      }
    },
    [recipientUserId]
  );

  const renderBubble = (props) => (
    <Bubble
      {...props}
      wrapperStyle={{
        left: {
          backgroundColor: "#ECECEC",
          borderRadius: 10,
        },
        right: {
          backgroundColor: "#ffd700",
          borderRadius: 10,
        },
      }}
      textStyle={{
        left: {
          color: "#000",
          fontWeight: "500",
          fontSize: 18,
        },
        right: {
          color: "#000",
          fontWeight: "500",
          fontSize: 18,
        },
      }}
    />
  );

  const renderTime = (props) => (
    <Time
      {...props}
      textStyle={{
        left: {
          color: "#000",
        },
        right: {
          color: "#000",
        },
      }}
    />
  );

  const handleGoBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.recipientUserInfoContainer}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        {recipientUser && (
          <View style={styles.recipientUserInfo}>
            <Text style={styles.recipientUserName}>{recipientUser.name}</Text>
            <Text style={styles.recipientUserHighSchool}>
              {recipientUser.highSchool}
            </Text>
          </View>
        )}
      </View>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSendMessage(messages)}
        user={currentUser}
        renderBubble={renderBubble}
        renderTime={renderTime}
        placeholder="Type a message..."
        placeholderTextColor="#888"
        textInputStyle={styles.textInput}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  textInput: {
    color: "#000",
    fontSize: 16,
    paddingHorizontal: 20,
  },
  recipientUserInfoContainer: {
    backgroundColor: "#222",
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    marginLeft: 10,
  },
  recipientUserInfo: {
    marginHorizontal: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "#333",
    alignItems: "center",
    flex: 1,
  },
  recipientUserName: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  recipientUserHighSchool: {
    color: "#fff",
    fontSize: 16,
  },
});
