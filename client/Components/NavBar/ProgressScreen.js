import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ProgressBarAndroid } from 'react-native';

export default function ProgressScreen() {
    const [savedCarbon, setSavedCarbon] = useState(0);
    const [nextRewardAt, setNextRewardAt] = useState(100); // example: next reward at 100kg
    const [currentLevel, setCurrentLevel] = useState(1);

    useEffect(() => {
        // Fetch user's progress data here

        // This is mock data. Replace with an API call to fetch real data.
        const fetchData = async () => {
            const mockData = {
                savedCarbon: 50, // user has saved 50kg of CO2
                currentLevel: 1
            };

            setSavedCarbon(mockData.savedCarbon);
            setCurrentLevel(mockData.currentLevel);
        };

        fetchData();
    }, []);

    const progressPercentage = savedCarbon / nextRewardAt;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Progress</Text>

            <Text style={styles.subtitle}>Level: {currentLevel}</Text>
            <Text style={styles.subtitle}>Carbon Saved: {savedCarbon} kg</Text>

            <Text style={styles.subtitle}>Progress towards next reward:</Text>
            <ProgressBarAndroid styleAttr="Horizontal" indeterminate={false} progress={progressPercentage} />
            
            <Text style={styles.infoText}>Earn more rewards by saving up to {nextRewardAt} kg!</Text>
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
    subtitle: {
        fontSize: 20,
        fontWeight: '500',
        marginBottom: 10,
    },
    infoText: {
        marginTop: 20,
        fontSize: 18,
        textAlign: 'center',
    }
});
