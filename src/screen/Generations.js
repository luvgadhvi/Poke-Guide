import React, { useState, useEffect, useCallback, useMemo } from "react";
import { StyleSheet, View, Text, FlatList, TextInput, SafeAreaView } from "react-native";
import PokeGeneration from '../api/pokeRegion'
// import PokeCard from '../components/pokeCard'
import PokeStats from '../components/pokeStats'
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';
import { dropdownValue } from '../reducers/actions';
import TypeList from '../utils/TypesList'
import PokeList from "../api/pokeList";
import { Picker } from '@react-native-picker/picker';

const GenerationScreen = ({ navigation, route, filterValues, filterDispatch }) => {
    const region = route.params.region;
    const [pokeRegion, setPokeRegion] = useState([]);
    const [filterData, setFilterData] = useState([]);
    const [didMount, setDidMount] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [pokeSearch, setPokeSearch] = useState('');
    const [type, setType] = useState('All');

    const getPokeByRegion = async (generation) => {
        try {
            console.log('--GetPokemon--');
            const response = await PokeGeneration.get(`/${generation}`);
            for (let i = 0; i < response.data.pokemon_entries.length; i++) {
                try {
                    const pokeResponse = await PokeList.get(`/${response.data.pokemon_entries[i].pokemon_species.name}`);
                    setPokeRegion(prevArray => [...prevArray, pokeResponse.data])
                    setFilterData(prevArray => [...prevArray, pokeResponse.data])

                } catch (err) {
                    console.log('Err', err)
                }
            }
            console.log('Count', response.data.pokemon_entries.length)
            setRefresh(false)
        } catch (e) {
            // setError(e)
        }
    }
    useEffect(() => {
        setDidMount(true);
        setRefresh(true);
        navigation.setOptions({
            title: region.region
        });
        console.log('value', region.value)
        getPokeByRegion(region.value)
        return () => {
            console.log('Umount');
            setPokeRegion([]);
            setDidMount(false);
        }
    }, [region.value]);
    const renderPokeCard = ({ item }) => <PokeStats key={item.name} pokemon={item} navigation={navigation} />;
    const memoizedValue = useMemo(() => renderPokeCard, [filterData]);
    const keyExtractor = (item) => item.name;
    const filterList = (text, type) => {
        console.log('---', text, type);
        if (text === '' && type === 'All') {
            setFilterData([...pokeRegion])
        } else {
            const newData = pokeRegion.filter(item => {
                return (item.name.includes(text) && (JSON.stringify(item.types).includes(type) || type === 'All'))
            })
            setFilterData([...newData])
        }
    }
    const searchFilter = (text) => {
        console.log('Text', text)
        if (pokeSearch !== '') {
            const newData = filterData.filter(item => {
                return item.name.includes(text)
                // return JSON.stringify(item.types).includes(text)
            })
            for (let i = 0; i < newData.length; i++) {
                console.log('newData--', newData[i].name)
            }
            setFilterData([...newData])
        } else if (pokeSearch == '') {
            setFilterData([...pokeRegion])
        }
    }
    const typeFilter = (type) => {
        if (type === 'All') {
            setFilterData([...pokeRegion])
            setPokeSearch('')
        } else {
            const newData = filterData.filter(item => {
                return JSON.stringify(item.types).includes(type)
            })
            setFilterData([...newData])
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {refresh ? <Spinner
                visible={true}
                textContent={'Loading..'}
                textStyle={styles.spinnerTextStyle}
            /> : null
            }
            <View style={styles.container}>
                <View style={styles.filterView}>
                    <TextInput
                        maxLength={20}
                        placeholder="Search Pokemon"
                        value={pokeSearch}
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholderTextColor="black"
                        onChangeText={(text) => {
                            setPokeSearch(text)
                            filterList(text, type)
                        }}
                        onSubmitEditing={() => {

                        }}
                        style={styles.selected}
                    />
                    <Picker
                        selectedValue={type}
                        style={styles.selected}
                        onValueChange={(itemValue, itemIndex) => {
                            setType(itemValue)
                            filterList(pokeSearch, itemValue)
                        }
                        }>
                        {(TypeList).map((type, index) =>
                            <Picker.Item key={type.label} label={type.label} value={type.value} />
                        )
                        }
                    </Picker>
                </View>
                <FlatList
                    data={filterData}
                    numColumns={2}
                    renderItem={memoizedValue}
                    keyExtractor={keyExtractor}
                    initialNumToRender={5}
                    maxToRenderPerBatch={10}
                    windowSize={10}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#424242',
        padding: '2%'
    },
    filterView: {
        flexDirection: 'row',
        paddingBottom: 10
    },
    selected: {
        width: 200,
        height: 40,
        overflow: 'hidden',
        textAlign: 'center',
        fontSize: 16,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: '#9a9e96',
        color: 'black',
        // color: 'white',
    },
    dropdown: {
        width: 200,
        fontSize: 16,
        height: 45,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: 'black',
        backgroundColor: '#9a9e96'
    }
});
const mapStateToProps = (state) => {
    return {
        filterValues: state.filterValue.values
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        filterDispatch: (value) => {
            dispatch(dropdownValue(value))
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(GenerationScreen);