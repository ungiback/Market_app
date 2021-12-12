import React, { useCallback, useEffect, useState } from "react";
import { Text, useWindowDimensions, View } from 'react-native'
import styled from "styled-components";
import { AntDesign } from '@expo/vector-icons';
import { useDispatchContxt } from "./BasketProvider";


const Container = styled.View`
    background-color:#F9F3DF;
    flex-direction:row;
    width:${({ w }) => w - 20}px;
    margin-bottom:4px;
    padding:10px;
    border-radius:10px;
`;
const OrderListItem = ({ num, list, onDeleteBtn }) => {
    const { width } = useWindowDimensions()
    // const [cnt, setCnt] = useState()
    // useEffect(() => {
    //     setCnt(list.count)
    // }, [list])
    // $const PlmaBtn = useCallback((plus, value) => {
    //     plus ? setCnt(value + 1) : value > 1 ? setCnt(value - 1) : ""
    // }, [])$
    // const dispatch = useDispatchContxt()
    // // const PlmaBtn = useCallback((plus, value) => {
    // //     plus ? dispatch({ type: 'Item_Cnt_Add', id: 5, num }) : value > 1 ? setCnt(value - 1) : ""
    // // }, [])
    return (
        <Container w={width}>

            <View style={{ flex: 2, justifyContent: 'center' }}>
                <Text style={{ fontSize: 15 }}>
                    {num + 1}.{list.name}
                </Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', borderWidth: 1, borderRadius: 10, padding: 5, justifyContent: 'center', marginRight: 13 }}>
                {/* <AntDesign name="plus" size={24} color="black" onPress={() => PlmaBtn('plus', cnt)} />
                <Text style={{ flex: 0.5, textAlign: 'center' }}>
                    {cnt}
                </Text>
                <AntDesign name="minus" size={24} color="black" onPress={() => PlmaBtn('', cnt)} /> */}
                <Text>
                    {list.count} 개
                </Text>
            </View>
            <AntDesign name="delete" size={24} color="black"
                onPress={() => onDeleteBtn(list.hold_num)}
            />
        </Container>
    )
}

export default OrderListItem