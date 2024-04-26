import { Text, StyleSheet, FlatList, View, ScrollView, TouchableOpacity} from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import PostListItem from '../../components/PostListItem';
import SuggestedConnection from '../../components/SuggestedConnection'; // New component for connections
import posts from '../../../assets/data/posts.json';
import React from 'react';

export default function HomeFeedScreen() {
  const router = useRouter();

  const handleSearchPress = () => {
    router.push("/search");
  };

  const suggestedConnections = Array.from({ length: 6 }, (_, index) => (
    <SuggestedConnection key={`suggested-connection-${index}`} />
  ));

  return (
     <View style={styles.container}>
       
      <View style={styles.feed}>
        <View style={styles.searchContainer}>
          <Text style={styles.updatesTitle}>Updates</Text>
          <TouchableOpacity onPress={handleSearchPress}>
            <Ionicons name="search-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        <FlatList
          data={posts}
          renderItem={({ item }) => <PostListItem post={item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10 }}
        />
      </View>
      <View style={styles.connectionsContainer}>
        <Text style={styles.connectionsTitle}>Suggested Connections</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.connections}
        >
          {suggestedConnections}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: 30,
    flex: 1,
  },
  feed: {
    flex: 7.2, // 70% of the screen for updates
  },
  connectionsContainer: {
    flex: 2.8, // 30% of the screen for connections
    paddingHorizontal: 10,
  },

  updatesTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 15,
    color: 'white'
  },

  connectionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 15,
    color: 'white'
  },
  connections: {
    paddingHorizontal: 5,
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "space\-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 2,
  },
});
