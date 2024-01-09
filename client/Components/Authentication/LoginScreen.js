import React from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
    // Keep the username and password states, but they won't be used for validation
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleLogin = async () => {
        try {
            // Directly navigate to the MainApp screen without using username and password
            await AsyncStorage.setItem('token', 'mock-token'); // Mock token for demonstration
            navigation.navigate('MainApp');
        } catch (error) {
            console.error("There was an error during the login process", error);
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
