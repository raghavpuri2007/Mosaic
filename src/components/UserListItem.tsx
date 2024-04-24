import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

type UserListItemProps = {
  user: {
    id: string;
    name: string;
    profilePicture: string | null;
    position: string;
  };
};

export default function UserListItem({ user }: UserListItemProps) {
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: `../users/${user.id}`,
      params: {
        id: user.id,
      },
    });
  };

  const defaultAvatarUrl =
    "https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg";

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Image
        source={{ uri: user.profilePicture || defaultAvatarUrl }}
        style={styles.userImage}
      />
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.highSchool}>{user.position}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#222",
  },
  userImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#fff",
    marginBottom: 5,
  },
  highSchool: {
    fontSize: 16,
    color: "#888",
  },
});
