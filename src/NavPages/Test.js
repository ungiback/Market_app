import React, { useState } from "react";
import { View, Text, Pressable, useWindowDimensions } from "react-native";
import OrderPage from "../conponents/OrderPage";
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from "styled-components";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useTheme } from '@react-navigation/native'

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
    background-color:#92cce1;
`;
const Tail = styled.View`
    flex:0.4;
    align-items:center;
    justify-content:center;
    margin-bottom:${({ h }) => h}px;
`;

const Test = () => {
    const { width } = useWindowDimensions()
    const bar_height = useBottomTabBarHeight()
    const { colors } = useTheme()
    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', }}>
            <Title>
                <Text style={{ fontSize: 30, }}>주문할목록</Text>
            </Title>
            <Middle>
                {api.map((a, idx) => <OrderPage key={idx} list={a} />)}
            </Middle>
            <Tail h={bar_height}>
                <Pressable style={{ backgroundColor: colors.button_color, width: width - 20 }} onPress={() => console.log("주문완료")}>
                    <Text style={{ fontSize: 24, textAlign: 'center' }}>
                        주문하기
                    </Text>
                </Pressable>
            </Tail>
        </SafeAreaView>
    )
}

export default Test