import React, { useEffect, useState, useCallback } from "react";
import { View, Text, Pressable, useWindowDimensions, Alert } from "react-native";
import OrderListItem from "../conponents/OrderListItem";
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from "styled-components";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useTheme, useFocusEffect } from '@react-navigation/native'
import { Auth } from "../firebaseConfig";

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

const OrderPage = ({ navigation, route }) => {
    const { params: { basket } } = route
    const { width } = useWindowDimensions()
    const bar_height = useBottomTabBarHeight()
    const { colors } = useTheme()
    const [list, setList] = useState([])
    const [logged, setLogged] = useState()
    useEffect(() => {
        setList(...list, basket)
    }, [])

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
    );

    const OrderBtn = useCallback((navigation, logged) => {
        if (logged) {
            console.log("firebase 연동해야됨.")
        } else {

            Alert.alert("로그인", '로그인필요함.', [
                { text: '확인', style: 'cancel' },
                //로그인 화면으로 이동 하기 할것 
            ])
        }
    }, [])

    const onDeleteBtn = (id) => {
        setList(list.filter(li => li.id !== id))
    }
    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', }}>
            <Title>
                <Text style={{ fontSize: 30, }}>a</Text>
            </Title>
            <Middle>
                {list.map((a, idx) => <OrderListItem key={idx} list={a} onDeleteBtn={(id) => onDeleteBtn(id)} />)}
            </Middle>
            <Tail h={bar_height}>
                <Pressable
                    style={{ backgroundColor: colors.button_color, width: width - 20 }}
                    onPress={() => OrderBtn(navigation, logged)}>
                    <Text style={{ fontSize: 24, textAlign: 'center' }}>
                        b
                    </Text>
                </Pressable>
            </Tail>
        </SafeAreaView>
    )
}

export default OrderPage