import React, { useCallback, useState } from "react";
import { View, Text, Pressable } from "react-native";
import styled from 'styled-components'
import Rb_Input from "../conponents/Rb_Input";
import { Auth } from "../firebaseConfig";
import { useIsFocused } from "@react-navigation/native";
import { useTheme } from "@react-navigation/native";

const Container = styled.View`
    flex:1;
    justify-content:center;
    align-items:center;
`;
const Login = ({ navigation }) => {
    const [id, setId] = useState("")
    const [password, setPassword] = useState("")
    const [errorMsg, setErrorMsg] = useState("")
    const auth = Auth.getAuth()
    const SignIn = useCallback(async (id, password, navigation) => {
        try {
            if (useIsFocused) {  //Can’t perform a React state update on an unmounted component. 에러 해결하기
                const confirm = await Auth.signInWithEmailAndPassword(auth, id, password)
                if (confirm) {
                    navigation.goBack()
                }
            }
        } catch (error) {
            switch (error.code) {
                case 'auth/invalid-email':
                    setErrorMsg("아이디 입력.")
                    break;
                case 'auth/user-not-found':
                    setErrorMsg("아이디 틀림.")
                    break;
                case 'auth/internal-error':
                    setErrorMsg("비밀번호 입력.")
                    break;
                case 'auth/wrong-password':
                    setErrorMsg("비밀번호 틀림.")
                default:
                    break;
            }
        }
    }, [])
    const { colors } = useTheme()
    return (
        <Container>
            <Rb_Input
                label="로그인"
                value={id}
                onChangeText={text => setId(text)}
                secureTextEntry={false}
                returnKeyType="next"
            />
            <Rb_Input
                label="비밀번호"
                value={password}
                onChangeText={text => setPassword(text)}
                secureTextEntry={true}
                returnKeyType="done" />
            <View style={{ padding: 10 }}>
                <Text style={{ fontSize: 17, color: '#eb586f' }}>{errorMsg}</Text>
            </View>
            <View >
                <Pressable style={{ backgroundColor: colors.button_color, borderRadius: 15, width: 250, marginBottom: 10 }}
                    onPress={() => SignIn(id, password, navigation)}>
                    <Text style={{ fontSize: 20, textAlign: 'center' }}>로그인</Text>
                </Pressable>
                <Pressable style={{ backgroundColor: colors.button_color, borderRadius: 15, width: 250 }}
                    onPress={() => navigation.navigate('signup')}>
                    <Text style={{ fontSize: 20, textAlign: 'center' }}>회원가입</Text>
                </Pressable>
            </View>
        </Container>
    )
}

export default Login