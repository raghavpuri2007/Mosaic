import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { themes } from '../constants/Themes';

const CollapsibleSection = ({ title, children, themeKey }) => {
    const [isOpen, setIsOpen] = useState(false);
    const theme = themes[themeKey] || themes.default;

    const toggleOpen = () => setIsOpen(!isOpen);

    const styles = getStyles(theme);

    return (
        <View style={styles.section}>
            <TouchableOpacity style={styles.header} onPress={toggleOpen}>
                <Text style={styles.sectionTitle}>{title}</Text>
                <FontAwesome name={isOpen ? 'angle-up' : 'angle-down'} size={24} color={theme.text} />
            </TouchableOpacity>
            {isOpen && (
                <View style={styles.content}>
                    {children}
                </View>
            )}
        </View>
    );
};

const getStyles = (theme) => StyleSheet.create({
    section: {
        backgroundColor: theme.sectionBackground,
        padding: 10,
        marginBottom: 5,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: theme.text,
    },
    content: {
        marginTop: 10,
    }
});

export default CollapsibleSection;