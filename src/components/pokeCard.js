import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity, ImageBackground } from "react-native";
import PokeList from "../api/pokeList"
import * as Color from '../json/color.json'
import Spinner from 'react-native-loading-spinner-overlay';
const ColorType = Color

const PokeCard = ({ pokemon, navigation }) => {
    const [pokeDetails, setPokeDetails] = useState(null);
    const [image, setImage] = useState(null);
    const [bgColor, setBgColor] = useState(null);
    const setBackGround = (bgColor) => {
        const bg = Object.values(ColorType).filter((color) => color.name == bgColor)
        const bg_Color = bg[0] ? bg[0]['color'] : '#81D4fA';
        setBgColor(bg_Color)
    }

    const getPokemonDetails = async (name) => {
        try {
            const response = await PokeList.get(`/${name}`);
            setPokeDetails(response.data);
            setImage(response.data.sprites.other["official-artwork"]["front_default"]);
            setBackGround(response.data.types[0].type.name)
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        getPokemonDetails(pokemon.name)
    }, [])

    return (
        <TouchableOpacity onPress={() => {
            navigation.navigate('Pokemon', {
                details: {
                    background: bgColor,
                    pokemon: pokeDetails,
                    name: pokemon.name
                }
            })

        }}
            style={[styles.container, { backgroundColor: bgColor }]}
        >
            <Image style={styles.image}
                source={{ uri: image }}
                PlaceholderContent={<Spinner />}
            />
            <Text style={styles.pokeName}>{pokemon.name}</Text>
        </TouchableOpacity>

    );

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
        marginBottom: 15,
        textAlign: 'center'
    },
    image: {
        width: "90%",
        height: "90%",
        resizeMode: 'cover',
    }
});



export default PokeCard;