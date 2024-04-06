import { Pressable, StyleSheet, TextInput } from 'react-native';
import { Text, View } from '../../components/Themed';
import { useNavigation, useRouter } from 'expo-router';
import { useLayoutEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons'

export default function NewPostScreen() {
  const[content, setContent] = useState('');
  const [image, setImage] = useState<string | null>(null);


  const navigation = useNavigation();
  const router = useRouter();


  const onPost = () => {
    console.warn(`Posting: ${content}`);

    router.push('/(tabs)/')
    setContent('');
  }
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'New Post',
      headerRight: () => (
      <Pressable onPress = {onPost} style={styles.postButton}>
        <Text style={styles.postButtonText}>Submit</Text>
      </Pressable>
      ),
    });
  }, [onPost]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      // aspect: [4, 3],
      quality: 0.5,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput 
      value={content}
      onChangeText={setContent}
      placeholder='What do you want to talk about?'
      style={styles.input}
      multiline
      />

      <View style={styles.footer}>
        <FontAwesome name='image' size={24} color='gray' style={styles.iconButton} onPress={pickImage}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,

  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  input: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  postButton: {
    backgroundColor: 'royalblue',
    padding: 5,
    paddingHorizontal: 15,
    borderRadius: 50,
    marginRight: 10,
  },

  postButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },

  footer: {
    marginTop: 'auto',
  },

  iconButton: {
    backgroundColor: 'gainsboro'
  }
});
