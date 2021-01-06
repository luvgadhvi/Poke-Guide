import React, { useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Feather';
import { useSelector, useDispatch } from 'react-redux';
import { openDialog } from '../reducers/actions'

const FilterHeaderComponent = () => {
    const dispatch = useDispatch();
    const dialogOpen = useSelector(state => state.dialog.isOpen)
    return (
        <TouchableOpacity onPress={() => {
            dispatch(openDialog())
        }}>
            <View style={styles.container}>
                <Icon
                    name="filter"
                    style={styles.filterIcon}
                >
                </Icon>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 25
    },
    filterIcon: {
        color: '#fafafa',
        fontSize: 25
    }
});

export default FilterHeaderComponent;