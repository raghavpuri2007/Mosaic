import React, { useState } from 'react';
import { ScrollView, View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import Carousel from 'react-native-reanimated-carousel';

type VolunteeringListItemProps = {
    volunteering: {
        id: string;
        name: string;
        logo: string;
        impact?: string;
        images: Array<{ key: string; caption: string }>;
        events: Array<{ title: string; startYear: number; endYear: number; description: string }>;
    };
    images: { [key: string]: any };
};

export default function VolunteeringListItem({ volunteering, images }: VolunteeringListItemProps) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.header} onPress={toggleOpen}>
                <Image source={images[volunteering.logo]} style={styles.logo} />
                <Text style={styles.clubName}>{volunteering.name}</Text>
                <FontAwesome name={isOpen ? 'angle-up' : 'angle-down'} size={24} color="black" style={styles.icon} />
            </TouchableOpacity>
            {isOpen && (
                <ScrollView style={styles.details}>
                    {volunteering.impact && (
                        <>
                            <Text style={styles.sectionTitle}>Impact</Text>
                            <Text style={styles.description}>{volunteering.impact}</Text>
                        </>
                    )}

                    <Text style={styles.sectionTitle}>Images</Text>
                    <Carousel
                        loop
                        autoPlay
                        data={volunteering.images}
                        autoPlayInterval={2500}
                        renderItem={({ item }) => (
                            <View style={styles.mediaContainer}>
                                <Image source={images[item.key]} style={styles.image} />
                                <Text style={styles.caption}>{item.caption}</Text>
                            </View>
                        )}
                        width={0.87 * Dimensions.get('window').width}
                        height={0.6 * Dimensions.get('window').width}
                    />

                    <Text style={styles.sectionTitle}>Notable Events</Text>
                    <View style={styles.timeline}>
                        <View style={styles.timelineLine}></View>
                        {volunteering.events.map((event, index) => (
                            <View key={index} style={styles.timelineItem}>
                                <View style={styles.timelineDot}></View>
                                <View style={styles.timelineContent}>
                                    <Text style={styles.roleTitle}>{event.title}</Text>
                                    <Text style={styles.roleYears}>{event.startYear} - {event.endYear}</Text>
                                    <Text style={styles.roleDescription}>{event.description}</Text>
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
    // Ensure styles are defined here
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
    sectionTitle: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 5,
        marginTop: 10,
    },
    description: {
        fontSize: 14,
        marginBottom: 10,
        fontStyle: 'italic',
    },
    mediaContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        borderRadius: 10, 
        overflow: 'hidden', 
        borderWidth: 1,
        borderColor: '#ddd', 
        backgroundColor: 'rgba(135, 206, 235, 0.3)',
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        marginVertical: 5,
    },
    caption: {
        marginTop: 5,
        fontSize: 12,
        color: 'gray',
        textAlign: 'center'
    },
    timeline: {
        position: 'relative',
        paddingLeft: 30,
        paddingTop: 10,
        paddingBottom: 10,
    },
    timelineItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    timelineDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: 'black',
        position: 'absolute',
        left: 0,
        top: 4,
        zIndex: 1,
    },
    timelineContent: {
        flex: 1,
        paddingLeft: 20,
    },
    roleTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
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
        left: 35, 
        top: 15,
        bottom: 20, 
        width: 2,
        backgroundColor: 'lightgrey',
        zIndex: 0,
    },
    awardsContainer: {
        marginTop: 10,
    },
    awardItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 10,
    },
    awardImage: {
        width: 30,
        height: 30,
        marginRight: 10,
    },
    awardTextContainer: {
        flex: 1,
        flexDirection: 'column',
    },
    awardTitle: {
        fontWeight: 'bold',
    },
    awardDescription: {
        fontSize: 14, // Make sure the description is clearly readable
    },
});
