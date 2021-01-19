import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, Image, Dimensions } from "react-native";
import Spinner from 'react-native-loading-spinner-overlay';
import PokeTabComp from '../components/pokeTab';

//This Screen Will Contain detail information of particular pokemon.
const PokeScreen = ({ route, navigation }) => {
    const details = route.params['details'];
    const [bgColor, setBgColor] = useState(null);
    const [Pokemon, setPokemon] = useState({});
    const [image, setImage] = useState(null);
    const [refresh, setRefresh] = useState(false)
    //React Hooks for Page Load
    useEffect(() => {
        setRefresh(false);
        setBgColor(details.background);
        setPokemon(details.pokemon)
        setImage(details.pokemon.Sprites[0])
        navigation.setOptions({
            title:details.pokemon.Name,
            headerStyle: {
                backgroundColor: details.background
            },
            headerRight: () => (
                <Text style={styles.headerRight}>#{details.pokemon.PokeId}</Text>
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
            <View style={styles.tapContainer}>
                <PokeTabComp route={route} navigation={navigation} pokemon={Pokemon} />
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
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        overflow: 'hidden'
    },
    textContainer: {
        flex: 1
    },
    statsContainer: {
        flex: 1
    },
    tapContainer: {
        marginTop: 10,
        flex: 2
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