import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ProgressBarAndroid } from 'react-native';

export default function RewardsScreen() {
    const [savedCarbon, setSavedCarbon] = useState(0);
    const [nextRewardAt, setNextRewardAt] = useState(100); // Example: next reward at 100kg
    const [currentLevel, setCurrentLevel] = useState(1);
    const [nextLevelAt, setNextLevelAt] = useState(200); // Example: next level at 200kg
    const [rewardsEarned, setRewardsEarned] = useState([]);

    useEffect(() => {
        // Fetch user's progress and rewards data here
        // Replace with an API call to fetch real data.
        const fetchData = async () => {
            const mockData = {
                savedCarbon: 50, // User has saved 50kg of CO2
                currentLevel: 1,
                rewards: ['Discount Voucher', 'Eco-Friendly Badge']
            };

            setSavedCarbon(mockData.savedCarbon);
            setCurrentLevel(mockData.currentLevel);
            setRewardsEarned(mockData.rewards);
        };

        fetchData();
    }, []);

    const progressPercentage = savedCarbon / nextRewardAt;
    const levelProgressPercentage = savedCarbon / nextLevelAt;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your Rewards & Progress</Text>

            <View style={styles.progressSection}>
                <Text style={styles.subtitle}>Level: {currentLevel}</Text>
                <Text style={styles.subtitle}>Carbon Saved: {savedCarbon} kg</Text>

                <Text style={styles.progressText}>Progress towards next level:</Text>
                <ProgressBarAndroid
                    styleAttr="Horizontal"
                    indeterminate={false}
                    progress={levelProgressPercentage}
                    color="#4CAF50"
                />
                <Text style={styles.infoText}>Reach {nextLevelAt} kg for the next level!</Text>
            </View>

            <View style={styles.rewardsSection}>
                <Text style={styles.subtitle}>Rewards Earned:</Text>
                {rewardsEarned.map((reward, index) => (
                    <Text key={index} style={styles.rewardItem}>{reward}</Text>
                ))}

                <Text style={styles.progressText}>Progress towards next reward:</Text>
                <ProgressBarAndroid
                    styleAttr="Horizontal"
                    indeterminate={false}
                    progress={progressPercentage}
                    color="#2196F3"
                />
                <Text style={styles.infoText}>Earn more rewards by saving up to {nextRewardAt} kg!</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f8f8',
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
    progressSection: {
        marginBottom: 30,
    },
    rewardsSection: {},
    progressText: {
        fontSize: 18,
        marginBottom: 5,
    },
    rewardItem: {
        fontSize: 18,
        color: '#2E7D32',
        marginBottom: 5,
    },
    infoText: {
        marginTop: 20,
        fontSize: 18,
        textAlign: 'center',
    }
});
