import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

export default function FeedScreen() {
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        // Fetch activities data here

        // This is mock data. Replace with an API call to fetch real data
        const fetchData = async () => {
            const mockActivities = [
                { id: '1', user: 'John Doe', activity: 'Cycled 5 miles' },
                { id: '2', user: 'Alice', activity: 'Walked 2 miles' },
                // ... add more mock activities
            ];

            setActivities(mockActivities);
        };

        fetchData();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Feed</Text>

            <FlatList
                data={activities}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.activityItem}>
                        <Text style={styles.activityUser}>{item.user}</Text>
                        <Text>{item.activity}</Text>
                    </View>
                )}
            />
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
    },
    activityItem: {
        padding: 15,
        marginBottom: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    activityUser: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    }
});
