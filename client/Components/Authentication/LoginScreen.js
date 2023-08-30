import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/auth/token/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            });
    
            const data = await response.json();
    
            if (response.status === 200) {
                // Successfully logged in
                await AsyncStorage.setItem('token', data.auth_token);
                navigation.navigate('MainApp');
            } else {
                alert('Invalid username or password');
            }
        } catch (error) {
            console.error("There was an error logging in", error);
            alert('Error logging in. Please try again.');
        }
    };

    return (
        <ImageBackground style={styles.background} source={""}>
            <View style={styles.container}>
                <Text style={styles.title}>CarbonHero Fitness</Text>
                
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                    placeholderTextColor="#ddd"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    placeholderTextColor="#ddd"
                />
                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                    <Text style={styles.navigationText}>Don't have an account? Sign Up</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                    <Text style={styles.navigationText}>Forgot Password?</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#fff'
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
    loginButton: {
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
    },
    navigationText: {
        marginTop: 15,
        fontSize: 16,
        color: '#fff'
    }
});
