import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'

import { TouchableOpacity, StyleSheet, Text, View, TextInput, Animated, Easing } from "react-native";
import { authenticationSlice } from "../App";

export const MenuScreen = ({ navigation }) => {

    const animationVariable = useRef(new Animated.Value(0)).current;
    const menuOpacity = useRef(new Animated.Value(0)).current;

    const token = useSelector((state) => state.authentication.token)
    const email = useSelector((state) => state.authentication.email)

    const dispatch = useDispatch()

    useEffect(() => {

        Animated.loop(

            Animated.sequence([
                Animated.spring(animationVariable, {
                    toValue: 1,
                    speed: 50,
                    useNativeDriver: true,
                }),

                Animated.spring(animationVariable, {
                    toValue: 0,
                    speed: 50,
                    useNativeDriver: true,
                })
            ])

        ).start()

        Animated.timing(menuOpacity, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
            easing: Easing.cubic
        }).start()

    })

    const animatedStyles = [
        {
            opacity: menuOpacity,
            padding: menuOpacity.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 70]
            }),
        }
    ];


    return (
        <View style={styles.app}>

            <Animated.View style={[{
                borderRadius: 30,
                borderColor: "red",
                borderWidth:
                    animationVariable.interpolate({ inputRange: [0, 1], outputRange: [1, 5] }),
            }, animatedStyles]}>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('GameScreen')}>
                    <Text style={{ color: "white", fontWeight: "bold" }}> Play dice game </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Top')}>
                    <Text style={{ color: "white", fontWeight: "bold" }}> See top scores </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Options")}>
                    <Text style={{ color: "white", fontWeight: "bold" }}> Options </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => dispatch(authenticationSlice.actions.logout())}>
                    <Text style={{ color: "white", fontWeight: "bold" }}> Logout </Text>
                </TouchableOpacity>

            </Animated.View>
        </View>
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

});
