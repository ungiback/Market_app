import React, { useEffect, useState } from "react";
import { Text, View } from 'react-native'
import styled from "styled-components";

const Container = styled.View`
    background-color:white;
    flex-direction:row;
`
const OrderPage = ({ list }) => {
    const [cnt, setCnt] = useState()
    useEffect(() => {
        setCnt(list.count)
    }, [])
    return (
        <Container>
            <Text>{list.name}{cnt}</Text>
        </Container>
    )
}

export default OrderPage