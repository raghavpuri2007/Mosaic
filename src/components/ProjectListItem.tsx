import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Project } from '../types';

type ProjectListItemProps = {
    project: Project;
}

export default function ProjectListItem({ project }: ProjectListItemProps) {
    const [expanded, setExpanded] = useState(false);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => setExpanded(!expanded)} style={styles.header}>
                <Text style={styles.title}>{project.title}</Text>
                {/* Icon placeholder, replace with actual icon */}
                <Text>{expanded ? '↑' : '↓'}</Text>
            </TouchableOpacity>
            {expanded && (
                <View style={styles.expandedSection}>
                    <Text style={styles.description}>{project.description}</Text>
                    <Text style={styles.skills}>Skills: {project.skills.join(', ')}</Text>
                    <Image source={{ uri: project.projectImage }} style={styles.projectImage} />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
        borderBottomWidth: 0.5,
        borderColor: 'lightgrey',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: '500'
    },
    expandedSection: {
        padding: 10,
    },
    description: {
        fontSize: 14,
        marginBottom: 5,
    },
    skills: {
        fontSize: 14,
        marginBottom: 5,
    },
    projectImage: {
        width: '100%',
        height: 200,
        borderRadius: 5,
        marginBottom: 10,
    },
});