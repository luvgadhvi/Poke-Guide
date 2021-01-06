import React, { useEffect } from "react";
import { StyleSheet, View, SafeAreaView, TouchableOpacity, FlatList, Text } from "react-native";
import ToggleDrawer from '../components/toggleDrawer';
import GenerationList from '../utils/generationsList';
import RegionNavCardComponent from "../components/regionNavCard"

const HomeScreen = ({ navigation }) => {

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity>
                    <ToggleDrawer navigation={navigation} />
                </TouchableOpacity>
            )
        });
    }, [])

    return (
        <View style={styles.container}>
            <SafeAreaView>
                <FlatList
                    data={GenerationList}
                    renderItem={({ item }) => {
                        return (
                            <RegionNavCardComponent region={item} navigation={navigation} />
                        );
                    }}
                    keyExtractor={(item) => item.label}
                />
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#424242',
        padding: 10
    },
    scrollView: {
        marginVertical: 10
    }
});

export default HomeScreen;