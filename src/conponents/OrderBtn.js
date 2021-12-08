import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { View } from "react-native";
import { Avatar, Badge, } from "react-native-elements";
import { useNavigation } from '@react-navigation/native';

const Bk_btn = styled.View`
    position:absolute;
    align-items:flex-end;
    justify-content:flex-end;
    width:100%;
    height:100%;
    padding-bottom:5px;
    padding-right:5px;
`;

const OrderBtn = ({ OrderPage_move, cnt }) => {
    return (
        <Bk_btn>
            <View>
                <Avatar
                    size="medium"
                    rounded
                    overlayContainerStyle={{ backgroundColor: '#bfd8d5' }}
                    activeOpacity={0.7}
                    onPress={cnt > 0 ? OrderPage_move : ""}
                    icon={{ name: 'shopping-basket', type: 'font-awesome' }}
                />
                {parseInt(cnt) > 0 ?
                    <Badge
                        value={cnt}
                        status="primary"
                        containerStyle={{ position: 'absolute', top: -1, right: 6, }}
                    /> : <></>}
            </View>
        </Bk_btn>
    )
}

export default OrderBtn;