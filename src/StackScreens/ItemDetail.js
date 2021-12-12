import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs"
import React, { useCallback, useEffect, useMemo, useState } from "react"
import { View, Text, Image, useWindowDimensions, Pressable, Alert, LogBox } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context"
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useTheme } from "@react-navigation/native";
import styled from 'styled-components'
import { useDispatchContxt } from "../conponents/BasketProvider";
import * as Random from 'expo-random';


LogBox.ignoreLogs(['Setting a timer']);  // 음... web전용으로 firebase랑 연동을 하는데 expo는 web전용 firebase의 느린 방식을 못 기다린다는 것이라고 해서 'Setting a timer...'라고 뜨는 경고를 무시를 설정을 했더니 됐다. 

const UpContainer = styled.View`
    flex:1;
    width:${({ w }) => w - 20}px;
    align-items:center;
`;
const DownContainer = styled.View`
    flex:2;
    width:${({ w }) => w - 20}px;
`;
const CountContainer = styled.View`
    flex-direction:row;
    border-width: 1px;
    border-radius: 20px;
    justify-content:center;
`;
const Backbtn = styled.Pressable`
    align-items:flex-start;
    width:100%;
    position:absolute;
`;
const AddContainer = styled.View`
    flex:1;
    flex-direction:row;
    justify-content:center;
    align-items:center;
`;
const Addbtn = styled.Pressable`
    width:100%;
    background-color:${({ color }) => color};
    opacity:${({ count }) => count > 0 ? 1 : 0.3};
`;


const ItemDetail = ({ route, navigation }) => {
    const { params: { info } } = route
    const barheight = useBottomTabBarHeight()
    const { width } = useWindowDimensions()
    const [count, setCount] = useState()
    const { colors } = useTheme()
    useEffect(() => {
        setCount(0)
    }, [])
    const PlmaBtn = useCallback((plus, value) => {
        plus ? setCount(value + 1) : value > 0 ? setCount(value - 1) : ""
    }, [])
    const dispatch = useDispatchContxt()
    const hold = () => {
        try {
            const hold_num = `${info.name[0]}-${Random.getRandomBytes(1)[0]}`
            navigation.navigate('Home')
            dispatch({ type: 'add', item: { name: info.name, count, price: info.price, item_id: info.id, hold_num } })
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <SafeAreaView style={{
            flex: 2,
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginBottom: barheight,
        }}>

            <UpContainer w={width}>
                <Backbtn onPress={() => navigation.pop()}>
                    <Ionicons name="arrow-back" size={30} color="black" />
                </Backbtn>
                <Image source={info.img} style={{ height: "100%" }} />
            </UpContainer>


            <DownContainer w={width}>
                <View style={{ flex: 4, }}>
                    <Text style={{ fontSize: 35, fontWeight: '600', borderBottomWidth: 3, textAlign: 'center' }}>{info.name}</Text>
                    <Text>
                        {info.infomation}
                    </Text>
                </View>
                <CountContainer>
                    <AntDesign name="plus" size={24} color="black" onPress={() => PlmaBtn('plus', count)} />
                    <Text style={{ marginRight: 30, marginLeft: 30, textAlign: 'center' }}>
                        {count}
                    </Text>
                    <AntDesign name="minus" size={24} color="black" onPress={() => PlmaBtn('', count)} />
                </CountContainer>
                <AddContainer>
                    <Addbtn
                        count={count}
                        color={colors.button_color}
                        onPress={() => count > 0 ? hold() : ""}>
                        <Text style={{ textAlign: 'center', fontSize: 24, }}>
                            {count}개 담기
                        </Text>
                        <Text style={{ textAlign: 'center', fontSize: 14, }}>
                            {parseInt(count * info.price)}원
                        </Text>
                    </Addbtn>
                </AddContainer>
            </DownContainer>

        </SafeAreaView >
    )
}

export default ItemDetail