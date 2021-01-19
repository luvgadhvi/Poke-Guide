import React, { useEffect } from "react";
import { StyleSheet, View, SafeAreaView, TouchableOpacity, FlatList, Text } from "react-native";
import ToggleDrawer from '../components/toggleDrawer';
import Searchbar from '../components/searchBar';
import GenerationList from '../utils/generationsList';
import RegionNavCardComponent from "../components/regionNavCard";
//Function to render page on load of the application.
const HomeScreen = ({ navigation }) => {
    ///React hooks for initial page load.
    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity>
                    <ToggleDrawer navigation={navigation} />
                </TouchableOpacity>
            ),
            headerRight: () => (
                <TouchableOpacity>
                    <Searchbar navigation={navigation} />
                </TouchableOpacity>
            )
        });
    }, [])
    //Function to render flatList Header to it call to scroll able.
    const FlatListHeader = () => {
        return (
            <Text style={styles.gen}>Generation</Text>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                numColumns={2}
                ListHeaderComponent={FlatListHeader}
                data={GenerationList}
                renderItem={({ item }) => {
                    return (
                        <RegionNavCardComponent region={item} navigation={navigation} />
                    );
                }}
                keyExtractor={(item) => item.label}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#424242',
        padding: 10,
        padding: '2%'
    }, gen: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 10,
        fontWeight: 'bold'
    }
});

export default HomeScreen;