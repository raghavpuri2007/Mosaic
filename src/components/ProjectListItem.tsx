import React, { useState } from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Project } from "../types";
import { FontAwesome } from '@expo/vector-icons'; 
import { themes } from '../constants/Themes';

type ProjectListItemProps = {
  project: Project;
  image: any;
  themeKey: string;
};

export default function ProjectListItem({ project, image, themeKey }: ProjectListItemProps) {
  const [expanded, setExpanded] = useState(false);
  const theme = themes[themeKey] || themes.default;
  const styles = getStyles(theme);
  
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setExpanded(!expanded)}
        style={styles.header}
      >
        <Text style={styles.title}>{project.title}</Text>
        <FontAwesome name={expanded ? 'angle-up' : 'angle-down'} size={24} color={theme.text} style={styles.icon} />
      </TouchableOpacity>
      {expanded && (
        <View style={styles.expandedSection}>
          {project.description && (
              <>
                  <Text style={styles.sectionTitle}>Description</Text>
                  <Text style={styles.description}>{project.description}</Text>
              </>
          )}
          <Image 
            source={image} 
            style={styles.projectImage} 
          />
        </View>
      )}
    </View>
  );
}

// Dynamic styles
const getStyles = (theme) => StyleSheet.create({
  container: {
    marginBottom: 10,
    borderBottomWidth: 0.5,
    borderColor: theme.inactiveStrokeColor, // Use theme for borders
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    color: theme.text, // Text color from theme
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 5,
    color: theme.text,
  },

  description: {
    fontSize: 14,
    marginBottom: 10,
    fontStyle: 'italic',
    color: theme.text,
  },

  icon: {
    color: theme.text, // Icon color from theme
  },
  expandedSection: {
    padding: 10,
  },
  description: {
    fontSize: 14,
    marginBottom: 5,
    color: theme.text, // Text color from theme
  },
  projectImage: {
    width: "100%",
    height: 200,
    borderRadius: 5,
    marginBottom: 10,
  },
});

