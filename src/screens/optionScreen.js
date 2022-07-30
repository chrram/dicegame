import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'

import { TouchableOpacity, StyleSheet, Text, View, Animated } from "react-native";
import { authenticationSlice } from "../App";

export const OptionScreen = ({ navigation }) => {

    const email = useSelector((state) => state.authentication.email)
    const token = useSelector((state) => state.authentication.token)
    const userScore = useSelector((state) => state.authentication.userScore)

    const deleteAnimation = useRef(new Animated.Value(0)).current;
    const spinAnimation = useRef(new Animated.Value(0)).current;

    const dispatch = useDispatch()

    const [error, setError] = useState(false)
    const [accountDeleted, setAccountDeleted] = useState(false)

    useEffect(() => {

        if (accountDeleted) {
            Animated.sequence([
                Animated.timing(deleteAnimation, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(deleteAnimation, {
                    toValue: 2,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(spinAnimation, {
                    toValue: 1,
                    duration: 2000,
                    useNativeDriver: true,
                })
            ]).start(({ finished }) => {
                dispatch(authenticationSlice.actions.logout())
            })
        }

    }, [accountDeleted])

    const deleteAccount = () => {

        fetch('http://localhost:8080/users', {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded", "Accept": "*/*",
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {

            if (response.status === 200) {

                setAccountDeleted(true)

            }
            else {
                throw new Error(response.status)
            }

        }).catch((error) => {
            console.log(error, "error");
            setError(true)
        })
    }

    const animateOpacity = { opacity: deleteAnimation.interpolate({ inputRange: [0, 1], outputRange: [0, 1] }) }
    const animateOpacity2 = { opacity: deleteAnimation.interpolate({ inputRange: [1, 2], outputRange: [0, 1] }) }
    const rotateAnimation = {
        transform: [{
            rotateZ: spinAnimation.interpolate({ inputRange: [0, 1], outputRange: [0 + "deg", 720 + "deg"] }),
        }, {
            scale: spinAnimation.interpolate({ inputRange: [0, 1], outputRange: [1, 0] })
        }],
    }

    return (
        <View style={styles.app}>
            {
                accountDeleted ?
                    (<Animated.View style={[{ textAlign: "center" }, rotateAnimation]}>
                        <Animated.Text style={[{ color: "green", fontWeight: "bold", fontSize: 30 }, animateOpacity]}>Account is deleted</Animated.Text>
                        <Animated.Text style={[{ color: "green", fontWeight: "bold", fontSize: 40 }, animateOpacity2]}>Goodbye {email}!</Animated.Text>
                    </Animated.View>)
                    :
                    (
                        <>
                            <Text style={{ fontSize: 30, fontWeight: "bold" }}>Options</Text>
                            <Text style={{ fontSize: 20, fontWeight: "bold" }}>Account Information</Text>

                            <View style={{ alignItems: "center", marginVertical: 30 }}>
                                <View style={{ flexDirection: "row", display: "flex", alignItems: "center", padding: 20 }}>

                                    <Text>Account Email: {email}</Text>
                                    <TouchableOpacity style={styles.button2} onPress={() => deleteAccount()}>
                                        <Text style={{ color: "white", fontWeight: "bold" }}> Delete Account </Text>
                                    </TouchableOpacity>

                                </View>
                                <Text>Your highscore : {userScore}</Text>
                            </View>

                            {error && <Text style={{ color: "red", fontWeight: "bold" }}>An error occured while deleting the account</Text>}

                            <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                                <Text style={{ color: "white", fontWeight: "bold" }}> Go back </Text>
                            </TouchableOpacity>

                        </>
                    )
            }
        </View >
    )
}

const styles = StyleSheet.create({

    app: {
        marginHorizontal: "auto",
        width: "100%",
        height: "100vh",
        justifyContent: 'center',
        alignItems: 'center',
        display: "flex",
    },

    button: {
        textAlign: "center",
        width: 300,
        padding: 15,
        fontWeight: "bold",
        borderRadius: 20,
        backgroundImage: "linear-gradient(to right, #D31027 0%, #EA384D  51%, #D31027  100%);",
        marginVertical: 10,

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 5
    },

    button2: {
        textAlign: "center",
        width: 120,
        padding: 5,
        fontWeight: "bold",
        borderRadius: 5,
        backgroundImage: "linear-gradient(to right, #D31027 0%, #EA384D  51%, #D31027  100%);",

        marginHorizontal: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 5
    }

});
