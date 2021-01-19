import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screen/HomeScreen';
import PokeScreen from './src/screen/PokeScreen';
import GenerationScreen from './src/screen/Generations'
import SearchScreen from "./src/screen/SearchScreen";
import rootReducer from './src/reducers';
import { MenuProvider } from 'react-native-popup-menu';
import { Provider } from 'react-redux';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStore } from 'redux';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
//JSx Code For StackKNavigator.
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
          textTransform: 'capitalize',
          fontWeight: 'bold',
        }
      }}
    >
      <Stack.Screen key='Home' name='Home' component={HomeScreen}
      />
      <Stack.Screen key='Pokemon' name='Pokemon' component={PokeScreen}
      />
      <Stack.Screen key='Generation' name='Generation' component={GenerationScreen}
      />
      <Stack.Screen key='Search' name='Search' component={SearchScreen}
      />
    </Stack.Navigator>
  );
}
//Drawer Navigator Code. 
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
      <MenuProvider>
        <NavigationContainer theme={{ colors: { background: '#424242' } }}>
          <HomeDrawer />
        </NavigationContainer>
      </MenuProvider>
    </Provider>
  );
};

export default App;