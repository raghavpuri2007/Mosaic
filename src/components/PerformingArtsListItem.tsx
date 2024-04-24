import React, { useState } from 'react';
import { ScrollView, View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Carousel from 'react-native-reanimated-carousel';
import { Video } from 'expo-av';
import { PerformingArt } from '@/types';
import { ResizeMode } from 'expo-av';
import { themes } from '../constants/Themes';

type PerformingArtsListItemProps = {
    performingArt: PerformingArt;
    images: { [key: string]: any };
    videos: { [key: string]: any };
    themeKey: string;
};

export default function PerformingArtsListItem({ performingArt, images, videos, themeKey }: PerformingArtsListItemProps) {
    const [isOpen, setIsOpen] = useState(false);
    const theme = themes[themeKey] || themes.default;
    const styles = getStyles(theme);

    const toggleOpen = () => setIsOpen(!isOpen);

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.header} onPress={toggleOpen}>
                <Image source={images["piano"]} style={styles.logo} />
                <Text style={styles.clubName}>{performingArt.name}</Text>
                <FontAwesome name={isOpen ? 'angle-up' : 'angle-down'} size={24} color={theme.text} style={styles.icon} />
            </TouchableOpacity>
            {isOpen && (
                <ScrollView style={styles.details}>
                    <Text style={styles.sectionTitle}>Description</Text>
                    <Text style={styles.artDescription}>{performingArt.description}</Text>

                    <Text style={styles.sectionTitle}>Videos</Text>
                    <Carousel
                        loop
                        autoPlay
                        data={performingArt.videos}
                        autoPlayInterval={6000}
                        renderItem={({ item }) => (
                            <View style={styles.mediaContainer}>
                                <Video
                                    source={videos[item.key]}
                                    rate={1.0}
                                    volume={1.0}
                                    isMuted={false}
                                    resizeMode={ResizeMode.COVER}
                                    shouldPlay
                                    isLooping
                                    style={styles.highlightVideo}
                                />
                                <Text style={styles.caption}>{item.caption}</Text>
                            </View>
                        )}
                        width={0.87 * Dimensions.get('window').width}
                        height={0.6 * Dimensions.get('window').width}
                    />

                    <Text style={styles.sectionTitle}>Images</Text>
                    <Carousel
                        loop
                        autoPlay
                        data={performingArt.images}
                        autoPlayInterval={2500}
                        renderItem={({ item }) => (
                            <View style={styles.mediaContainer}>
                                <Image source={images[item.key]} style={styles.artsImage} />
                                <Text style={styles.caption}>{item.caption}</Text>
                            </View>
                        )}
                        width={0.87 * Dimensions.get('window').width}
                        height={0.6 * Dimensions.get('window').width}
                    />

                    {performingArt.awards && performingArt.awards.length > 0 && (
                        <View style={styles.awardsContainer}>
                            <Text style={styles.sectionTitle}>Awards</Text>
                            {performingArt.awards.map((award, index) => (
                                <View key={index} style={styles.awardItem}>
                                    <Image source={images["badge4"]} style={styles.awardImage} />
                                    <View style={styles.awardTextContainer}>
                                        <Text style={styles.awardTitle}>{award.title}:</Text>
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
    highlightVideo: {
        width: '100%',
        height: 200,
        backgroundColor: theme.background,
    },
    artsImage: {
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
    awardsContainer: {
        marginTop: 10,
    },
    awardItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 5,
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
    sectionTitle: {
        fontSize: 18,
        fontWeight: "600",
        marginVertical: 5,
        color: theme.text,
    },
    artDescription: {
        fontSize: 14,
        marginBottom: 10,
        fontStyle: 'italic',
        color: theme.text,
    },
});
