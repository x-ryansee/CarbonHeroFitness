import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

export default function FeedScreen() {
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        // Mock data with carbon savings
        const mockActivities = [
            { id: '1', user: 'John Doe', activity: 'Cycled 5 miles', carbonSaved: '1.2kg CO2' },
            { id: '2', user: 'Alice', activity: 'Walked 2 miles', carbonSaved: '0.5kg CO2' },
            { id: '3', user: 'Bob', activity: 'Used BART for 10 miles', carbonSaved: '2.5kg CO2' },
            { id: '4', user: 'Eve', activity: 'Biked to work', carbonSaved: '0.8kg CO2' },
            // ... add more mock activities
        ];

        setActivities(mockActivities);
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Community Feed</Text>

            <FlatList
                data={activities}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.activityItem}>
                        <Text style={styles.activityUser}>{item.user}</Text>
                        <Text style={styles.activityDescription}>{item.activity}</Text>
                        <Text style={styles.carbonSaved}>Carbon Saved: {item.carbonSaved}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#E8F5E9', // Light green background for an eco-friendly theme
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#2E7D32', // Darker green for contrast
        marginBottom: 20,
        textAlign: 'center',
    },
    activityItem: {
        padding: 20,
        marginBottom: 15,
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#C8E6C9', // Light green border
        elevation: 3, // Adding some shadow for a 3D effect
    },
    activityUser: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#388E3C', // Green text
        marginBottom: 5,
    },
    activityDescription: {
        fontSize: 16,
        color: '#4E342E', // Earthy tone for regular text
        marginBottom: 5,
    },
    carbonSaved: {
        fontSize: 14,
        fontStyle: 'italic',
        color: '#1B5E20', // Deep green for emphasis
    }
});