import React, { useEffect, useState, useCallback } from "react";
import { View, Text, Pressable, useWindowDimensions, Alert, ScrollView } from "react-native";
import OrderListItem from "../conponents/OrderListItem";
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from "styled-components";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useTheme, useFocusEffect } from '@react-navigation/native'
import { Auth, Store } from "../firebaseConfig";
import { useDispatchContxt, useStateContxt } from "../conponents/BasketProvider";

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

const OrderPage = ({ navigation }) => {
    const { width } = useWindowDimensions()
    const bar_height = useBottomTabBarHeight()
    const { colors } = useTheme()
    const [logged, setLogged] = useState()

    const state = useStateContxt()
    const dispatch = useDispatchContxt()
    let total = 0
    state.map(item => total += item.count * item.price)

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

    const OrderBtn = useCallback(async (navigation, logged) => {
        if (logged) {
            console.log("firebase 연동해야됨.")
            const User = Auth.getAuth().currentUser
            try {
                const orderRef = Store.doc(Store.getFirestore(), 'Order', User.uid)
                await Store.setDoc(orderRef, {
                    주문자: {
                        주소: " ",
                        이름: " ",
                        email: " ",
                    },
                    내역: {
                        주문날짜1: [
                            { name: "망고", cnt: 2 },
                            { name: "수박", cnt: 2 },
                        ],
                        주문날짜2: [
                            { name: "오렌지", cnt: 4 },
                            { name: "사과", cnt: 5 },
                        ],
                        주문날짜3: [
                            { name: "딸기", cnt: 12 },
                            { name: "체리", cnt: 7 },
                        ],
                    }

                })
            } catch (error) {
                console.log(error)
            }
        } else {
            Alert.alert("로그인", '로그인필요함.', [
                { text: '확인', style: 'cancel' },
                //로그인 화면으로 이동 하기 할것 
            ])
        }
    }, [])

    const onDeleteBtn = (id) => {
        dispatch({ type: 'delete', put_num: id })
    }
    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', }}>
            <Title>
                <Text style={{ fontSize: 30, }}>바구니</Text>
            </Title>
            <Middle>
                <ScrollView>
                    {state.map((a, idx) => <OrderListItem key={idx} list={a} num={idx}
                        onDeleteBtn={(id) => onDeleteBtn(id)}
                    />)}
                </ScrollView>
            </Middle>
            <Tail h={bar_height}>
                <Text style={{ fontSize: 30 }}>
                    합계 : {total}원
                </Text>
                <Pressable
                    style={{ backgroundColor: colors.button_color, width: width - 20 }}
                    onPress={() => OrderBtn(navigation, logged)}>
                    <Text style={{ fontSize: 24, textAlign: 'center' }}>
                        주문하기
                    </Text>
                </Pressable>
            </Tail>
        </SafeAreaView>
    )
}

export default OrderPage