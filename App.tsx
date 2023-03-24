import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Provider as PaperProvider, TextInput } from 'react-native-paper';
import axios from 'axios';
import Fluro from 'fluro';

export default function App() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [events, setEvents] = useState<{ _id: string; title: string }[]>([]);

  const tryLogginIn = async () => {
    try {
      console.log(email, password);
      const user = await axios.post('https://api.fluro.io/token/login', {
        username: email,
        password: password,
      });
      const API_URL = 'https://api.fluro.io';
      const APPLICATION_TOKEN = user.data.token;
      const fluro = new Fluro({
        apiURL: API_URL,
        applicationToken: APPLICATION_TOKEN,
      });
      const notifications = await fluro.api.get('my/assignments');
      // console.log('NOTE.....');
      // console.log(notifications.data);
      // console.log('NOTE END....');
      // console.log('');
      // console.log('');
      // console.log('');
      // console.log('');
      notifications.data.forEach((note) => {
        console.log('NOTE.....');
        console.log({ _id: note._id, title: note.title });
        console.log('NOTE END....');
        console.log('');
        console.log('');
        console.log('');
        console.log('');
        setEvents([...events, { _id: note._id, title: note.title }]);
      });
    } catch (err) {
      console.log('Login Error', err);
    }
  };

  const showevents = () => {
    return events.map((assingedEvent) => {
      return (
        <Text key={assingedEvent._id}>
          {assingedEvent._id} - {assingedEvent.title}
        </Text>
      );
    });
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text>Why Hello There!</Text>
        <TextInput label="Email" value={email} onChangeText={(text) => setEmail(text)} />
        <TextInput label="password" value={password} onChangeText={(text) => setPassword(text)} secureTextEntry={true} />
        <Button icon="camera" mode="contained" onPress={() => tryLogginIn()}>
          Press me
        </Button>
        {showevents()}
        <StatusBar style="auto" />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
