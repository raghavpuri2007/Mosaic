import { Text, View, StyleSheet, FlatList, TextInput } from 'react-native';
import users from  '../../assets/data/users.json';
import UserListItem from '../components/UserListItem';
import { useLayoutEffect, useState } from 'react';
import { useNavigation } from 'expo-router';

export default function SearchScreen() {
    const[search, setSearch] = useState('');
    const navigation = useNavigation();
    
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={text => setSearch(text)}
                    value={search}
                    placeholder="Search users..."
                />
            ),
        });
    }, [navigation, search])

    return <FlatList
        data={users.filter(user => user.name.includes(search))}
        renderItem={({item}) => <UserListItem user={item}/>}
        keyExtractor={(item) => item.id.toString()}

    />;
}