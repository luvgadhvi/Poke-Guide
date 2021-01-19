import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import backgroundColourHelper from "../utils/backgroundHelper";
import { connect } from 'react-redux';

//Function to render pokemon card which contains pokemon name and type background.
const PokeStats = ({ pokemon, navigation }) => {
    const [image, setImage] = useState(null);
    const [backgroundColor, setBackgroundColor] = useState(null);
    //React hook for data to pass during pokemon card load.
    useEffect(() => {
        setImage(pokemon.Sprites[0]);
        setBackgroundColor(backgroundColourHelper(pokemon.Types[0]));
        return () => {

        }
    }, [])
    return (
        <TouchableOpacity onPress={() => {
            navigation.navigate('Pokemon', {
                details: {
                    background: backgroundColor,
                    pokemon: pokemon,
                    name: pokemon.Name
                }
            })

        }}
            style={[styles.container, { backgroundColor: backgroundColor }]}
        >
            <Image style={styles.image}
                source={{ uri: image }}
            />
            <Text style={styles.pokeName}>{pokemon.Name}</Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
        width: '48%',
        aspectRatio: 1,
        marginVertical: '2%',
        marginHorizontal: '1%',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'white',
        paddingVertical: 5
    },
    pokeName: {
        textTransform: 'capitalize',
        fontSize: 16,
        fontWeight: "bold",
        color: '#fafafa',
        marginBottom: 10,
        textAlign: 'center'
    },
    image: {
        width: "90%",
        height: "90%",
        resizeMode: 'cover',
    },
    noCard: {

    }
});



export default PokeStats;