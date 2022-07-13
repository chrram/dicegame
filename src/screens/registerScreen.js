import { useState, useRef, useEffect } from "react";

import { TouchableOpacity, StyleSheet, Text, View, TextInput, Animated } from "react-native";

export const RegisterScreen = ({ navigation }) => {

    const registerButtonAnimationValue = useRef(new Animated.Value(0)).current;

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [validFields, setValidFields] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)

    const validateLogin = () => {

        if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
            setEmailError(true)
        }

        if (!password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)) {
            setPasswordError(true)
        }


        if (!(emailError || passwordError)) {
            registerUser()
        }
    }

    const registerUser = () => {
        
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

                console.log("data here")
            })
            .catch((error) => {

                if (error.message === "400") {
                    console.log("400")
                } else {
                    console.log("Network error")
                }

            });
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
                        console.log("tte");
                        if (emailError && text.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
                            setEmailError(false)
                        }
                    }}

                    onFocus={() => {
                        console.log('Email focused');
                    }}
                    style={[styles.inputFields, { borderWidth: emailError ? 20 : 1 }]}
                />

                <Text style={styles.inputLabels}>Password</Text>
                <TextInput
                    autoFocus
                    value={password}
                    secureTextEntry={true}
                    onChangeText={(text) => {
                        setPassword(text)

                        if (passwordError && text.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)) {
                            setPasswordError(false)
                        }
                    }}
                    onFocus={() => {
                        console.log('Password focused');
                    }}
                    style={[styles.inputFields, { borderWidth: passwordError ? 20 : 1 }]}
                />
            </View>

            {
                emailError || passwordError ? (
                    <>
                    <Text style={{fontWeight: "bold", color: "red"}}>Your credential are wrong</Text>
                    <Text style={{fontWeight: "bold", color: "red"}}>Your credential are wrong</Text>
                    <Text style={{fontWeight: "bold", color: "red"}}>Your credential are wrong</Text>
                    </>
                ) : null
            }
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