import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './TabNavigator';
import { theme } from './theme';
import BasketProvider from './conponents/BasketProvider';

const App = () => {
    return (
        <NavigationContainer theme={theme}>
            <TabNavigator />
        </NavigationContainer>

    )
}

export default App