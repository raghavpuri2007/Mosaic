import React, { useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { GiftedChat, Bubble, Avatar } from 'react-native-gifted-chat';
import { TouchableOpacity, StyleSheet, View, Image } from 'react-native';
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../../../firebaseConfig.js';
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { signOut } from 'firebase/auth';

export default function Messaging({ recipientUserId }) {
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();

  const onSignOut = () => {
    signOut(auth).catch(error => console.log(error))
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={onSignOut}
        >
          <AntDesign name="logout" size={24} color="grey" />
        </TouchableOpacity>
      )
    })
  }, [navigation])

  useLayoutEffect(() => {
    const userChatsRef = collection(db, 'users', auth.currentUser.uid, 'chats', 'rvd6hMbcO8hXJ1GidBImYNp2bSm1', 'messages');
    const q = query(userChatsRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, snapshot => {
      setMessages(
        snapshot.docs.map(doc => ({
          _id: doc.id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user
        }))
      )
    })
    return () => unsubscribe();
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))

    const { _id, createdAt, text, user } = messages[0];
    const userChatsRef = collection(db, 'users', auth.currentUser.uid, 'chats', 'rvd6hMbcO8hXJ1GidBImYNp2bSm1', 'messages');
    const otherUserChatsRef = collection(db, 'users', 'rvd6hMbcO8hXJ1GidBImYNp2bSm1', 'chats', auth.currentUser.uid, 'messages');
    addDoc(userChatsRef, { _id, createdAt, text, user });
    addDoc(otherUserChatsRef, { _id, createdAt, text, user });
  }, [])

  const renderBubble = (props) => (
    <Bubble
      {...props}
      wrapperStyle={{
        left: {
          backgroundColor: '#ECECEC', // left bubble background color
          borderRadius: 10, // left bubble border radius
        },
        right: {
          backgroundColor: '#0084FF', // right bubble background color
          borderRadius: 10, // right bubble border radius
        },
      }}
      textStyle={{
        left: {
          color: '#000', // left text color
          fontWeight: "500",
          fontSize: 18,
        },
        right: {
          color: '#fff', // right text color
          fontWeight: "500",
          fontSize: 18,
        },
      }}
    />
  );

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: auth?.currentUser?.uid,
          name: auth?.currentUser?.displayName,
          avatar: 'https://i.pravatar.cc/300'
        }}
        renderBubble={renderBubble}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // background color of the chat screen
  },
  logoutButton: {
    marginRight: 10,
  },
});
