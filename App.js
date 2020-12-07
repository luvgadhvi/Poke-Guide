import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screen/HomeScreen';
import BoilerScreen from './src/screen/BoilerPoint';
import PokeScreen from './src/screen/PokeScreen'
const Stack = createStackNavigator();

const Screens = {
  Home: HomeScreen,
  Boiler: BoilerScreen,
  Pokemon: PokeScreen
};

const App = () => {
  return (
    <NavigationContainer >
      <Stack.Navigator
        screenOptions={{
          title: 'Pokedex',
          headerStyle: {
            backgroundColor: '#D53A47',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        {Object.entries({
          ...Screens,
        }).map(([name, component]) => (
          <Stack.Screen key={(name) => name} name={name} component={component} />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;