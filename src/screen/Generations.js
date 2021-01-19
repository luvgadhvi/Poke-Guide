import React, { useState, useEffect, useMemo, useRef } from "react";
import { StyleSheet, View, Text, FlatList, SafeAreaView, LogBox } from "react-native";
import PokeGenerationApi from "../api/pokeNodeApi";
import PokeStats from '../components/pokeStats';
import Spinner from 'react-native-loading-spinner-overlay';
import TypeList from '../utils/TypesList';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Feather';
import backgroundColourHelper from "../utils/backgroundHelper";
import { renderers, Menu, MenuActions, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
const { SlideInMenu } = renderers;

const GenerationScreen = ({ navigation, route }) => {
    //Retrieving generation related metadata. 
    const region = route.params.region;
    const [pokeRegion, setPokeRegion] = useState([]);
    const [filterData, setFilterData] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [type, setType] = useState('All');
    const actionEl = useRef('');//Action button Element reference
    const menuEl = useRef('');//Popover Menu Reference.
    //Following Function will retrieve pokemon by their generation number.
    const getPokeByRegion = async (generation) => {
        try {
            console.log('--GetPokemon--', generation);
            const response = await PokeGenerationApi.get(`/${generation}`);
            console.log(response.data.count)
            setPokeRegion(response.data.PokeByGen);
            setFilterData(response.data.PokeByGen);
            setRefresh(false)
        } catch (e) {
            // setError(e)
        }
    }
    //Function to filter pokemon by their type.
    const filterList = (type) => {
        console.log(type);
        if (type === 'All') {
            setFilterData([...pokeRegion])
        }
        else {
            const newData = pokeRegion.filter(item => {
                return (JSON.stringify(item.Types).includes(type) || type === 'All')
            })
            setFilterData([...newData])
        }
    }
    //React Hook for initial page load.
    useEffect(() => {
        LogBox.ignoreLogs(['Animated: `useNativeDriver` was not specified.']);
        setRefresh(true);
        navigation.setOptions({
            title: region.region
        });
        getPokeByRegion(region.genByNumber)
        return () => {
            console.log('Umount');
            setPokeRegion([]);
        }
    }, [region.genByNumber]);
    //Function to render pokemon card by passing pokemon information.
    const renderPokeCard = ({ item }) => <PokeStats key={item.PokeId} pokemon={item} navigation={navigation} />;
    const memoizedValue = useMemo(() => renderPokeCard, [filterData]);
    //Providing each element with unique key.
    const keyExtractor = (item) => item.Name;
    //FUnction to render filter Menu
    const renderMenuOption = ({ item }) => (
        <MenuOption key={item.label} value={item.value} style={{ backgroundColor: backgroundColourHelper(item.value) }}>
            <View style={styles.optionView}>
                <Text style={styles.optionLabel}>{item.label}</Text>
            </View>
        </MenuOption>
    )
    return (
        <SafeAreaView style={{ flex: 1 }}>
            {refresh ? <Spinner
                visible={true}
                textContent={'Loading..'}
                textStyle={styles.spinnerTextStyle}
            /> : null
            }

            <Menu name="type" renderer={SlideInMenu} ref={menuEl} backHandler={true} onSelect={value => {
                setType(value)
                filterList(value)
            }}
                onOpen={() => {
                    actionEl.current.reset()
                }}
            >
                <MenuTrigger />
                <MenuOptions customStyles={optionsStyles}>
                    <View>
                        <Text style={styles.filterText}>Select Type</Text>
                        <FlatList
                            data={TypeList}
                            numColumns={2}
                            renderItem={renderMenuOption}
                            keyExtractor={(item) => item.label}
                        />
                    </View>

                </MenuOptions>
            </Menu>
            <View style={styles.container}>
                <FlatList
                    data={filterData}
                    // ListHeaderComponent={filterHeader}
                    numColumns={2}
                    renderItem={memoizedValue}
                    keyExtractor={keyExtractor}
                    initialNumToRender={5}
                    maxToRenderPerBatch={10}
                    windowSize={10}
                />
                <ActionButton buttonColor="rgba(231,76,60,1)" ref={actionEl}>
                    <ActionButton.Item buttonColor='#9b59b6' title="Type"
                        textContainerStyle={{ height: 30 }}
                        textStyle={{ fontSize: 18 }}
                        onPress={() => {
                            menuEl.current.open()
                        }}>
                        <Icon name="filter" style={[styles.actionButtonIcon]} />
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='#9b59b6' onPress={() => navigation.navigate('Search')}>
                        <Icon name="search" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                </ActionButton>
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
    actionButtonIcon: {
        fontSize: 25,
        height: 22,
        color: 'white',
    },
    optionView: {

    },
    filterText: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'black',
        paddingBottom: 5,

    },
    optionLabel: {
        color: 'white',
        padding: 5,
        textAlign: 'center'
    },
    noPoke: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white',
        marginVertical: 15,
    },
    actionView: {
        flexDirection: 'row'
    }
});
const optionsStyles = {
    optionsContainer: {
        // backgroundColor: '#d1cbcb',
        padding: 15
    },
    optionWrapper: {
        width: '48%',
        height: 40,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: 'black',
        margin: 1,
        marginBottom: 5,
        overflow: 'hidden'
    },
    optionTouchable: {
        activeOpacity: 70,
    }
};

export default GenerationScreen;