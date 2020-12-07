import React from "react";
import { Text, StyleSheet, View, FlatList } from "react-native";

const AbilitiesComponent = ({ abilities }) => {
    // console.log(abilities)
    return (
        <View style={styles.container} >
            <FlatList
                data={abilities}
                numColumns={2}
                renderItem={({ item }) => {
                    return (
                        <Text key={item.ability}
                            style={styles.text}
                        >
                            {item.ability['name']}
                        </Text>
                    );
                }}
                keyExtractor={(abilities) => abilities.ability['name']}
            />
        </View>);
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 15,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap'
    },
    text: {
        flexBasis: '48%',
        backgroundColor: '#B1A5A5',
        color: '#fafafa',
        textAlign: 'center',
        textTransform: 'capitalize',
        borderWidth: 2,
        width: 150,
        fontSize: 22,
        overflow: 'hidden',
        borderRadius: 15,
        margin: 5
    }
});

export default AbilitiesComponent;