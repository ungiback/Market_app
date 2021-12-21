import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { LogBox } from 'react-native';
import TabNavigator from './TabNavigator';
import { theme } from './theme';
import BasketProvider from './conponents/BasketProvider';
LogBox.ignoreLogs(['Setting a timer']);
LogBox.ignoreLogs(['AsyncStorage']);
const App = () => {
    return (
        <NavigationContainer theme={theme}>
            <TabNavigator />
        </NavigationContainer>

    )
}

export default App