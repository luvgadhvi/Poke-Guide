import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View } from "react-native";

const BodyStatsComponent = ({ stats }) => {
    const [height, setHeight] = useState(stats.height);
    const [weight, setWeight] = useState(stats.weight);

    useEffect(() => {
        setWeight((stats.weight/10).toFixed(1));
        setHeight((stats.height/10).toFixed(1))
    });

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.text}>{height} M</Text>
                <Text style={styles.text}>{weight} KG</Text>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.textInfo}>Height</Text>
                <Text style={styles.textInfo}>Weight</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textContainer: {
        color: '#fafafa',
        flexDirection: "row"
    },
    text: {
        textAlign: 'center',
        color: '#fafafa',
        textTransform: 'capitalize',
        fontSize: 20,
        paddingHorizontal: 30
    },
    textInfo: {
        color: '#B1A5A5',
        fontSize: 18,
        paddingHorizontal: 30
    }
});

export default BodyStatsComponent;