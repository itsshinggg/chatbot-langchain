import React, { useState } from 'react';
import { View, TextInput, Button, ScrollView, Text, StyleSheet } from 'react-native';

import OpenAI from "openai";

// const openai = new OpenAI({ apiKey: process.env.EXPO_PUBLIC_OPENAI_API, dangerouslyAllowBrowser: true });

const App = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const handleGPTFetch = async () => {
    try{
      if (inputText.trim() === '') return;

      // store user inputs and display it
      setMessages(prevMessages => [...prevMessages, { text: inputText, sender: 'user' }]);

      // chatgpt response function
      // const completion = await openai.chat.completions.create({
      //   messages: [{ role: "system", content: inputText}],
      //   model: "gpt-3.5-turbo",
      // });
      // const gptResponse = completion.choices[0].message.content

      // const response = await fetch("langchain api ").then(res => res.json()).then(data => data.message)
      // console.log(response)

      // store gpt respnse and display it
      setMessages(prevMessages => [...prevMessages, { text: gptResponse, sender: 'bot' }]);

      // clear the user input box
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