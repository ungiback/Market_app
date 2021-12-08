import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import styled from 'styled-components'
import Rb_Input from "../conponents/Rb_Input";
import { Auth } from "../firebaseConfig";


const Container = styled.View`
    flex:1;
    justify-content:center;
    align-items:center;
`;
const Login = ({ navigation }) => {
    const [id, setId] = useState("")
    const [password, setPassword] = useState("")
    const auth = Auth.getAuth()
    const SignIn = async (id, password, navigation) => {
        try {
            const confirm = await Auth.signInWithEmailAndPassword(auth, id, password)
            if (confirm) {
                navigation.pop()
            }
        } catch (error) {
            console.log(error.code)
        }

    }
    return (
        <Container>
            <Rb_Input
                label="로그인"
                value={id}
                onChangeText={text => setId(text)}
                secureTextEntry={false} />
            <Rb_Input
                label="비밀번호"
                value={password}
                onChangeText={text => setPassword(text)}
                secureTextEntry={true} />
            <Pressable style={{ backgroundColor: '#ffe8df', borderRadius: 15, width: '100%' }}
                onPress={() => SignIn(id, password, navigation)}>
                <Text style={{ fontSize: 30, textAlign: 'center' }}>Sign in</Text>
            </Pressable>

        </Container>
    )
}

export default Login