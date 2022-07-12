import { useState, useRef, useEffect } from "react";

import { TouchableOpacity, StyleSheet, Text, View, TextInput, Animated } from "react-native";

export const RegisterScreen = ({ navigation }) => {

    const registerButtonAnimationValue = useRef(new Animated.Value(0)).current;

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [validFields, setValidFields] = useState(false)


    const validateLogin = () => {
        console.log("validation goes here")

        registerUser()
    }

    const registerUser = () => {
        console.log("registration goes here")
    }

    useEffect(() => {

        Animated.loop(
            Animated.sequence([
                Animated.timing(registerButtonAnimationValue, {
                    toValue: 1,
                    duration:300,
                    useNativeDriver: true,
                }),
                Animated.timing(registerButtonAnimationValue, {
                    toValue: 0,
                    duration:300,
                    useNativeDriver: true,
                })
            ])
        ).start()


    }, [])

    console.log(validFields, " valid fields")
    return (
        <View style={styles.app}>

            <View style={{ border: "1px solid red", padding: 30 }}>
                <Text style={styles.inputLabels}>Email</Text>
                <TextInput
                    autoFocus
                    value={email}
                    onChangeText={(text) => {
                        setEmail(text)
                        
                    }}

                    onFocus={() => {
                        console.log('Username focused');
                    }}
                    style={styles.inputFields}
                />

                <Text style={styles.inputLabels}>Password</Text>
                <TextInput
                    autoFocus
                    value={password}
                    secureTextEntry={true}
                    onChangeText={(text) => {
                        setPassword(text)
                      
                    }}
                    onFocus={() => {
                        console.log('Password focused');
                    }}
                    style={styles.inputFields}
                />
            </View>
            <View style={{}}>

                <Animated.View style={{
                    marginVertical: 20,
                    borderRadius: 20,
                }}>
                    <TouchableOpacity style={styles.button} onPress={() => validateLogin()}>
                        <Text style={{ color: "white", fontWeight: "bold" }}> Register user </Text>
                    </TouchableOpacity>
                </Animated.View>

                <TouchableOpacity style={[styles.button, { backgroundColor: "white", backgroundImage: "", border: "1px solid red" }]} onPress={() => navigation.goBack()}>
                    <Text style={{ color: "black", fontWeight: "bold" }}> Login </Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    app: {
        marginHorizontal: "auto",
        width: "100%",
        height: "100vh",
        backgroundColor: "white",
        justifyContent: 'center',
        alignItems: 'center',
        display: "flex",
    },
    inputFields: {
        width: 300,
        padding: 20,
        outlineStyle: "none",
        border: "1px solid red"
    },
    inputLabels: {
        fontWeight: "bold"
    },
    button: {
        margin: 0,
        textAlign: "center",
        width: 300,
        padding: 15,
        fontWeight: "bold",
        borderRadius: 15,
        backgroundImage: "linear-gradient(to right, #D31027 0%, #EA384D  51%, #D31027  100%);",
        marginVertical: 0,
    },

});