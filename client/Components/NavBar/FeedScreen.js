import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, RefreshControl } from 'react-native';

const PAGE_SIZE = 20;

export default function FeedScreen() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const fetchUsers = useCallback(async (pageNum = 1) => {
        try {
            const response = await fetch(`http://localhost:8000/api/carbonherofitness/users/?page=${pageNum}&page_size=${PAGE_SIZE}`);
            const data = await response.json();

            if (data.results && data.results.length > 0) {
                setUsers(prevUsers => [...prevUsers, ...data.results]);
            } else {
                setHasMore(false);
            }
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, []);

    useEffect(() => {
        fetchUsers();
    }, []);

    const loadMoreUsers = () => {
        if (!loading && hasMore) {
            setPage(prevPage => prevPage + 1);
            fetchUsers(page + 1);
        }
    };

    const onRefresh = () => {
        setRefreshing(true);
        setUsers([]);
        setPage(1);
        setHasMore(true);
        fetchUsers();
    };

    return (
        <View style={styles.container}>
            {loading && <ActivityIndicator size="large" color="#00ff00" />}
            {error && <Text>Error loading data!</Text>}
            
            <FlatList
                data={users}
                keyExtractor={item => item.pk.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.userItem} onPress={() => console.log('User details for:', item.username)}>
                        <Text style={styles.username}>{item.username}</Text>
                        <Text>Carbon Footprint: {item.fields.carbon_footprint}</Text>
                        <Text>Total Points: {item.fields.total_points}</Text>
                    </TouchableOpacity>
                )}
                onEndReached={loadMoreUsers}
                onEndReachedThreshold={0.5}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
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
    userItem: {
        padding: 15,
        marginBottom: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    username: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    }
});
