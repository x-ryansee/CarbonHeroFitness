// InputScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

export default function InputScreen() {
    const [activity, setActivity] = useState('');
    const [emission, setEmission] = useState('');

    const handleSave = () => {
        // Save the activity and emission to your database here.
        // After saving, you can navigate the user back or show a confirmation message.
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Activity"
                value={activity}
                onChangeText={setActivity}
            />
            <TextInput
                style={styles.input}
                placeholder="Emission (in kg CO2e)"
                value={emission}
                onChangeText={setEmission}
                keyboardType="numeric"
            />
            <Button title="Save Activity" onPress={handleSave} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f8f8'
    },
    input: {
        padding: 15,
        marginBottom: 10,
        backgroundColor: '#fff',
        borderRadius: 25
    }
});
