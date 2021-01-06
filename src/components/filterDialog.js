import React, { useState, useEffect } from "react";
import { Button, Text, StyleSheet, View, TouchableOpacity } from "react-native";
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Feather';
import GenerationList from '../utils/generationsList';
import DropDownPicker from 'react-native-dropdown-picker';
import { connect } from 'react-redux';
import { closeDialog, dropdownValue } from '../reducers/actions';


const FilterDialog = ({ isOpen, closeDialog, dropdownValue }) => {
    const [generationValue, setGenerationValue] = useState('26');
    const modalHeader = (
        <View style={styles.modalHeader}>
            <TouchableOpacity>
                <Icon
                    name="x"
                    style={styles.closeIcon}
                    onPress={closeDialog}
                >
                </Icon>
            </TouchableOpacity>
            <Text style={styles.title}>Filters</Text>
            <TouchableOpacity style={{ ...styles.actions, backgroundColor: '#00479e' }}>
                <Text style={styles.actionText}
                    onPress={() => {
                        closeDialog()
                        dropdownValue({ generation: generationValue })
                    }}
                >Save</Text>
            </TouchableOpacity>
        </View>
    )
    const modalBody = (
        <View style={styles.modalBody}>
            <Text style={styles.bodyText}>Select Region:</Text>
            <DropDownPicker
                items={GenerationList}
                defaultValue={generationValue}
                containerStyle={{ height: 50 }}
                style={styles.dropdownStyle}
                itemStyle={{
                    justifyContent: 'flex-start'
                }}
                onChangeItem={item => {
                    setGenerationValue(item.value)
                }}
            />
        </View>
    )


    const modalContainer = (
        <View style={styles.modalContainer}>
            {modalHeader}
            {modalBody}
        </View>
    )

    const modal = (
        <Modal
            visible={isOpen}
        >
            <View style={styles.modal}>
                <View>
                    {modalContainer}
                </View>
            </View>
        </Modal>
    )

    return (
        <View style={styles.container}>
            {modal}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: "#00000099",
        alignItems: 'center'
    },
    modal: {

    },
    modalContainer: {
        backgroundColor: "#f9fafb",
        borderRadius: 40,
    },
    modalHeader: {
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        backgroundColor: '#D53A47',
        justifyContent: 'space-between',
    },
    closeIcon: {
        fontSize: 28,
        paddingHorizontal: '1%',
        color: 'white',
    },
    title: {
        fontSize: 25,
        color: 'white',
        paddingHorizontal: 15
    },
    modalBody: {
        backgroundColor: "#fff",
        paddingHorizontal: 10,
        height: 20
    },
    bodyText: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 15,
        fontWeight: 'bold'
    },
    dropdownStyle: {
        // paddingHorizontal: 10,
    },
    actions: {
        borderRadius: 5,
        marginHorizontal: 10,
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    actionText: {
        color: "#fff"
    }
});
const mapStateToProps = (state) => {
    return {
        isOpen: state.dialog.isOpen
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        closeDialog: () => {
            dispatch(closeDialog())
        },
        dropdownValue: (value) => {
            console.log('value', value)
            dispatch(dropdownValue(value))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(FilterDialog)