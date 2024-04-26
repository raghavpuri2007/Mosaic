import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const SuggestedConnection = () => {
  // Static data for John Doe as there's no import data yet
  const user = {
    name: 'John Doe',
    image: 'https://via.placeholder.com/80', // Placeholder image URL
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: user.image }} style={styles.image} />
      <Text style={styles.name}>{user.name}</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Follow</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 5,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 5,
  },
  button: {
    backgroundColor: 'lightblue',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default SuggestedConnection;
