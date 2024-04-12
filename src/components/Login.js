import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { auth } from '../../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CreateProfile from "./CreateProfile";

export default function Login({isCreatingAccount}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // State to manage loading indicator
  const [showCreateProfile, setShowCreateProfile] = useState(false);

  const onHandlePress = () => {
    setLoading(true); // Set loading to true while signing in

    signInWithEmailAndPassword(auth, email, password)
      .then((cred) => { // Set loading to false after successful sign-in
        setLoading(false);
        console.log('user logged in: ', cred.user);
      })
      .catch((err) => {
        setLoading(false); // Set loading to false after failed sign-in
        console.log(err.message); 
      });
  };

  const onCreateProfilePress = () => {
    // Toggle the state to show/hide the profile creation component
    isCreatingAccount(true);
  };

  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
      resetScrollToCoords={{ x: 0, y: 0 }}
    >
      <Text style={styles.title}>Welcome to Portfoli-U!</Text>
          <TextInput
            style={styles.input}
            placeholder="Email:"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            style={styles.input}
            placeholder="Password:"
            placeholderTextColor="#999"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity style={styles.loginButton} onPress={onHandlePress}>
            {loading ? (
              <ActivityIndicator size="small" color="#ffffff" /> // Show ActivityIndicator while loading
            ) : (
              <Text style={styles.buttonText}>Login</Text>
            )}
          </TouchableOpacity>

          {/* Button to create profile */}
          <TouchableOpacity style={styles.createProfileButton} onPress={onCreateProfilePress}>
            <Text style={styles.buttonText}>Create Profile</Text>
          </TouchableOpacity>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
  },
  loginButton: {
    backgroundColor: 'blue',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
    marginTop: 10,
  },
  createProfileButton: {
    backgroundColor: 'green',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
    marginTop: 10,
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 16,
  },
});
