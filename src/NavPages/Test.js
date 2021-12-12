import React, { useCallback, useEffect, useReducer, useState } from "react";
import { View, Text, Pressable, useWindowDimensions, Alert } from "react-native";
import OrderListItem from "../conponents/OrderListItem";
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from "styled-components";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useTheme, useFocusEffect } from '@react-navigation/native'
import { Auth } from "../firebaseConfig";
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

    useFocusEffect(
        useCallback(() => {
            const auth = Auth.getAuth()
            Auth.onAuthStateChanged(auth, (user) => {
                if (user) {
                    setLogged(true)
                }
                else {
                    setLogged(false)
                }
            })
        }, [])
    )
    const OrderBtn = useCallback((navigation, logged) => {
        if (logged) {
            console.log("로그인 됨.")
        } else {

            Alert.alert("로그인", '로그인필요함.', [
                { text: '확인', style: 'cancel' },
            ])
        }
    }, [])
    const state = useStateContxt()
    const dispatch = useDispatchContxt()
    console.log(state)
    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', }}>
            <Title>
                <Text style={{ fontSize: 30, }}>a</Text>
            </Title>
            <Middle>
                {state.map((a, idx) => <OrderListItem key={idx} list={a} />)}
            </Middle>
            <Tail h={bar_height}>
                <Pressable onPress={() => dispatch({ type: 'add', item: { name: 'imback', count: 21, price: 1200 } })}>
                    <Text style={{ fontSize: 30 }}>추가</Text>
                </Pressable>
                <Pressable onPress={() => console.log("아이템 빼기")}>
                    <Text style={{ fontSize: 30 }}>빼기</Text>
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