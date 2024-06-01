import React, { useState } from 'react';
import { View, TextInput, ScrollView, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [mode, setMode] = useState('gpt');  // Default mode is 'gpt'
  const [loading, setLoading] = useState(false); // State for loading indicator

  const handleFetch = async () => {
    try {
      if (inputText.trim() === '') return;

      // Store user inputs and display it
      setMessages(prevMessages => [...prevMessages, { text: inputText, sender: 'user' }]);
      setInputText('');
      setLoading(true); // Show loading indicator

      // Select the endpoint based on the current mode
      const endpoint = mode === 'gpt' ? 'https://shingokise.com/gpt' : 'https://shingokise.com/intern';

      // Fetch the response from the selected API
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputText }),
      }).then(res => res.json()).then(data => {
        return data.response
      });

      setInputText('');
      
      // Store and display bot response
      setMessages(prevMessages => [...prevMessages, { text: res, sender: 'bot', mode }]);
      setLoading(false); // Hide loading indicator
      
    } catch {
      console.log('There is an error');
    }
  };

  const toggleMode = () => {
    setMode(prevMode => (prevMode === 'gpt' ? 'rag' : 'gpt'));
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
    >
      <View style={styles.innerContainer}>
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
          {loading && ( // Conditionally render loading indicator
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          )}
        </ScrollView>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, { height: 'auto' }]}
            multiline={true}
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
            <Text style={styles.toggleButtonText}>{mode === 'gpt' ? 'to RAG' : 'to LLM'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60, 
    paddingBottom: 40,
    paddingLeft: 20,
    paddingRight: 20,
  },
  innerContainer: {
    flex: 1,
  },
  messagesContainer: {
    flexGrow: 1,
    marginBottom: 30,
  },
  message: {
    marginBottom: 10,
  },
  userMessage: {
    padding: 12,
    backgroundColor: '#e0e0e0',
    borderRadius: 25,
    fontSize: 16,
  },
  botMessage: {
    padding: 12,
    color: '#ffffff',
    borderRadius: 25,
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    marginRight: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 12,
  },  
  sendButton: {
    padding: 12,
    borderRadius: 12,
  },
  sendButtonText: {
    color: '#ffffff',
  },
  toggleButton: {
    marginLeft: 10,
    padding: 12,
    backgroundColor: '#cccccc',
    borderRadius: 12,
  },
  toggleButtonText: {
    color: '#000000',
  },
});

export default App;
