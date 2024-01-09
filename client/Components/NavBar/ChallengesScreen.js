import React, { useState , useEffect } from 'react';
import { View, Text, StyleSheet , FlatList } from 'react-native';
import * as Progress from 'react-native-progress';

const ChallengeItem = ({ challenge }) => {
    const progressBarProgress = challenge.currentAmount / challenge.targetAmount;

    return (
        <View style={styles.challengeItem}>
            <Text style={styles.challengeTitle}>{challenge.title}</Text>
            <Text>{challenge.description}</Text>
            <Progress.Bar 
                progress={progressBarProgress} 
                width={null} // takes full width of the parent container
                color="#388E3C" 
                style={styles.progressBar}
            />
            <Text style={styles.progressText}>{(progressBarProgress * 100).toFixed(0)}% Complete</Text>
        </View>
    );
};

export default function ChallengesScreen() {
    const [challenges, setChallenges] = useState([]);

    useEffect(() => {
        // Updated mock data for challenges
        const mockChallenges = [
            { id: '1', title: 'Bicycle Challenge', description: 'Save 5kg of CO2 by bicycling', targetAmount: 5, currentAmount: 2.5 },
            { id: '2', title: 'Walking Challenge', description: 'Save 3kg of CO2 by walking', targetAmount: 3, currentAmount: 1.5 },
            { id: '3', title: 'Public Transport Challenge', description: 'Save 10kg of CO2 by using public transportation', targetAmount: 10, currentAmount: 4 },
            // ...add more challenges
        ];

        setChallenges(mockChallenges);
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Transportation Challenges</Text>
            <FlatList
                data={challenges}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <ChallengeItem challenge={item} />}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#E8F5E9',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#2E7D32',
        marginBottom: 20,
        textAlign: 'center',
    },
    challengeItem: {
        padding: 20,
        marginBottom: 15,
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#C8E6C9',
        elevation: 3,
    },
    challengeTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#388E3C',
        marginBottom: 5,
    },
    progressBar: {
        height: 20,
        backgroundColor: '#E0E0E0',
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 5,
    },
    progressText: {
        fontSize: 14,
        fontStyle: 'italic',
        color: '#1B5E20',
        textAlign: 'right',
    }
});
