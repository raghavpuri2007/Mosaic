
import { useLocalSearchParams } from "expo-router"
import { Text, View, Image, StyleSheet } from 'react-native';
import userJson from '../../../assets/data/user.json';
import { useState } from "react";
import { User } from "../../types";

export default function UserProfile() {
    const [user, setUser] = useState<User>(userJson);

    const { id } = useLocalSearchParams();

    return (
        <View style={styles.container}>
            {/*Header*/}
            <View style={styles.header}>
                    

                {/* BG Image */}
                <Image source={{ uri: user.backImage}} style={styles.bgImage} />
                {/* Profile image */}
                <Image source={{ uri: user.image}} style={styles.image} />

                {/* Name and Position */}
                <Text style={styles.name}>{user.name}</Text>
                <Text>{user.position}</Text>

                {/*Connect button*/}

            </View>


        </View>
    )
}

const styles = StyleSheet.create({
    container: {},
    header: {},
    bgImage: {
        width: '100%',
        aspectRatio: 5 / 2,
        marginBottom: -60,
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
    }

});