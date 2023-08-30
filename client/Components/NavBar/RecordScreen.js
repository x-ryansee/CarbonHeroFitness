import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import MapView, { Polyline } from 'react-native-maps';
import * as Location from 'expo-location';

export default function RecordScreen() {
    const [location, setLocation] = useState(null);
    const [route, setRoute] = useState([]);
    const [tracking, setTracking] = useState(false);
    const [distance, setDistance] = useState(0);

    const startTracking = () => {
        setTracking(true);

        // Watch position changes
        Geolocation.watchPosition(
            position => {
                const { latitude, longitude } = position.coords;

                const newRoute = [...route, { latitude, longitude }];
                setRoute(newRoute);

                // Calculate distance if you have previous position (you may want to use a more sophisticated approach for accurate measurement)
                if (location) {
                    const delta = getDistanceBetweenPoints(location, position.coords);
                    setDistance(distance + delta);
                }

                setLocation(position.coords);
            },
            error => console.log(error),
            {
                enableHighAccuracy: true,
                distanceFilter: 10, // updates every 10 meters
            }
        );
    };

    const stopTracking = () => {
        setTracking(false);
        Geolocation.stopObserving();
    };

    const getDistanceBetweenPoints = (point1, point2) => {
        // A basic function to get distance between two lat-long points (can use a library for more accurate calculations)
        // This is a mock implementation
        return Math.sqrt(Math.pow(point2.latitude - point1.latitude, 2) + Math.pow(point2.longitude - point1.longitude, 2));
    };

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
                {route.length > 0 && <Polyline coordinates={route} />}
            </MapView>
            <Button title={tracking ? "Stop Tracking" : "Start Tracking"} onPress={tracking ? stopTracking : startTracking} />
            <Text>Distance Travelled: {distance.toFixed(2)} km</Text>
            <Text>Estimated Carbon Saved: {(distance * 0.2).toFixed(2)} kg</Text> {/* Assuming 0.2 kg saved per km. Adjust based on your data */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    map: {
        width: '100%',
        height: '70%',
    }
});
