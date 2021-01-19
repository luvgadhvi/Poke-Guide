import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Feather';
//Function to render search icon in right side header on home page.
const Searchbar = ({ navigation }) => {
    return (
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <View>
                <Icon style={styles.menuIcon}
                    name="search"
                />
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    menuIcon: {
        marginHorizontal: 20,
        marginVertical: 10,
        fontSize: 25,
        color: '#fafafa',
    }
});

export default Searchbar;