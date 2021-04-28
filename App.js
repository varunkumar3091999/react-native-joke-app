/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  useColorScheme,
  Button,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';




const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const [joke, setJoke] = useState({})

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const fetchJoke = () => {
    console.log('here')
    fetch(
      "https://us-central1-dadsofunny.cloudfunctions.net/DadJokes/random/jokes",
      {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).then(res => res.json())
      .then((data) => {
        setJoke(data)
        console.log(data)
      })
      .catch(err => console.log("error =>", err))
  }

  return (
    // <SafeAreaView style={ backgroundStyle }>
    <View style={ styles.mainView }>

      <View style={ styles.textView }>
        <Text style={ styles.setupText }>{ joke?.setup }</Text>
        <Text style={ styles.punchlineText }>{ joke?.punchline }</Text>
      </View>
      {/* <Button
        title="Tell me a joke!"
        onPress={ fetchJoke }
        style={ styles.mainButton }
        color="#8fbc8f"
      /> */}
      <TouchableOpacity
        style={ styles.mainButton }
        onPress={ fetchJoke }
      >
        <Text style={ styles.buttonText }>Tell me a Joke...</Text>
      </TouchableOpacity>
    </View>
    // </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainView: {
    height: 750,
    width: 400,
  },
  mainButton: {
    width: 370,
    height: 40,
    fontWeight: '600',
    marginHorizontal: 10,
    backgroundColor: '#7fffd4',
  },
  buttonText: {
    fontSize: 25,
    marginHorizontal: 90
  },
  textView: {
    marginTop: 8,
    fontSize: 30,
    fontWeight: '400',
    height: 600,
  },
  setupText: {
    fontWeight: '700',
    marginTop: 50,
    fontSize: 40,
    marginLeft: 20,
    height: 300
  },
  punchlineText: {
    fontWeight: '700',
    fontSize: 30,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    marginTop: 75,
    // backgroundColor: '#7fffd4',
    width: 300,
    borderRadius: 10,
    // height: 100
  },
});

export default App;
