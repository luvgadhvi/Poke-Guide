import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity, ImageBackground } from "react-native";
import PokeList from "../api/pokeList"
import backgroundColourHelper from "../utils/backgroundHelper";
import { connect } from 'react-redux';

const PokeStats = ({ pokemon,navigation }) => {
    const [image, setImage] = useState(null);
    const [backgroundColor, setBackgroundColor] = useState(null);
    const [types, setTypes] = useState('');
    useEffect(() => {
        setImage(pokemon.sprites.other["official-artwork"]["front_default"]);
        setBackgroundColor(backgroundColourHelper(pokemon.types[0].type.name));
        return () => {

        }
    }, [])
    return (
        <TouchableOpacity onPress={() => {
            navigation.navigate('Pokemon', {
                details: {
                    background: backgroundColor,
                    pokemon: pokemon,
                    name: pokemon.name
                }
            })

        }}
            style={[styles.container, { backgroundColor: backgroundColor }]}
        >
            <Image style={styles.image}
                source={{ uri: image }}
            />
            <Text style={styles.pokeName}>{pokemon.name}</Text>
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

const mapStateToProps = (state) => {
    return {
        values: state.filterValue.values
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        filterValue: (value) => {
            dispatch(dropdownValue(value))
        }
    }
}


export default (connect(mapStateToProps, mapDispatchToProps)(PokeStats));