import React, { useEffect, useState } from "react";
import { Text, useWindowDimensions, View } from 'react-native'
import styled from "styled-components";
import { AntDesign } from '@expo/vector-icons';


const Container = styled.View`
    background-color:#F9F3DF;
    flex-direction:row;
    width:${({ w }) => w - 20}px;
    margin-bottom:4px;
    padding:10px;
    border-radius:10px;
`;
const OrderListItem = ({ list, onDeleteBtn }) => {
    const [cnt, setCnt] = useState()
    const { width } = useWindowDimensions()
    useEffect(() => {
        setCnt(list.count)
    }, [])
    const PlmaBtn = (plus, value) => {
        plus ? setCnt(value + 1) : value > 1 ? setCnt(value - 1) : ""
    }
    return (
        <Container w={width}>
            <View style={{ flex: 2, justifyContent: 'center' }}>
                <Text style={{ fontSize: 15 }}>{list.name}</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', borderWidth: 1, borderRadius: 10, padding: 5, justifyContent: 'center', marginRight: 13 }}>
                <AntDesign name="plus" size={24} color="black" onPress={() => PlmaBtn('plus', cnt)} />
                <Text style={{ flex: 0.5, textAlign: 'center' }}>
                    {cnt}
                </Text>
                <AntDesign name="minus" size={24} color="black" onPress={() => PlmaBtn('', cnt)} />
            </View>
            <AntDesign name="delete" size={24} color="black" onPress={() => onDeleteBtn(list.id)} />
        </Container>
    )
}

export default OrderListItem