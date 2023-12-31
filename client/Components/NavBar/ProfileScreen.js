
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Button, FlatList, Alert, ProgressBarAndroid } from 'react-native';

export default function ProfileScreen({ navigation }) {
    const [userData, setUserData] = useState({
        name: 'John Doe',
        joinDate: '01/01/2022',
        followers: 120,
        following: 85,
        profileImage: 'URL_TO_PROFILE_IMAGE',
        stats: {
            distanceCovered: 250, // in kilometers
            carbonSaved: 50, // in kg
            nextRewardAt: 100, // Next reward at 100kg
            currentLevel: 1,
            nextLevelAt: 200, // Next level at 200kg
        },
        achievements: ['First Ride', '100km Club', 'Eco Hero'],
        rewards: ['Discount Voucher', 'Eco-Friendly Badge']
    });

    const handleLogout = () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'Logout',
                    onPress: () => {
                        // Here, perform logout operations
                        navigation.navigate('Login'); // Navigate back to Login or any relevant screen
                    }
                }
            ]
        );
    };

    const levelProgressPercentage = userData.stats.carbonSaved / userData.stats.nextLevelAt;
    const rewardProgressPercentage = userData.stats.carbonSaved / userData.stats.nextRewardAt;

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
                <ProgressBarAndroid style={styles.progressBar} progress={levelProgressPercentage} color="#4CAF50" />
                <Text style={styles.progressInfo}>Reach {userData.stats.nextLevelAt} kg for the next level!</Text>

                <Text style={styles.progressText}>Reward Progress:</Text>
                <ProgressBarAndroid style={styles.progressBar} progress={rewardProgressPercentage} color="#2196F3" />
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

            <Button title="Settings" onPress={() => navigation.navigate('Settings')} />
            <Button title="Edit Profile" onPress={() => navigation.navigate('EditProfile')} />
            <Button title="Logout" onPress={handleLogout} color="red" />
        </View>
    );
}

const styles = StyleSheet.create({
    // Existing styles...
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
        }
});
