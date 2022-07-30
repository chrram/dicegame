import { useState, useRef, useEffect } from "react";

import { TouchableOpacity, StyleSheet, Text, View, TextInput, Animated } from "react-native";

export const RegisterScreen = ({ navigation }) => {

    const registerButtonAnimationValue = useRef(new Animated.Value(0)).current;
    const successRegistration = useRef(new Animated.Value(0)).current;
    const errorRegistration = useRef(new Animated.Value(0)).current;

    const [email, setEmail] = useState("rach1524@student.ju.se")
    const [password, setPassword] = useState("abcDEF4")

    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)

    const [firstTimeValidated, setFirstTimeValidated] = useState(false)

    const [hiddenPassword, setHiddenPassword] = useState(true)

    const [success, setSuccess] = useState(false)

    const validateLogin = () => {

        setFirstTimeValidated(true)

        const correctCredentials = email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) && password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)

        if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
            setEmailError(true)
        }

        if (!password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)) {
            setPasswordError(true)
        }

        if (correctCredentials) {
            registerUser()
        }

    }

    const registerUser = () => {

        const realRegister = true

        if (realRegister) {

            fetch('http://localhost:8080/users', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded", "Accept": "*/*"
                },
                body: `email=${email}&password=${password}`
            }).then(response => {

                if (response.status === 201) {
                    return response.json()
                } else {
                    throw new Error(response.status)
                }
            })
                .then(data => {
                    Animated.timing(successRegistration, {
                        toValue: 1,
                        duration: 2000,
                        useNativeDriver: true,
                    }).start(({ finished }) => {
                        navigation.goBack()
                    })
                })
                .catch((error) => {
                    if (error.message === "400") {

                    } else {
                        console.log("Network error")
                    }

                });

        } else {

            setSuccess(true)

            Animated.timing(successRegistration, {
                toValue: 1,
                duration: 2000,
                useNativeDriver: true,
            }).start(({ finished }) => {
                navigation.goBack()
            })
        }


    }

    useEffect(() => {

        Animated.loop(
            Animated.sequence([
                Animated.timing(registerButtonAnimationValue, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(registerButtonAnimationValue, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                })
            ])
        ).start()

    }, [])

    useEffect(() => {

        if (emailError || passwordError) {
            Animated.timing(errorRegistration, {
                toValue: 2,
                duration: 500,
                useNativeDriver: true,
            }).start()
        }

    }, [emailError, passwordError])


    const boxShake = {
        transform: ([{
            rotate: errorRegistration.interpolate({ inputRange: [0, 1, 2], outputRange: ['0deg', '-20deg', '0deg'] })
        }])
    }

    return (
        <View style={styles.app}>

            <Animated.View style={[emailError || passwordError ? boxShake : null,
            {
                borderColor: successRegistration.interpolate({ inputRange: [0, 1], outputRange: ["red", "green"] }),
                border: "1px solid red",
                padding: 30,
                backgroundColor: successRegistration.interpolate({
                    inputRange: [1, 2, 3],
                    outputRange: ["white", "green", "white"]
                }),
            }]}>
                <Text style={styles.inputLabels}>Email</Text>
                <TextInput
                    autoFocus
                    value={email}
                    onChangeText={(text) => {
                        setEmail(text)
                        if (firstTimeValidated && !text.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/))
                            setEmailError(true)
                        else if (firstTimeValidated && text.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
                            setEmailError(false)
                        }

                    }}
                    onFocus={() => {

                    }}
                    style={[styles.inputFields, { borderColor: "red", borderWidth: emailError ? 5 : 1, width: 360 }]}
                />

                <Text style={styles.inputLabels}>Password</Text>

                <View style={{ flexDirection: "row", borderColor: "red", borderWidth: passwordError ? 5 : 1 }}>
                    <TextInput
                        autoFocus
                        value={password}
                        secureTextEntry={hiddenPassword}
                        onChangeText={(text) => {
                            setPassword(text)

                            if (firstTimeValidated && !text.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)) {
                                setPasswordError(true)
                            }

                            else if (firstTimeValidated && text.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)) {
                                setPasswordError(false)
                            }

                        }}
                        onFocus={() => {
                            console.log('Password focused');
                        }}
                        style={[styles.inputFields,]}
                    />

                    <TouchableOpacity onPressIn={() => {
                        setHiddenPassword(false)
                    }}
                        onPressOut={() => {
                            setHiddenPassword(true)
                        }}
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

            {
                emailError || passwordError && (
                    <>
                        <Text style={{ fontWeight: "bold", color: "red" }}>Your credentials are wrong</Text>
                        {
                            emailError && <Text style={{ fontWeight: "bold", color: "red" }}>Your email is wrong</Text>
                        }
                        {
                            passwordError && <Text style={{ fontWeight: "bold", color: "red" }}>Your Password is wrong</Text>
                        }
                    </>
                )
            }
            <View style={{}}>

                <Animated.View style={{
                    marginVertical: 20,
                    borderRadius: 20,
                    transform: [{
                        rotateY: successRegistration.interpolate({ inputRange: [0, 1], outputRange: [0 + "deg", 360 + "deg"] })
                    }]
                }}>
                    <TouchableOpacity style={styles.button} onPress={() => validateLogin()}>
                        <Text style={{ color: "white", fontWeight: "bold" }}> {success ? "Successfully registered" : "Register user"} </Text>
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