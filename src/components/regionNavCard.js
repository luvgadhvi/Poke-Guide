import React from "react";
import { Text, StyleSheet, View, TouchableOpacity, Image } from "react-native";

//This Function will render pokemon generation list component present in home page
const RegionNavCardComponent = ({ region, navigation }) => {

    //Function to navigate to poke screen page for getting list of pokemon by their region.
    const navigateTo = () => {
        navigation.navigate('Generation', {
            region: region
        })
    }

    return (
        <View style={styles.allContainer}>
            <TouchableOpacity
                onPress={navigateTo}
            >
                <View style={styles.textView}>
                    <Text style={styles.text}>{region.label}</Text>
                </View>
                <View style={[styles.imageContainer]}>
                    <Image style={styles.image}
                        source={region.path}
                    />
                </View>
            </TouchableOpacity>
        </View>

    );

}

const styles = StyleSheet.create({
    allContainer: {
        width: '48%',
        height: 40,
        aspectRatio: 1,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'white',
        paddingVertical: 5,
        margin: '1%',
        backgroundColor: '#FDFDFD',
        overflow: 'hidden'
    },
    textView: {
    },
    text: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold'
    },
    imageContainer: {
        alignItems: 'center',
        overflow: 'hidden',

    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    }
});

export default RegionNavCardComponent;