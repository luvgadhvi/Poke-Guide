import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Feather';
//Function to render menu icon in left side header on home page.
const ToggleDrawer = ({ navigation }) => {
    return (
        <TouchableOpacity onPress={navigation.openDrawer}>
            <View>
                <Icon style={styles.menuIcon}
                    name="menu"
                />
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    menuIcon: {
        margin: 10,
        fontSize: 25,
        color: '#fafafa',
    }
});

export default ToggleDrawer;