import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';

export default function SignUpScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleSignUp = () => {
        // Handle sign up logic (e.g., API call)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>CH Fitness Signup</Text>

            <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor="#ddd"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#ddd"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#ddd"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            {/* Navigation to other screens can be added here */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333'
    },
    input: {
        width: '100%',
        padding: 15,
        marginBottom: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderRadius: 25,
        fontSize: 16,
        color: '#333'
    },
    button: {
        width: '100%',
        padding: 15,
        backgroundColor: '#4CAF50',
        borderRadius: 25,
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff'
    }
});
