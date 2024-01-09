import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import MapView, { Polyline } from 'react-native-maps';
import * as Location from 'expo-location';

export default function RecordScreen() {
    const [location, setLocation] = useState(null);
    const [route, setRoute] = useState([]);
    const [tracking, setTracking] = useState(false);
    const [distance, setDistance] = useState(0);
    const [transport, setTransport] = useState(null); // Added state for transport mode
    let watchId;

    const startTracking = async () => {
        setTracking(true);

        // Request permission to access location
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.error('Permission to access location was denied');
            return;
        }

        watchId = await Location.watchPositionAsync(
            {
                accuracy: Location.Accuracy.High,
                distanceInterval: 10, // updates every 10 meters
            },
            position => {
                const { latitude, longitude } = position.coords;

                const newRoute = [...route, { latitude, longitude }];
                setRoute(newRoute);

                // Calculate distance if you have previous position
                if (location) {
                    const delta = getDistanceBetweenPoints(location, position.coords);
                    setDistance(distance + delta);
                }

                setLocation(position.coords);
            }
        );
    };

    const stopTracking = () => {
        setTracking(false);
        if (watchId) {
            watchId.remove();
        }
    };

    const getDistanceBetweenPoints = (point1, point2) => {
        // A basic function to get distance between two lat-long points 
        // (can use a library for more accurate calculations)
        return Math.sqrt(Math.pow(point2.latitude - point1.latitude, 2) + 
                         Math.pow(point2.longitude - point1.longitude, 2));
    };



    // ... [rest of your functions unchanged]

    return (
        <View style={styles.container}>
            <MapView 
                style={styles.map}
                showsUserLocation
                followsUserLocation
                initialRegion={{
                    latitude: location?.latitude || 37.78825,
                    longitude: location?.longitude || -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                {route.length > 0 && <Polyline coordinates={route} strokeWidth={4} strokeColor="#1E88E5" />}
            </MapView>

            <View style={styles.infoPanel}>
                {/* Transport Selection */}
                <View style={styles.transportSelection}>
                    <TouchableOpacity 
                        style={[styles.transportButton, transport === 'walk' ? styles.active : {}]}
                        onPress={() => setTransport('walk')}
                    >
                        <Text style={styles.buttonText}>Walk</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.transportButton, transport === 'bike' ? styles.active : {}]}
                        onPress={() => setTransport('bike')}
                    >
                        <Text style={styles.buttonText}>Bike</Text>
                    </TouchableOpacity>
                </View>

                {transport && (
                    <TouchableOpacity 
                        style={[styles.actionButton, tracking ? styles.stopButton : styles.startButton]}
                        onPress={() => { tracking ? stopTracking() : startTracking() }}
                    >
                        <Text style={styles.actionButtonText}>{tracking ? "Stop Tracking" : "Start Tracking"}</Text>
                    </TouchableOpacity>
                )}

                {distance !== 0 && (
                    <View style={styles.distanceContainer}>
                        <Text style={styles.distanceText}>Distance Travelled: {distance.toFixed(2)} km</Text>
                        <Text style={styles.distanceText}>Estimated Carbon Saved: {(distance * 0.2).toFixed(2)} kg</Text>
                    </View>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    map: {
        flex: 5,
    },
    infoPanel: {
        flex: 2,
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 10,
    },
    transportSelection: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    transportButton: {
        padding: 10,
        marginHorizontal: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#fff',
    },
    active: {
        backgroundColor: '#4CAF50',
    },
    buttonText: {
        color: '#333',
        fontSize: 16,
    },
    actionButton: {
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        width: 200,
    },
    startButton: {
        backgroundColor: '#4CAF50',
    },
    stopButton: {
        backgroundColor: '#F44336',
    },
    actionButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    distanceContainer: {
        alignItems: 'center',
    },
    distanceText: {
        fontSize: 16,
        color: '#555',
    }
});