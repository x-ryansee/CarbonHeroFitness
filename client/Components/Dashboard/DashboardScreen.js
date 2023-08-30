import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DashboardScreen({ navigation }) {
    const [carbonFootprint, setCarbonFootprint] = useState(0);
    const [progress, setProgress] = useState(0); // value between 0 and 1
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        // Fetch user data here

        // This is a mock, replace with actual API call
        const fetchData = async () => {
            const token = await AsyncStorage.getItem('token');

            const response = await fetch('http://YOUR_DJANGO_SERVER_ADDRESS/api/user_data/', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();
            setCarbonFootprint(data.carbonFootprint);
            setProgress(data.progress);
            setNotifications(data.notifications);
        };

        fetchData();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>EcoFit Dashboard</Text>

            <TouchableOpacity 
                style={styles.trackButton}
                onPress={() => navigation.navigate('CarbonTracking')}>
                <Text style={styles.trackButtonText}>Track Your Carbon Savings</Text>
            </TouchableOpacity>

            <View style={styles.section}>
                <Text style={styles.subtitle}>Carbon Footprint: {carbonFootprint} kg CO2e</Text>
                <Text style={styles.subtitle}>Progress towards next reward:</Text>
                <View style={styles.progressBar}>
                    <View style={{...styles.progressFill, width: `${progress*100}%`}} />
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.subtitle}>Notifications</Text>
                <FlatList
                    data={notifications}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.notificationItem}>
                            <Text>{item.text}</Text>
                        </View>
                    )}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f8f8'
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#4CAF50'
    },
    subtitle: {
        fontSize: 20,
        fontWeight: '500',
        marginBottom: 10,
        color: '#4C4C4C'
    },
    section: {
        padding: 15,
        marginBottom: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    notificationItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e5e5',
    },
    trackButton: {
        padding: 15,
        marginBottom: 20,
        backgroundColor: '#4CAF50',
        borderRadius: 25,
        alignItems: 'center',
    },
    trackButtonText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold'
    },
    progressBar: {
        height: 20,
        width: '100%',
        backgroundColor: '#e5e5e5',
        borderRadius: 15,
        overflow: 'hidden'
    },
    progressFill: {
        backgroundColor: '#4CAF50',
        height: '100%',
    }
});
