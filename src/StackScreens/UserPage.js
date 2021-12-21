import React, { useCallback, useEffect, useState } from "react";
import { Alert, useWindowDimensions } from 'react-native';
import { View, Text, Pressable } from "react-native";
import { Auth } from "../firebaseConfig";

const UserPage = ({ navigation }) => {
    const [logged, setLogged] = useState(false)
    const { width } = useWindowDimensions()

    const auth = Auth.getAuth()
    useEffect(() => {
        const auth_ = Auth.onAuthStateChanged(auth, (user) => {
            user ? setLogged(true) : ""
            // console.log("왜 여러번 출력하지? 여기 다시 생각해보기")
        })
        return () => {
            setLogged(false)
            auth_()
        }
    }, []) //Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function. 해결이 안됨

    const LogOut_Alert = useCallback(() => {
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
            ]
        )
    }, [])

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
            <View style={{ flex: 1, width: width - 20, justifyContent: 'center' }}>
                {logged ?
                    <Pressable
                        style={{ padding: 10, marginTop: 10, width: 100 }}
                        onPress={LogOut_Alert}>
                        <Text style={{ color: '#6a3cbc', fontSize: 20, textAlign: 'center' }}>로그아웃</Text>
                    </Pressable>
                    :
                    <Pressable
                        style={{ padding: 10, marginTop: 10, width: 100 }}
                        onPress={() => navigation.navigate('login')}>
                        <Text style={{ color: '#6a3cbc', fontSize: 20, textAlign: 'center' }}>로그인</Text>
                    </Pressable>
                }

            </View>
            <View
                style={{ flex: 6, width: width - 20, alignItems: 'center', }}>
                <Text>
                    공지 공간
                </Text>
            </View>
        </View >
    )
}

export default UserPage