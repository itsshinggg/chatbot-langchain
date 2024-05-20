import React, { useState } from 'react';
import { View, TextInput, Button, ScrollView, Text, StyleSheet } from 'react-native';
import axios from 'axios';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const handleGPTFetch = async () => {
    try{
      if (inputText.trim() === '') return;

      setMessages(prevMessages => [...prevMessages, { text: inputText, sender: 'user' }]);

      const output = await fetch("https://httpbin.org/anything").then(response => response.json()).then(data => data.headers.Origin)
      setMessages(prevMessages => [...prevMessages, { text: output, sender: 'bot' }])
      
      // const response = await axios.post("https://api.openai.com/v1/chat/completions",{
      //   prompt:  inputText,
      // },{
      //   headers:{
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer sk-proj-7wwbkKM2g5Mf68IoqMqRT3BlbkFJl6F2RdbVCuRyUx774Kny`,
      //   }
      // }
      // )
      // console.log(response.data.choices[0].text.trim())

      setInputText('');
    }
    catch{
      console.log('there is an error')
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.messagesContainer}>
        {messages.map((message, index) => (
          <View key={index} style={styles.message}>
            <Text style={message.sender === 'bot' ? styles.botMessage : styles.userMessage}>
              {message.text}
            </Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={inputText}
          onChangeText={setInputText}
        />
        <Button title="Send" onPress={handleGPTFetch} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'flex-end',
  },
  messagesContainer: {
    flexGrow: 1,
  },
  message: {
    marginBottom: 8,
  },
  userMessage: {
    padding: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
  },
  botMessage: {
    padding: 8,
    backgroundColor: '#007bff',
    color: '#ffffff',
    borderRadius: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    marginRight: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
  },
});

export default App;