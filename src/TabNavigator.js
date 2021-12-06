import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome } from '@expo/vector-icons';
import Test from './NavPages/Test';
import { Home, Item, ItemDetail, Login, UserPage } from "./StackScreens";
import { useTheme } from '@react-navigation/native'

const Stack = createStackNavigator()

const HomeItemStack = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
        }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Item" component={Item} />
            <Stack.Screen name="Detail" component={ItemDetail} />
        </Stack.Navigator>
    )
}

const UserStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="UserPage" component={UserPage} />
            <Stack.Screen name="login" component={Login} />
        </Stack.Navigator >
    )
}

const TabNavigator = () => {
    const Tab = createBottomTabNavigator()
    const { colors } = useTheme()
    const IconSet = ({ focused, name }) => {
        return (
            <FontAwesome
                name={name}
                size={focused ? 30 : 24}
                color={focused ? colors.focused_color : colors.unfocused_color} />
        )
    }
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: colors.focused_color,
                tabBarInactiveTintColor: colors.unfocused_color,
                tabBarHideOnKeyboard: true,
                headerShown: false,
                tabBarStyle: {
                    position: 'absolute',
                    shadowColor: '#EADEB8',
                }
            }}>


            <Tab.Screen name="Test" component={Test}
                options={{
                    tabBarIcon: props => IconSet({
                        ...props,
                        name: 'list',
                    }),
                }} />
            <Tab.Screen name="User" component={UserStack}
                options={{
                    tabBarIcon: props => IconSet({
                        ...props,
                        name: 'user',
                    }),
                    // tabBarBadge: 19
                }} />
            <Tab.Screen name="List" component={HomeItemStack}
                options={{
                    tabBarIcon: props => IconSet({
                        ...props,
                        name: 'list',
                    }),
                }} />

        </Tab.Navigator>
    )
}

export default TabNavigator