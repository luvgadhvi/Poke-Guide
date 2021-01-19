import React, { useEffect } from "react";
import { Text, StyleSheet, View, Dimensions } from "react-native";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import TypeBoxComponent from "./typeBox";
import BodyStatsComponent from './bodyStats';
import AbilitiesComponent from './abilitiesComponent';
import BaseStatsComp from './baseStat';
import MovesComponent from "./movesComp";

//Function to render tab bar routes
const AboutRoute = (pokemon) => (
    <View style={styles.aboutView}>
        <Text style={styles.pokeName}>Types:</Text>
        <TypeBoxComponent type={pokemon.Types} />
        <BodyStatsComponent stats={{
            height: pokemon.Height,
            weight: pokemon.Weight
        }} />
        <Text style={styles.pokeName}>Abilities:</Text>
        <AbilitiesComponent abilities={pokemon.Abilities} />
    </View>

);
//Setting Base Stats Routes
const BaseStatsRoute = (stats) => (
    <View >
        <BaseStatsComp stats={stats} />
    </View>
);
//Setting Moves List Stats Routes
const MovesStatsRoute = (moves) => (
    <View >
        <MovesComponent moves={moves} />
    </View>
);

const renderTabBar = (props) => (
    <TabBar
        {...props}
        indicatorStyle={styles.tabIndicator}
        style={styles.tabBar}
    />
);

const initialLayout = { width: Dimensions.get('window').width };

const PokeTabComp = ({ pokemon }) => {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'About', title: 'About' },
        { key: 'BaseStats', title: 'Base Stats' },
        { key: 'Moves', title: 'Moves' }
    ]);

    const renderScene = SceneMap({
        About: () => AboutRoute(pokemon),
        BaseStats: () => BaseStatsRoute(pokemon.Stats),
        Moves: () => MovesStatsRoute(pokemon.Moves)
    });

    useEffect(() => {

    });
    return (
        <View style={styles.container}>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={initialLayout}
                renderTabBar={renderTabBar}
            // scrollEnabled={true}
            />
        </View>);
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    aboutView: {
        marginTop: 5
    },
    pokeName: {
        textTransform: 'capitalize',
        fontSize: 25,
        fontWeight: "bold",
        color: '#fafafa',
        textAlign: 'center',
        margin: 10
    },
    tabBar: {
        backgroundColor: 'transparent',
        elevation: 0
    },
    tabIndicator: {
        backgroundColor: 'white'
    }

});

export default PokeTabComp;