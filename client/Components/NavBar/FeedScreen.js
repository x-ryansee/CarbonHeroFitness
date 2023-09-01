import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

export default function FeedScreen() {
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/path_to_your_activities_endpoint/');

                if (!response.ok) {
                    console.error("There was a problem fetching the data.");
                    return;
                }

                const data = await response.json();
                const formattedActivities = data.map(activity => ({
                    id: activity.id.toString(),
                    user: activity.user.name, // Adjust based on your backend's response structure
                    activity: `${activity.name} ${activity.distance} miles`, // Assuming your activity has a 'name' and 'distance'
                }));

                setActivities(formattedActivities);
            } catch (error) {
                console.error("There was an error:", error);
            }
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
