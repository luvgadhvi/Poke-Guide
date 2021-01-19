import React, { useState, useMemo } from "react";
import { StyleSheet, View, TextInput, FlatList, Text } from "react-native";
import SearchApi from "../api/searchPoke";
import PokeStats from '../components/pokeStats';
import Spinner from 'react-native-loading-spinner-overlay';
//This Screen Will Load all the pokemon matching the query string.
const SearchScreen = ({ navigation }) => {
    const [pokeSearch, setPokeSearch] = useState('');
    const [searchResult, setSearchResult] = useState([])
    const [refresh, setRefresh] = useState(false);
    //This Function will provide list all possible result matching text input string.
    const searchPokemon = async (searchText) => {
        setRefresh(true)
        const response = await SearchApi.get('', { params: { search: searchText } });
        setSearchResult(response.data.pokeResult)
        console.log(response.data.pokeResult.length)
        setRefresh(false)
    }
    //Function to render pokemon card.
    const renderPokeCard = ({ item }) => <PokeStats key={item.PokeId} pokemon={item} navigation={navigation} />;
    const memoizedValue = useMemo(() => renderPokeCard, [searchResult]);
    const keyExtractor = (item) => item.Name;
    return (
        <View style={styles.container}>
            {refresh ? <Spinner
                visible={true}
                textContent={'Loading..'}
                textStyle={styles.spinnerTextStyle}
            /> : null
            }
            <TextInput
                maxLength={20}
                placeholder="Search Pokemon ...."
                value={pokeSearch}
                autoCapitalize="none"
                autoCorrect={false}
                placeholderTextColor="black"
                onChangeText={(text) => {
                    setPokeSearch(text)
                }}
                onSubmitEditing={() => {
                    searchPokemon(pokeSearch)
                }}
                style={[styles.inputBox]}
            />
            <FlatList
                data={searchResult}
                numColumns={2}
                renderItem={memoizedValue}
                keyExtractor={keyExtractor}
                initialNumToRender={5}
                maxToRenderPerBatch={10}
                windowSize={10}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#424242',
        padding: 10
    }, inputBox: {
        alignItems: 'center',
        backgroundColor: '#E6E8E9',
        borderRadius: 5,
        borderWidth: 1,
        color: '#8E8E93',
        fontSize: 17,
        height: 50,
        textAlign: 'center',
    }
});

export default SearchScreen;