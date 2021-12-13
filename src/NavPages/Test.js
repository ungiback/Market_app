import React, { useCallback, useEffect, useReducer, useState } from "react";
import { View, Text, Pressable, useWindowDimensions, Alert } from "react-native";
import OrderListItem from "../conponents/OrderListItem";
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from "styled-components";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useTheme, useFocusEffect } from '@react-navigation/native'
import { Auth, Store } from "../firebaseConfig";
import { useDispatchContxt, useStateContxt } from "../conponents/BasketProvider";

const api = [
    {
        name: "딸기",
        count: 4,
        price: 1000,
    },
    {
        name: "수박",
        count: 5,
        price: 1000,
    },
    {
        name: "참외",
        count: 6,
        price: 1000,
    }, {
        name: "사과",
        count: 8,
        price: 1000,

    }
]
const Title = styled.View`
    flex:0.4;
    align-items:center;
    justify-content:center;
`;
const Middle = styled.View`
    flex:2;
    align-items:center;
    padding-top:30px;
`;
const Tail = styled.View`
    flex:0.4;
    align-items:center;
    justify-content:center;
    margin-bottom:${({ h }) => h}px;
`;


const Test = ({ navigation }) => {
    const { width } = useWindowDimensions()
    const bar_height = useBottomTabBarHeight()
    const { colors } = useTheme()
    const [logged, setLogged] = useState()

    // const state = useStateContxt()
    // const dispatch = useDispatchContxt()

    const today = new Date()
    const order_DATE = today.getFullYear() + '.' + (today.getMonth() + 1) + '.' + today.getDate()
    const todate = () => {
        console.log(order_DATE)
    }
    const firebtn = async () => {

        const docRef = Store.doc(Store.getFirestore(), "Order", "lvLBvCAMzYbnDs2JbMiX5Z1KoK72")
        try {
            const docSnap = await Store.getDoc(docRef)
            if (docSnap.exists()) {

            } else {

            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', }}>
            <Title>
                <Pressable
                    style={{ backgroundColor: colors.button_color, width: width - 20 }}
                    onPress={() => firebtn()}>
                    <Text style={{ fontSize: 24, textAlign: 'center' }}>
                        호출
                    </Text>
                </Pressable>
                <Pressable
                    style={{ backgroundColor: colors.button_color, width: width - 20, marginTop: 30 }}
                    onPress={() => todate()}>
                    <Text style={{ fontSize: 24, textAlign: 'center' }}>
                        날짜
                    </Text>
                </Pressable>
            </Title>
            {/* <Middle>
                {state.map((a, idx) => <OrderListItem key={idx} list={a} />)}
            </Middle> */}
            <Tail h={bar_height}>
                <Pressable onPress={() => dispatch({ type: 'add', item: { name: 'imback', count: 21, price: 1200 } })}>
                    <Text style={{ fontSize: 30 }}>추가</Text>
                </Pressable>
                <Pressable
                    style={{ backgroundColor: colors.button_color, width: width - 20 }}
                    onPress={() => OrderBtn(navigation, logged)}>
                    <Text style={{ fontSize: 24, textAlign: 'center' }}>
                        b
                    </Text>
                </Pressable>
            </Tail>
        </SafeAreaView >
    )
}

export default Test