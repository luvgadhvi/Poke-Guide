import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity, Image } from "react-native";


const RegionNavCardComponent = ({ region, navigation }) => {

    const navigateTo = () => {
        if (region.value == 'all') {
            navigation.navigate('AllPokemon')
        } else {
            navigation.navigate('Generation', {
                region:region
            })
        }
    }

    return (
        <TouchableOpacity
            onPress={navigateTo}
        >
            <View style={styles.allContainer}>
                <Image style={styles.image}
                    source={region.path}
                />
                <View style={styles.insideText}>
                    <Text style={styles.imageText}>Pokémon:{region.label}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

}

const styles = StyleSheet.create({
    allContainer: {
        marginVertical: 5,
        width: '100%',
        height: 250,
        borderWidth: 2,
        borderColor: 'black',
        flexDirection: 'column',
        borderRadius: 10
    },
    image: {
        width: "100%",
        height: '100%',
        backgroundColor: 'white',
        resizeMode: "stretch",
    },
    insideText: {
        width: "100%",
        height: 50,
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'black',
        opacity: 0.8
    },
    imageText: {
        padding: 10,
        fontSize: 18,
        overflow: 'visible',
        fontWeight: "bold",
        color: 'white',
    }
});

export default RegionNavCardComponent;