// CarbonTrackingScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function CarbonTrackingScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Carbon Tracking</Text>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('InputScreen')}>
                <Text style={styles.buttonText}>Input New Activity</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ActivityHistoryScreen')}>
                <Text style={styles.buttonText}>View Activity History</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f8f8',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20
    },
    button: {
        padding: 15,
        marginVertical: 10,
        width: '80%',
        backgroundColor: '#4CAF50',
        borderRadius: 25,
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 18,
        color: '#fff'
    }
});
