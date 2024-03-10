import { StyleSheet, FlatList } from 'react-native';
import { Text, View } from '../../components/Themed';
import PostListItem from '../../components/PostListItem';
import posts from '../../../assets/data/posts.json'

const firstPost = posts[0]

export default function HomeFeedScreen() {
  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => <PostListItem post={item} />}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ gap: 10 }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },

});
