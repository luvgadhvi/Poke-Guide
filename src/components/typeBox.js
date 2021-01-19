import React from "react";
import { Text, StyleSheet, View, FlatList } from "react-native";
import * as Color from '../json/color.json'
const ColorType = Color
//Component will load pokemon pokemon type box with type background colour.
const TypeBoxComponent = ({ type }) => {
    const setBackGround = (type) => {
        const bg = Object.values(ColorType).filter((color) => color.name == type)
        const bg_Color = bg[0] ? bg[0]['color'] : '#007C42';
        return { backgroundColor: bg_Color }
    }
    const TypeRender =
        ({ item }) => {
            return (
                <Text key={item}
                    style={[styles.text, setBackGround(item)]}
                >
                    {item}
                </Text>
            );
        }
        ;
    return (
        <View style={styles.container}>
            <FlatList
                data={type}
                numColumns={2}
                renderItem={TypeRender}
                keyExtractor={(type) => type}
            />
        </View>);
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 15,
        color: '#fafafa',
        flexDirection: "row",
        justifyContent: 'center'
    },
    text: {
        color: '#fafafa',
        textAlign: 'center',
        overflow: 'hidden',
        textTransform: 'capitalize',
        borderWidth: 2,
        width: '47%',
        fontSize: 24,
        borderRadius: 15,
        marginHorizontal: 5
    }
});

export default TypeBoxComponent;