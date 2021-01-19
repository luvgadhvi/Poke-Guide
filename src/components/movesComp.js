import React from "react";
import { Text, StyleSheet, View, FlatList, SafeAreaView } from "react-native";

//Function will render list of pokemon moves specific to that pokemon.
const MovesComponent = ({ moves }) => {
    return (
        <View style={styles.container} >
            <SafeAreaView style={{ flex: 1 }}>
                <FlatList
                    data={moves}
                    numColumns={2}
                    renderItem={({ item }) => {
                        return (
                            <Text key={item}
                                style={styles.text}
                            >
                                {item}
                            </Text>
                        );
                    }}
                    keyExtractor={(moves) => moves}
                />
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 15,
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

export default MovesComponent;