import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, Animated, FlatList } from "react-native";

const bgColour = (index) => {
    if (index % 2 === 0) {
        return '#4BC07A'
    } else {
        return '#FB6C6C'
    }
}

const widthSet = (base_stat) => {
    if (base_stat > 100) {
        return '100%'
    } else {
        return `${base_stat}%`
    }
}

//Progress will be filled by according to stats provided ranging from 0 tp 100,
const renderProgressBar = ({ item, index }) =>
(<View style={styles.statsView}>
    <Text style={styles.statName}>{item.statName}</Text>
    <Text style={styles.base_stat}>{item.base_stat}</Text>
    <View style={styles.progressContainer}>
        <View
            style={[
                styles.inner, { width: widthSet(item.base_stat) },
                { backgroundColor: bgColour(index) }
            ]}
        ></View>
    </View>
</View>

)
///Component will render list of available base stats.
const BaseStatsComp = ({ stats }) => {
    return (
        <View style={styles.container}>

            <FlatList
                data={stats}
                // numColumns={2}
                renderItem={renderProgressBar}
                keyExtractor={(item) => item.statName}
            />
        </View>);
}


const styles = StyleSheet.create({
    container: {
        marginTop: 20
    },
    progressContainer: {
        width: "55%",
        height: 15,
        padding: 3,
        borderWidth: 2,
        borderRadius: 30,
        marginVertical: 5,
        justifyContent: "center",
    },
    statsView: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginVertical: 10
    },
    inner: {
        width: "100%",
        height: 5,
        borderRadius: 15,
    },
    statName: {
        width: "30%",
        textTransform: 'capitalize',
        color: 'white',
        fontSize: 16
    },
    base_stat: {
        color: 'white',
        fontSize: 15
    }
});

export default BaseStatsComp;