import { useState, useRef, useEffect } from "react"
import { useDispatch } from 'react-redux'
import { TextInput, TouchableOpacity, StyleSheet, Text, View, Animated } from "react-native";
import { token, userInfo } from "../App";

export const LoginScreen = ({ navigation }) => {

    const [email, setEmail] = useState("rach1524@student.ju.se")
    const [password, setPassword] = useState("ee")
    const [loginError, setLoginError] = useState(false)
    const [disabledInteraction, setDisabledInteraction] = useState(false)

    const [hiddenPassword, setHiddenPassword] = useState(true)

    const loginErrorAnimation = useRef(new Animated.Value(0)).current;
    const loginSuccessAnimation = useRef(new Animated.Value(0)).current;

    const dispatch = useDispatch()

    const sendLogin = () => {

        setDisabledInteraction(true)

        fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded", "Accept": "*/*"
            },
            body: `email=${email}&password=${password}`
        }).then(response => {

            if (response.status === 200) {
                return response.json()
            } else {
                throw new Error(response.status)
            }
        })
            .then(data => {

                Animated.timing(loginSuccessAnimation, {

                    toValue: 1,
                    duration: 2000,
                    useNativeDriver: true

                }).start(({ finished }) => {

                    dispatch(token(data.id_token))
                    dispatch(userInfo({ email: data.email, score: data.score }))
                    setDisabledInteraction(false)

                })

            })
            .catch((error) => {

                setDisabledInteraction(false)

                if (error.message === "400") {
                    setLoginError(true)
                } else {
                    console.log("Network error")
                }

            });
    }

    useEffect(() => {
        if (loginError) {

            Animated.sequence([

                Animated.timing(loginErrorAnimation, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true
                }),
                Animated.timing(loginErrorAnimation, {
                    toValue: 2,
                    duration: 300,
                    useNativeDriver: true
                }),
                Animated.timing(loginErrorAnimation, {
                    toValue: 3,
                    duration: 1000,
                    useNativeDriver: true
                }),
                Animated.timing(loginErrorAnimation, {
                    toValue: 4,
                    duration: 300,
                    useNativeDriver: true
                }),

            ]).start(({ finished }) => {
                loginErrorAnimation.setValue(0)
                setLoginError(false)
            })

        }
    })

    return (
        <Animated.View style={[styles.app, {
            opacity: loginSuccessAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0]
            }),
            transform: [{
                rotateZ: loginSuccessAnimation.interpolate({ inputRange: [0, 1], outputRange: [0 + "deg", 720 + "deg"] }),
            }]
        }
        ]}>

            <Animated.View style={{
                backgroundColor: loginErrorAnimation.interpolate({
                    inputRange: [1, 2, 3],
                    outputRange: ["white", "red", "white"]
                }),
                border: "1px solid red",
                padding: 30,

            }}>
                <Text style={styles.inputLabels}>Email</Text>
                <TextInput
                    editable={!loginError && !disabledInteraction}
                    autoFocus
                    value={email}
                    onChangeText={(text) => {
                        setEmail(text)
                    }}
                    onFocus={() => {
                        console.log('Username focused');
                    }}
                    style={[styles.inputFields, { border: "1px solid red", width: 365 }]}
                />

                <Text style={styles.inputLabels}>Password</Text>

                <View style={{ flexDirection: "row", border: "1px solid red" }}>
                    <TextInput
                        editable={!loginError && !disabledInteraction}
                        autoFocus
                        value={password}
                        secureTextEntry={hiddenPassword}
                        onChangeText={(text) => {
                            setPassword(text)
                        }}
                        onFocus={() => {
                            console.log('Password focused');
                        }}
                        style={styles.inputFields}

                    />

                    <TouchableOpacity onPressIn={() => {
                        setHiddenPassword(false)
                    }}
                        onPressOut={() => {
                            setHiddenPassword(true)
                        }}
                        disabled={loginError || disabledInteraction}
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: 10,
                            display: "flex"
                        }}
                    >
                        <Text style={{ fontSize: 10, fontWeight: "bold" }}>Show</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>

            <View style={{}}>
                <TouchableOpacity disabled={loginError || disabledInteraction} style={styles.button} onPress={() => sendLogin()}>
                    <Text style={{ color: "white", fontWeight: "bold" }}> Login </Text>
                </TouchableOpacity>

                <TouchableOpacity disabled={loginError || disabledInteraction} style={[styles.button, { backgroundColor: "white", backgroundImage: "", border: "1px solid red" }]} onPress={() => navigation.navigate("Register")}>
                    <Text style={{ color: "black", fontWeight: "bold" }}> Don't have an account? Register here! </Text>
                </TouchableOpacity>

                {
                    loginError && (
                        <Animated.Text style={{
                            textAlign: "center", color: "red", fontWeight: "bold", opacity: loginErrorAnimation.interpolate({
                                inputRange: [0, 1, 4],
                                outputRange: [0, 1, 0]
                            })
                        }}> Wrong email or password </Animated.Text>
                    )
                }
            </View>
        </Animated.View>
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

    },
    inputLabels: {
        fontWeight: "bold"
    },
    button: {
        textAlign: "center",
        width: 300,
        padding: 15,
        fontWeight: "bold",
        borderRadius: 20,
        backgroundImage: "linear-gradient(to right, #D31027 0%, #EA384D  51%, #D31027  100%);",
        marginVertical: 10,
    },

})