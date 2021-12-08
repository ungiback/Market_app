import React from "react";
import { Text, useWindowDimensions } from 'react-native'
import styled from "styled-components";

const Container = styled.View`
    flex-direction:row;
    margin-bottom:10px;
`;
const LeftPress = styled.Pressable`
    flex:1;
    align-items:center;
    justify-content:center;
    margin-right:5px;
    border-radius:10px;
    border-width:1px;
`;
const RightPress = styled.Pressable`
    flex:1;
    align-items:center;
    justify-content:center;
    margin-left:5px;
    border-radius:10px;
    border-width:1px;
`;
const ProductImag = styled.Image`
    flex:2;
    height:${({ h }) => h}px;
    width:97%;
    margin-top:3px;
    border-radius:10px;
`;
const Description = styled.View`
    flex:1;
    align-items:center;
`;
const Item = ({ left, right, onMove }) => {
    const { height } = useWindowDimensions()
    return (
        <Container>
            <LeftPress onPress={() => onMove(left)}>
                <ProductImag h={parseInt(height / 3)} source={left?.img} />
                <Description>
                    <Text style={{ fontSize: 25 }}>{left?.name}</Text>
                    <Text>{left.price}원</Text>
                </Description>
            </LeftPress>

            <RightPress onPress={() => onMove(right)}>
                <ProductImag h={parseInt(height / 3)} source={right?.img} />
                <Description>
                    <Text style={{ fontSize: 25 }}>{right?.name}</Text>
                    <Text>{right.price}원</Text>
                </Description>
            </RightPress>
        </Container>
    )
}

export default Item