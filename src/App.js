import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './TabNavigator';
import { theme } from './theme';
import BasketProvider from './conponents/BasketProvider';

const App = () => {
    return (
        <NavigationContainer theme={theme}>
            <BasketProvider>
                <TabNavigator />
            </BasketProvider>
        </NavigationContainer>

    )
}

export default App