import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screen/HomeScreen';
import PokeScreen from './src/screen/PokeScreen';
import GenerationScreen from './src/screen/Generations'
import AllPokeScreen from './src/screen/AllPokemon'
import rootReducer from './src/reducers';
import { Provider } from 'react-redux';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStore } from 'redux';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        title: 'Pokedéx',
        headerStyle: {
          backgroundColor: '#D53A47',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        }
      }}
    >
      <Stack.Screen key='Home' name='Home' component={HomeScreen}
      />
      <Stack.Screen key='Pokemon' name='Pokemon' component={PokeScreen}
      />
      <Stack.Screen key='AllPokemon' name='AllPokemon' component={AllPokeScreen}
      />
      <Stack.Screen key='Generation' name='Generation' component={GenerationScreen}
      />
    </Stack.Navigator>
  );
}

function HomeDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerStyle={{
        backgroundColor: 'white',
        width: 240,
      }}
      drawerContentOptions={{
        activeTintColor: '#e91e63',
        itemStyle: { marginVertical: 30 },
      }}

    >
      <Drawer.Screen name="Home" component={HomeStack} />
    </Drawer.Navigator>
  );
}
const store = createStore(rootReducer);
const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer theme={{ colors: { background: '#424242' } }}>
        <HomeDrawer />
      </NavigationContainer>
    </Provider>
  );
};

export default App;