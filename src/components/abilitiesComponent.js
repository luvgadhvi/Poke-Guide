import React from "react";
import { Text, StyleSheet, View, FlatList } from "react-native";
//This Component will render pokemon ability list.
const AbilitiesComponent = ({ abilities }) => {
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
                            {item}
                        </Text>
                    );
                }}
                keyExtractor={(abilities) => abilities}
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