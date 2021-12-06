import { useFocusEffect } from "@react-navigation/core";
import React, { useCallback, useState } from "react";
import { Alert, useWindowDimensions } from 'react-native';
import { View, Text, Pressable } from "react-native";
import { Auth } from "../firebaseConfig";

const UserPage = ({ navigation }) => {
    const [logged, setLogged] = useState(false)
    const { width } = useWindowDimensions()
    const auth = Auth.getAuth()
    useFocusEffect(
        useCallback(() => {
            Auth.onAuthStateChanged(auth, (user) => {
                if (user) {
                    console.log("왜 여러번 출력하지? 여기 다시 생각해보기")
                    setLogged(true)
                }
            })
        }, [])
    )

    const LogOut_Alert = () => {
        Alert.alert(
            "Sign-Out",
            "로그아웃 하시겠습니까?",
            [
                {
                    text: "취소",
                    style: "cancel"
                },
                {
                    text: "확인",
                    onPress: () => {
                        Auth.signOut(auth).then(() => {
                            setLogged(false)
                        })
                    }
                }
            ],
            { cancelable: false }
        )
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
            <View style={{ flex: 1, width: width - 20, justifyContent: 'center' }}>
                {logged ?
                    <Text style={{ padding: 10, marginTop: 10, width: 100 }} onPress={LogOut_Alert}>Sign Out</Text>
                    :
                    <Pressable
                        style={{ padding: 10, marginTop: 10, width: 100 }}
                        onPress={() => navigation.push('login')}>
                        <Text
                            style={{ color: '#6a3cbc', fontSize: 20, textAlign: 'center' }}>로그인</Text>
                    </Pressable>
                }
            </View>
            <View
                style={{ flex: 6, width: width - 20, justifyContent: 'center', alignItems: 'center' }}>
                <Text>
                    공지 공간
                </Text>
            </View>
        </View >
    )
}

export default UserPage