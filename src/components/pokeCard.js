import React, { useEffect, useState, memo } from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity, ImageBackground } from "react-native";
import PokeList from "../api/pokeList"
import backgroundColourHelper from "../utils/backgroundHelper";
import { connect } from 'react-redux';

const PokeCard = ({ pokemon, navigation, values }) => {
    const [pokeDetails, setPokeDetails] = useState(null);
    const [image, setImage] = useState(null);
    const [backgroundColor, setBackgroundColor] = useState(null);
    const [error, setError] = useState(null);
    const [types, setTypes] = useState('');

    const getPokemonDetails = async (name) => {
        try {
            const response = await PokeList.get(`/${name}`);
            setPokeDetails(response.data);
            await setImage(response.data.sprites.other["official-artwork"]["front_default"]);
            setBackgroundColor(backgroundColourHelper(response.data.types[0].type.name));
            setTypes(JSON.stringify(response.data.types));
        } catch (e) {
            setError(e);
        }
    }
    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            getPokemonDetails(pokemon.name)
        }
        return () => {
            // clean up
            isMounted = false;
        }
    }, [])
    if (error) {
        return (
            <TouchableOpacity
                style={[styles.container, { backgroundColor: backgroundColor }]}
            >
                <Text style={styles.pokeName}>{pokemon.name}</Text>
            </TouchableOpacity>

        );
    }
    if (pokemon.name.includes(values.searchValue) && (types.includes(values.type) || values.type === 'All')) {
        return (
            <TouchableOpacity onPress={() => {
                navigation.navigate('Pokemon', {
                    details: {
                        background: backgroundColor,
                        pokemon: pokeDetails,
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

        );
    } else {
        return <View></View>;
    }


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


export default (connect(mapStateToProps, mapDispatchToProps)(PokeCard));