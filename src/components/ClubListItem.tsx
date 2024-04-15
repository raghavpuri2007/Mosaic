import React, { useState } from 'react';
import { ScrollView, View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Club } from '@/types';
import { FontAwesome } from '@expo/vector-icons'; 
import Carousel from 'react-native-reanimated-carousel';

type ClubListItemProps = {
    club: Club;
    images: { [key: string]: any };
};

export default function ClubListItem({ club, images }: ClubListItemProps) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };
    


    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.header} onPress={toggleOpen}>
                <Image source={images[club.logo]} style={styles.logo} />
                <Text style={styles.clubName}>{club.name}</Text>
                <FontAwesome name={isOpen ? 'angle-up' : 'angle-down'} size={24} color="black" style={styles.icon} />
            </TouchableOpacity>
            {isOpen && (
                <ScrollView style={styles.details}>
                <Carousel
                    loop
                    autoPlay
                    data={club.images}
                    autoPlayInterval={2500}
                    renderItem={({ item }) => (
                        <Image source={ images[item] } style={styles.clubImage} />
                    )}
                    width={0.87 * Dimensions.get('window').width}
                    height={0.6 * Dimensions.get('window').width}
                />
                <View style={styles.timeline}>
                    {club.roles.map((role, index) => (
                        <View key={index} style={styles.timelineItem}>
                            <View style={styles.timelineDot}></View>
                            <View style={styles.timelineContent}>
                                <Text style={styles.roleTitle}>{role.title}</Text>
                                <Text style={styles.roleYears}>{role.startYear} - {role.endYear}</Text>
                                <Text style={styles.roleDescription}>{role.description}</Text>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    clubName: {
        fontWeight: 'bold',
        fontSize: 16,
        flex: 1,
        marginLeft: 10,
    },
    logo: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    icon: {
        marginRight: 10,
    },
    details: {
        marginTop: 10,
    },
    clubImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        marginVertical: 5,
    },
    timeline: {
        position: 'relative',
        paddingLeft: 30, // Increase padding to ensure space for line and dot
        paddingTop: 10, // Space at the top for the line to start correctly
        paddingBottom: 10, // Space at the bottom for the line to end correctly
    },
    timelineItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    timelineDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: 'lightgrey',
        position: 'absolute',
        left: 0,
        top: '50%',
        marginTop: -6,
        zIndex: 1,
    },
    timelineContent: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
        marginLeft: 20, // Space from dot to the content
    },
    roleTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    roleYears: {
        fontSize: 14,
        opacity: 0.6,
        marginBottom: 5,
    },
    roleDescription: {
        fontSize: 14,
    },
    timelineLine: {
        position: 'absolute',
        width: 2,
        backgroundColor: 'lightgrey',
        left: 6, // Center of the dot
        top: 0,
        bottom: 0,
    },
});
