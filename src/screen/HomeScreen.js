import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, SafeAreaView } from "react-native";
import PokeList from "../api/pokeList"
import PokeCard from '../components/pokeCard'
import Spinner from 'react-native-loading-spinner-overlay';

const HomeScreen = ({ navigation }) => {
    const [pokeList, setPokeList] = useState([])
    const limit = 30;
    const count = 1118;
    const [offset, setOffset] = useState(0)
    const [refresh, setRefresh] = useState(false)
    const getPokemonList = async () => {
        try {
            let ofSet = offset;
            const response = await PokeList.get(`?limit=${limit}&offset=${ofSet}`);
            let list = pokeList;
            let newList = list.concat(response.data.results)
            setPokeList(newList);
            setOffset(ofSet + limit)
            setRefresh(false)
        } catch (e) {
            console.log('Error', e);
        }
    }
    useEffect(() => {
        setRefresh(true);
        getPokemonList()
    }, [])
    const fetchResult = async () => {
        if (pokeList.length < count) {
            setRefresh(true);
            getPokemonList();
        } else {
            console.log('No More Data to load')
        }
    }

    return (
        <View style={styles.container}>
            { refresh ? <Spinner
                visible={true}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
            /> : null
            }
            <SafeAreaView>
                <FlatList
                    onEndReached={fetchResult}
                    onEndReachedThreshold={0.7}
                    data={pokeList}
                    numColumns={2}
                    renderItem={({ item }) => {
                        return (
                            <PokeCard key={(item) => item.name} pokemon={item} navigation={navigation} />
                        );
                    }}
                    keyExtractor={(item) => item.url}
                />
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#424242',
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: '2%'
    },
    spinnerTextStyle: {
        color: '#FFF'
    },
    listView: {

    }
});

export default HomeScreen;