import React, { useState } from 'react';
import { ScrollView, View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Club } from '@/types';
import { FontAwesome } from '@expo/vector-icons'; 
import Carousel from 'react-native-reanimated-carousel';
import { Animated, Easing } from 'react-native';
import { themes } from '../constants/Themes';


type ClubListItemProps = {
    club: Club;
    images: { [key: string]: any };
    themeKey: string;
};

export default function ClubListItem({ club, images, themeKey }: ClubListItemProps) {
    const [isOpen, setIsOpen] = useState(false);
    const theme = themes[themeKey] || themes.default;
    const styles = getStyles(theme);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };
    
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.header} onPress={toggleOpen}>
                <Image source={images["fbla_logo"]} style={styles.logo} />
                <Text style={styles.clubName}>{club.name}</Text>
                <FontAwesome name={isOpen ? 'angle-up' : 'angle-down'} size={24} color={theme.text} style={styles.icon} />
            </TouchableOpacity>
            {isOpen && (
                <ScrollView style={styles.details}>
                    {club.description && (
                        <>
                            <Text style={styles.sectionTitle}>Description</Text>
                            <Text style={styles.clubDescription}>{club.description}</Text>
                        </>
                    )}

                    <Text style={[styles.sectionTitle]}>Images</Text>

                    <Carousel
                        loop
                        autoPlay
                        data={club.images}
                        autoPlayInterval={2500}
                        renderItem={({ item }) => (
                            <View style={styles.mediaContainer}>
                                <Image source={images[item.key]} style={styles.clubImage} />
                                <Text style={styles.caption}>{item.caption}</Text>

                            </View> 
                        )}
                        width={0.87 * Dimensions.get('window').width}
                        height={0.6 * Dimensions.get('window').width}
                    />

                    <Text style={styles.sectionTitle}>Roles</Text>
                    <View style={styles.timeline}>
                        <View style={styles.timelineLine}></View>
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

                    {club.awards && club.awards?.length > 0 && (
                        <View style={styles.awardsContainer}>
                            <Text style={styles.sectionTitle}>Awards</Text>
                            {club.awards.map((award, index) => (
                                <View key={index} style={styles.awardItem}>
                                    <Image source={images["badge4"]} style={styles.awardImage} />
                                    <View style={styles.awardTextContainer}>
                                        <Text style={styles.awardTitle}>{award.title}</Text>
                                        <Text style={styles.awardDescription}>{award.description}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    )}
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
    },
    details: {
        marginTop: 10,
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
    clubImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        marginVertical: 5,
    },
    caption: {
        marginTop: 5,
        fontSize: 12,
        color: theme.text,
        textAlign: 'center',
    },
    timeline: {
        position: 'relative',
        paddingLeft: 30, // Enough space for the line and dot
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
        backgroundColor: theme.primary,
        position: 'absolute',
        left: 0,
        top: 4,
        zIndex: 1,
    },
    timelineContent: {
        flex: 1,
        paddingLeft: 20, // Space from dot to the content
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
        left: 6, 
        top: 0,
        bottom: 0,
        width: 2,
        backgroundColor: theme.inactiveStrokeColor,
        zIndex: 0,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "600",
        marginVertical: 5,
        color: theme.text,
    },
    clubDescription: {
        fontSize: 14,
        marginBottom: 10,
        fontStyle: 'italic',
        color: theme.text,
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
        color: theme.text,
    },
    awardDescription: {
        fontSize: 14, 
        color: theme.text,
    },
});