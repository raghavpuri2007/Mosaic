import { Text, View, StyleSheet, Image, Pressable } from 'react-native';
import { Post } from '@/types';
import { FontAwesome } from '@expo/vector-icons'
import { Link } from 'expo-router';

type PostListItemProps = {
    post: Post;
}

export default function PostListItem({ post }: PostListItemProps) {
    return (
        <Pressable style={styles.container}>
            <View style={styles.header}>
                <Image source={{uri: post.user.image}} style={styles.userImage}/>
                <Text style={styles.userName}>{post.user.name}</Text>
            </View>
            <Text style={styles.content}>{post.content}</Text>
            <View style={styles.footer}>
                <Text style={styles.button}>Reply</Text>
                <Text style={styles.button}>Share</Text>
                <Text style={styles.button}>Add to Story</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '100%',
        maxWidth: 500,
        alignSelf: 'center',
        marginBottom: 10,
        borderRadius: 10,
        overflow: 'hidden',
    },
    header: { 
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    userName: {
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft: 10,
    },
    userImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    content: {
        margin: 10,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderTopWidth: 0.5,
        borderColor: 'lightgray',
        paddingVertical: 10,
    },
    button: {
        color: 'blue',
    }
});
