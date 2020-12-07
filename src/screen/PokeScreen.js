import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, Image } from "react-native";
import TypeBoxComponent from "../components/typeBox";
import BodyStatsComponent from '../components/bodyStats';
import AbilitiesComponent from '../components/abilitiesComponent'
import Spinner from 'react-native-loading-spinner-overlay';

const PokeScreen = ({ route, navigation }) => {
    const details = route.params['details'];
    const [bgColor, setBgColor] = useState(null);
    const [Pokemon, setPokemon] = useState({});
    const [image, setImage] = useState(null);
    const [refresh, setRefresh] = useState(false)
    useEffect(() => {
        setRefresh(false);
        setBgColor(details.background);
        setPokemon(details.pokemon)
        setImage(details.pokemon.sprites.other["official-artwork"]["front_default"])
        navigation.setOptions({
            headerStyle: {
                backgroundColor: details.background
            },
            headerRight: () => (
                <Text style={styles.headerRight}>#{details.pokemon.id}</Text>
            )
        });  
    });
    return (
        <View style={styles.container}>
            { refresh ? <Spinner
                visible={true}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
            /> : null
            }
            <View
                style={[styles.imageContainer, { backgroundColor: bgColor }]}
            >
                <Image style={styles.image}
                    source={{ uri: image }}
                    PlaceholderContent={<Spinner />}
                />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.pokeName}>{Pokemon.name}</Text>
                <TypeBoxComponent type={details.pokemon.types} />
                <BodyStatsComponent stats={{
                    height: details.pokemon.height,
                    weight: details.pokemon.weight
                }} />
                <Text style={styles.pokeName}>Abilities:</Text>
                <AbilitiesComponent abilities={details.pokemon.abilities} />
            </View>

        </View>);
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#424242'
    },
    headerRight: {
        paddingHorizontal: 20,
        color: '#fafafa',
        fontSize: 16
    },
    imageContainer: {
        flex: 1,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        overflow: 'hidden'
    },
    textContainer: {
        flex: 2
    },
    statsContainer: {
        flex: 1
    },
    image: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain'
    },
    pokeName: {
        textTransform: 'capitalize',
        fontSize: 25,
        fontWeight: "bold",
        color: '#fafafa',
        textAlign: 'center',
        marginTop: 10
    }
});

export default PokeScreen;