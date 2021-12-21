import { useTheme } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import { View, Text, Pressable } from "react-native"
import Rb_Input from "../conponents/Rb_Input";
import { Auth, Store } from "../firebaseConfig";

const SignUp = ({ navigation }) => {
    const [newUser, setNewUser] = useState({
        email: "",
        password: "",
        address: ""
    })
    const passwordRef = useRef()
    // const passwordConfirmRef = useRef()
    const addressRef = useRef()
    const { colors } = useTheme()
    const finish = async () => {
        try {
            const userCredential = Auth.createUserWithEmailAndPassword(Auth.getAuth(), newUser.email, newUser.password)
            if (userCredential) {
                navigation.navigate('UserPage')
                await Store.setDoc(Store.doc(Store.getFirestore(), "Order", (await userCredential).user.uid), {
                    address: newUser.address,
                    order_history:[]
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <View style={{ flex: 0.5, backgroundColor: '#d56073' }}>

            </View>
            <View style={{ flex: 3, alignItems: 'center', paddingTop: 70 }}>
                <Rb_Input
                    label="이메일"
                    value={newUser.email}
                    secureTextEntry={false}
                    onChangeText={text => setNewUser({ ...newUser, email: text })}
                    returnKeyType="next"
                    onSubmitEditing={() => passwordRef.current.focus()}
                />
                <Rb_Input
                    ref={passwordRef}
                    label="비밀번호"
                    value={newUser.password}
                    secureTextEntry={true}
                    onChangeText={text => setNewUser({ ...newUser, password: text })}
                    returnKeyType="next"
                    onSubmitEditing={() => addressRef.current.focus()}
                />
                <Rb_Input
                    ref={addressRef}
                    label="주소"
                    value={newUser.address}
                    secureTextEntry={false}
                    onChangeText={text => setNewUser({ ...newUser, address: text })}
                    returnKeyType="done"
                />
                <Pressable
                    style={{ backgroundColor: colors.button_color, borderRadius: 15, width: 250, marginBottom: 10 }}
                    onPress={finish}>
                    <Text style={{ fontSize: 20, textAlign: 'center' }}>
                        완료
                    </Text>
                </Pressable>
            </View>
        </View>
    )
}

export default SignUp