import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';

export default function ForgotPasswordScreen({ navigation }) {
    const [email, setEmail] = useState('');

    const handlePasswordRecovery = () => {
        // Handle password recovery logic (e.g., API call)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Password Recovery</Text>
            <Text style={styles.infoText}>Enter your email to recover your password:</Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#ddd"
                value={email}
                onChangeText={setEmail}
            />
            <TouchableOpacity style={styles.button} onPress={handlePasswordRecovery}>
                <Text style={styles.buttonText}>Recover Password</Text>
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
        marginBottom: 10,
        color: '#333'
    },
    infoText: {
        fontSize: 16,
        marginBottom: 20,
        color: '#555',
        textAlign: 'center'
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
