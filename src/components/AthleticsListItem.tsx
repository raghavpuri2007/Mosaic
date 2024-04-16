import React, { useState } from 'react';
import { ScrollView, View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import Carousel from 'react-native-reanimated-carousel';
import { Video } from 'expo-av';
import { Athletic } from '@/types';
import { ResizeMode } from 'expo-av'; // Add this line


type AthleticsListItemProps = {
    athletics: Athletic;
    images: { [key: string]: any };
    videos: { [key: string]: any };
};

export default function AthleticsListItem({ athletics, images, videos }: AthleticsListItemProps) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.header} onPress={toggleOpen}>
                <Image source={images[athletics.logo]} style={styles.logo} />
                <Text style={styles.clubName}>{athletics.name}</Text>
                <FontAwesome name={isOpen ? 'angle-up' : 'angle-down'} size={24} color="black" style={styles.icon} />
            </TouchableOpacity>
            {isOpen && (
                <ScrollView style={styles.details}>
                    <Text style={styles.sectionTitle}>Description</Text>

                    <Text style={styles.athleticDescription}>{athletics.description}</Text>

                    <Text style={styles.sectionTitle}>Highlights</Text>

                    <Carousel
                        loop
                        autoPlay
                        data={athletics.highlights}
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
                        data={athletics.images}
                        autoPlayInterval={2500}
                        renderItem={({ item }) => (
                            <View style={styles.mediaContainer}>
                                <Image source={images[item.key]} style={styles.sportsImage} />
                                <Text style={styles.caption}>{item.caption}</Text>
                            </View>                        )}
                        width={0.87 * Dimensions.get('window').width}
                        height={0.6 * Dimensions.get('window').width}
                    />

                    {athletics.awards && athletics.awards.length > 0 && (
                        <View style={styles.awardsContainer}>
                            <Text style={styles.sectionTitle}>Awards</Text>
                            {athletics.awards.map((award, index) => (
                                <View key={index} style={styles.awardItem}>
                                    <Image source={images[award.image]} style={styles.awardImage} />
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


const styles = StyleSheet.create({
    // Similar styles to ClubListItem
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
    
    highlightVideo: {
        width: '100%',
        height: 200, 
        backgroundColor: 'black',
    },
    sportsImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
    caption: {
        marginTop: 5,
        fontSize: 12,
        color: 'gray',
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
    },
    awardDescription: {
        fontSize: 14,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "600",
        marginVertical: 5,
    },

    athleticDescription: {
        fontSize: 14,
        marginBottom: 10,
        fontStyle: 'italic',
    },
});
