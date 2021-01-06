import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
const BoilerScreen = () => {
    return (
        
        <View style={styles.container}>
         <Text onPress={() => {
                dispatch({
                    type: 'open'
                })
            }}>Test Here</Text>
            <Text onPress={() => {
                dispatch({
                    type: 'close'
                })
            }}>Test Here1</Text>
            <Text>Bolider POINT</Text>
            <Text>Bolider POINT</Text>
        </View>);
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 15
    }
});

export default BoilerScreen;