import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import * as Color from '../json/color.json'
const ColorType = Color

const TypeBoxComponent = ({ type }) => {
    const setBackGround = (type) => {
        const bg = Object.values(ColorType).filter((color) => color.name == type)
        const bg_Color = bg[0] ? bg[0]['color'] : '#007C42';
        return { backgroundColor: bg_Color }
    }
    return (
        
        <View style={styles.container}>
        
            {Object.values(type).map((type, index) =>
                <Text key={index}
                    style={[styles.text, setBackGround(type.type.name)]}
                >
                    {type.type.name}
                </Text>)
            }
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
        width: 150,
        fontSize: 24,
        borderRadius: 15,
        marginHorizontal: 5
    }
});

export default TypeBoxComponent;