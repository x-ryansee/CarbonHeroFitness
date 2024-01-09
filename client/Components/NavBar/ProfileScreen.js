import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import * as Progress from 'react-native-progress';

export default function ProfileScreen({ navigation }) {
    const userData = {
        profileImage: 'https://via.placeholder.com/100',
        name: 'Ryan See',
        joinDate: '2023-08-31',
        followers: 120,
        following: 75,
        stats: {
            distanceCovered: 250, // in km
            carbonSaved: 15, // in kg
            nextLevelAt: 20, // in kg
            nextRewardAt: 30, // in kg
        },
        achievements: ['First 10km Run', '5 Days Streak', '10kg CO2 Saved'],
    };

    const levelProgressPercentage = userData.stats.carbonSaved / userData.stats.nextLevelAt;
    const rewardProgressPercentage = userData.stats.carbonSaved / userData.stats.nextRewardAt;

    const handleLogout = () => {
        navigation.navigate('Login');
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={{ uri: userData.profileImage }} style={styles.profileImage} />
                <Text style={styles.name}>{userData.name}</Text>
                <Text style={styles.joinDate}>Joined: {userData.joinDate}</Text>
            </View>

            <View style={styles.followContainer}>
                <View style={styles.followBox}>
                    <Text style={styles.followText}>Followers</Text>
                    <Text style={styles.followCount}>{userData.followers}</Text>
                </View>
                <View style={styles.followBox}>
                    <Text style={styles.followText}>Following</Text>
                    <Text style={styles.followCount}>{userData.following}</Text>
                </View>
            </View>

            <View style={styles.statsContainer}>
                <Text style={styles.statsTitle}>Statistics</Text>
                <Text style={styles.statItem}>Total Distance Covered: {userData.stats.distanceCovered} km</Text>
                <Text style={styles.statItem}>Total Carbon Saved: {userData.stats.carbonSaved} kg</Text>

                <Text style={styles.progressText}>Level Progress:</Text>
                <Progress.Bar 
                    progress={levelProgressPercentage} 
                    width={null} 
                    color="#4CAF50"
                    style={styles.progressBar}
                />
                <Text style={styles.progressInfo}>Reach {userData.stats.nextLevelAt} kg for the next level!</Text>

                <Text style={styles.progressText}>Reward Progress:</Text>
                <Progress.Bar 
                    progress={rewardProgressPercentage} 
                    width={null} 
                    color="#2196F3"
                    style={styles.progressBar}
                />
                <Text style={styles.progressInfo}>Save up to {userData.stats.nextRewardAt} kg for the next reward!</Text>
            </View>

            <View style={styles.achievementsContainer}>
                <Text style={styles.achievementsTitle}>Achievements</Text>
                <FlatList
                    data={userData.achievements}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => <Text style={styles.achievementItem}>{item}</Text>}
                />
            </View>

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f8f8',
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    joinDate: {
        fontSize: 16,
        color: 'gray',
    },
    followContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    followBox: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    followText: {
        fontSize: 18,
    },
    followCount: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    statsContainer: {
        marginBottom: 20,
    },
    statsTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    statItem: {
        fontSize: 18,
        marginBottom: 5,
    },
    progressText: {
        fontSize: 18,
        fontWeight: '500',
        marginTop: 10,
    },
    progressBar: {
        height: 20,
        borderRadius: 10,
        backgroundColor: '#e0e0e0',
        marginBottom: 5,
    },
    progressInfo: {
        fontSize: 16,
        color: 'gray',
    },
    achievementsContainer: {
        marginBottom: 20,
    },
    achievementsTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    achievementItem: {
        fontSize: 18,
        padding: 5,
    },
    logoutButton: {
        padding: 10,
        backgroundColor: '#F44336',
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});
