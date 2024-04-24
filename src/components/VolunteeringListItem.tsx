import React, { useState } from 'react';
import { ScrollView, View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Carousel from 'react-native-reanimated-carousel';
import { themes } from '../constants/Themes';

type VolunteeringListItemProps = {
    volunteering: {
        id: string;
        name: string;
        logo: string;
        impact?: string;
        images: Array<{ key: string; caption: string }>;
        events: Array<{ title: string; startYear: number; endYear: number; description: string }>;
        themeKey: string;
    };
    images: { [key: string]: any };
};

export default function VolunteeringListItem({ volunteering, images, themeKey }: VolunteeringListItemProps) {
    const [isOpen, setIsOpen] = useState(false);
    const theme = themes[themeKey] || themes.default;
    const styles = getStyles(theme);
    
    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.header} onPress={toggleOpen}>
                <Image source={images["piano"]} style={styles.logo} />
                <Text style={styles.clubName}>{volunteering.name}</Text>
                <FontAwesome name={isOpen ? 'angle-up' : 'angle-down'} size={24} color={theme.text} style={styles.icon} />
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

const getStyles = (theme) => StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: theme.sectionBackground,
        borderBottomWidth: 1,
        borderColor: theme.inactiveStrokeColor,
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
        color: theme.text,
    },
    logo: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    icon: {
        marginRight: 10,
        color: theme.text, // Ensure icon color also uses the theme
    },
    details: {
        marginTop: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 5,
        marginTop: 10,
        color: theme.text,
    },
    description: {
        fontSize: 14,
        marginBottom: 10,
        fontStyle: 'italic',
        color: theme.text,
    },
    mediaContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        borderRadius: 10,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: theme.inactiveStrokeColor,
        backgroundColor: theme.disabledButtonBackground,
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
    caption: {
        marginTop: 5,
        fontSize: 12,
        color: theme.text,
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
        backgroundColor: theme.primary, // Make sure the timeline dot uses the primary theme color
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
        color: theme.text,
    },
    roleYears: {
        fontSize: 14,
        opacity: 0.6,
        marginBottom: 5,
        color: theme.text,
    },
    roleDescription: {
        fontSize: 14,
        color: theme.text,
    },
    timelineLine: {
        position: 'absolute',
        left: 6, // Adjusted for dot position
        top: 0,
        bottom: 0,
        width: 2,
        backgroundColor: theme.inactiveStrokeColor,
        zIndex: 0,
    },
});
