import React, { useState, useEffect, useLayoutEffect } from "react";
import { Text, StyleSheet, View, SafeAreaView, FlatList, TouchableOpacity } from "react-native";
import PokeGeneration from '../api/pokeRegion'
import PokeGridComponent from '../components/pokeGrid'
import { connect } from 'react-redux';
import FilterHeaderComponent from '../components/filterHeader'
import FilterDialog from '../components/filterDialog'
import Spinner from 'react-native-loading-spinner-overlay';
import ToggleDrawer from '../components/toggleDrawer';
import TypeList from '../utils/TypesList'
import DropDownPicker from 'react-native-dropdown-picker';


const GenerationScreen = ({ navigation, values }) => {
    const [pokeRegion, setPokeRegion] = useState([]);
    const [typeValue, setTypeValue] = useState('All');
    const [refresh, setRefresh] = useState(false);
    const [error, setError] = useState(null);
    const getPokeRegion = async (generation) => {
        try {
            console.log('--GetPokemon--');
            setError(null)
            const response = await PokeGeneration.get(`/${generation}`);
            setPokeRegion(response.data.pokemon_entries);
            console.log('Count', response.data.pokemon_entries.length)
        } catch (e) {
            setError(e)
        }

    }

    useEffect(() => {
        setRefresh(true);
        console.log('UseEffect')
        console.log('Generations---', values.generation)
        console.log('Type', values.type)
        getPokeRegion(values.generation)
        setRefresh(false);
    }, [values.generation])

    return (
        <View style={styles.container}>
            { refresh ? <Spinner
                visible={true}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
            /> : null
            }
            <FilterDialog />
            <SafeAreaView>
                <Text style={styles.bodyText}>Select Type:</Text>
                <DropDownPicker
                    items={TypeList}
                    defaultValue={typeValue}
                    containerStyle={{ height: 50 }}
                    itemStyle={{
                        justifyContent: 'flex-start'
                    }}
                    style={styles.dropdownStyle}
                    onChangeItem={item => {
                        // setTypeValue(item.value)
                        alert(item.value);
                    }}
                />
                <FlatList
                    data={pokeRegion}
                    numColumns={1}
                    style={styles.listContainer}
                    renderItem={({ item }) => {
                        return (
                            <View key={item.pokemon_species.name}>
                                <PokeGridComponent name={item.pokemon_species.name} type={values.type} />
                            </View>

                        );
                    }}
                    keyExtractor={(item) => item.pokemon_species.name}
                />
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // margin: 10,
        backgroundColor: '#424242',
        flex: 1
    },
    listContainer: {
        margin: 15,
    }
});
const mapStateToProps = (state) => {
    return {
        values: state.dropdown.values
    }
}
const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GenerationScreen);