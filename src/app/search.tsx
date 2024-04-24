import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import UserListItem from "../components/UserListItem";
import { auth } from "../../firebaseConfig";
import { Ionicons } from "@expo/vector-icons";

export default function SearchScreen() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      setUsers([]); // Clear existing users

      const usersRef = collection(db, "users");
      const usersSnapshot = await getDocs(usersRef);
      const usersData = usersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setUsers(usersData);
      setIsLoading(false);
    };

    fetchUsers();
  }, []);

  const currentUserId = auth.currentUser.uid; // Get the current user's ID

  const filteredUsers = users.filter(
    (user) =>
      user.id !== currentUserId && // Exclude the current user
      user.name.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#38a093" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#38a093" />
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            onChangeText={(text) => setSearch(text)}
            value={search}
            placeholder="Search users..."
            placeholderTextColor="#888"
          />
        </View>
      </View>
      <FlatList
        data={filteredUsers}
        renderItem={({ item }) => <UserListItem user={item} />}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#000",
  },
  searchContainer: {
    flex: 1,
    marginLeft: 10,
  },
  searchInput: {
    height: 40,
    borderColor: "#38a093",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    color: "#fff",
    fontSize: 16,
    backgroundColor: "#222",
  },
});
