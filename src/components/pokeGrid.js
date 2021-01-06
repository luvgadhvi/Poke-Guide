import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, Image, SafeAreaView } from "react-native";
import PokeList from "../api/pokeList";
import backgroundColourHelper from "../utils/backgroundHelper"
import Spinner from 'react-native-loading-spinner-overlay';

const PokeGridComponent = ({ name, type }) => {
    const [image, setImage] = useState(null);
    const [details, setDetails] = useState({});
    const [error, setError] = useState(null)
    const [backgroundColor, setBackgroundColor] = useState(null);
    const [pokeTypes, setPokeTypes] = useState(null)

    useEffect(() => {
        getPokemonDetails(name)
    }, [])
    const getPokemonDetails = async (name) => {
        try {
            const response = await PokeList.get(`/${name}`);
            setDetails(response.data)
            setImage(response.data.sprites.other["official-artwork"]["front_default"]);
            setBackgroundColor(backgroundColourHelper(response.data.types[0].type.name));
            setPokeTypes(response.data.types)
        } catch (e) {
            setError(e)
        }
    }
    if (error) {
        return (<></>)
    }
    if (JSON.stringify(pokeTypes).includes(type) || type === 'All') {
        // console.log(pokeTypes)
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={[styles.container, { backgroundColor: backgroundColor }]}>
                    <View style={[styles.imageContainer]}>
                        <Image style={styles.image}
                            source={{ uri: image }}
                        />
                        <Text style={styles.imageText}>{details.name}</Text>
                    </View>
                    <View style={styles.pokeInfoContainer}>
                        <Text style={styles.text}>Id: {details.id}</Text>
                        <Text style={styles.text}>Weight: {details.weight}</Text>
                        <Text style={styles.text}>Height: {details.height}</Text>
                    </View>
                </View>
            </SafeAreaView>
        );
    } else {
        return (<></>)
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 2,
        borderColor: 'black',
        flexDirection: 'row',
        marginVertical: 5,
        justifyContent: 'space-between',
        borderRadius: 25
    },
    imageContainer: {
        alignItems: 'center'
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'cover'
    },
    imageText: {
        color: 'white',
        fontSize: 18,
        marginVertical: 7,
        textTransform: 'capitalize'
    },
    pokeInfoContainer: {
        flex: 1,
        margin: '5%',
        justifyContent: 'flex-start',
    },
    text: {
        color: 'white',
        fontSize: 18,
        marginVertical: 5
    }
});

export default PokeGridComponent;