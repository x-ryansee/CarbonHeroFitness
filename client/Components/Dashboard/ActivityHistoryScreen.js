// ActivityHistoryScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

export default function ActivityHistoryScreen() {
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        // Fetch user's past activities here.
        // This is a mock; replace with actual API call.
        const fetchData = async () => {
            const response = await fetch('YOUR_API_ENDPOINT_FOR_ACTIVITIES');
            const data = await response.json();
            setActivities(data);
        };

        fetchData();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Activity History</Text>
            <FlatList
                data={activities}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.listItem}>
                        <Text>{item.activity}</Text>
                        <Text>{item.emission} kg CO2e</Text>
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
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20
    },
    listItem: {
        padding: 15,
        marginBottom: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});
