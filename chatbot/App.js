import React, { useState } from 'react';
import { View, TextInput, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [mode, setMode] = useState('gpt');  // Default mode is 'gpt'

  const handleFetch = async () => {
    try {
      if (inputText.trim() === '') return;

      // Store user inputs and display it
      setMessages(prevMessages => [...prevMessages, { text: inputText, sender: 'user' }]);

      // Select the endpoint based on the current mode
      const endpoint = mode === 'gpt' ? 'URL/g' : 'URL/i';

      // Fetch the response from the selected API
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputText }),
      }).then(res => res.json()).then(data => data.response || data.content);

      // Store and display bot response
      setMessages(prevMessages => [...prevMessages, { text: response, sender: 'bot', mode }]);

      setInputText('');
    } catch {
      console.log('There is an error');
    }
  };

  const toggleMode = () => {
    setMode(prevMode => (prevMode === 'gpt' ? 'rag' : 'gpt'));
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.messagesContainer}>
        {messages.map((message, index) => (
          <View key={index} style={styles.message}>
            <Text
              style={[
                message.sender === 'bot' ? styles.botMessage : styles.userMessage,
                message.sender === 'bot' && { backgroundColor: message.mode === 'gpt' ? 'green' : 'blue' },
              ]}
            >
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
        <TouchableOpacity
          style={[styles.sendButton, { backgroundColor: mode === 'gpt' ? 'green' : 'blue' }]}
          onPress={handleFetch}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.toggleButton} onPress={toggleMode}>
          <Text style={styles.toggleButtonText}>{mode === 'gpt' ? 'Switch to RAG' : 'Switch to GPT'}</Text>
        </TouchableOpacity>
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
  sendButton: {
    padding: 10,
    borderRadius: 8,
  },
  sendButtonText: {
    color: '#ffffff',
  },
  toggleButton: {
    marginLeft: 8,
    padding: 10,
    backgroundColor: '#cccccc',
    borderRadius: 8,
  },
  toggleButtonText: {
    color: '#000000',
  },
});

export default App;
