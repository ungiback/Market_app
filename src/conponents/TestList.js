import React from "react";
import { View, Text } from "react-native";

const TestList = ({ left, right }) => {
    return (
        <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>
                    {left?.name}
                </Text>
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>
                    {right?.name}
                </Text>
            </View>
        </View>
    )
}

export default TestList