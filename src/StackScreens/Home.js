import React, { useEffect, useState } from 'react';
import { View, useWindowDimensions, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import New_arr from '../../NewArr';
import { ApiTest } from '../ApiTest';
import Item from './Item';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useTheme } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import OrderBtn from '../conponents/OrderBtn';


const Home = ({ navigation, route }) => {
    const [lists, setLists] = useState([])
    const [basket, setBasket] = useState([])
    const { width } = useWindowDimensions()
    const tabBarHeight = useBottomTabBarHeight()
    const { colors } = useTheme()
    useEffect(() => {
        setLists(New_arr(ApiTest))
    }, [])

    useEffect(() => {
        if (route?.params?.new) {
            setBasket([...basket, route?.params?.new])
        }
    }, [route?.params])

    const pagemove = (info) => {
        navigation.navigate("Detail", { info })
    }
    const OrderPage_move = () => {
        navigation.navigate("OrderPage", { basket })
    }
    return (
        <SafeAreaView style={{
            flex: 1, alignItems: 'center',
        }}
        >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                <Ionicons name="basket-outline" size={100} color="black" />
            </View>
            <View style={{ flex: 5, width: width - 20, marginBottom: tabBarHeight, }}>
                <FlatList
                    data={lists}
                    renderItem={({ item }) => <Item left={item[0]} right={item[1]} onMove={(info) => pagemove(info)} />}
                    keyExtractor={(item) => item[0].id}
                    overScrollMode="never"
                    style={{ borderRadius: 10 }}
                />
                <OrderBtn OrderPage_move={() => OrderPage_move()} cnt={basket.length} />
            </View>
        </SafeAreaView >
    )
}

export default Home